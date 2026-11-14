import { useEffect, useRef, useState } from "react";

/*
 * Tiny 360° viewer for tour cards (no dependencies, plain WebGL).
 *
 * Shows a normal, undistorted view of an equirectangular panorama. The view
 * only moves while the cursor is over the card (or while dragging on touch):
 * cursor left/right turns around, up/down looks at ceiling/floor. When the
 * cursor leaves, it eases back to the starting view.
 *
 * Server render / no WebGL: the `fallback` cover image is shown instead.
 */

type Props = {
  src: string;
  fallback: string;
  alt: string;
  /** Starting direction in degrees (0 = centre of the panorama). */
  yaw?: number | undefined;
  /** Position in the left → right peek sequence. */
  order?: number | undefined;
  className?: string | undefined;
};

const H_FOV = (100 * Math.PI) / 180; // horizontal field of view
const YAW_RANGE = (230 * Math.PI) / 180; // full cursor sweep left↔right
const PITCH_RANGE = (90 * Math.PI) / 180; // full cursor sweep top↔bottom

const VERT = `
attribute vec2 p;
varying vec2 v;
void main() { v = p; gl_Position = vec4(p, 0.0, 1.0); }`;

const FRAG = `
precision highp float;
varying vec2 v;
uniform sampler2D tex;
uniform float yaw;
uniform float pitch;
uniform vec2 tanHalf;
const float PI = 3.14159265;
void main() {
  vec3 d = normalize(vec3(v.x * tanHalf.x, v.y * tanHalf.y, -1.0));
  float cp = cos(pitch), sp = sin(pitch);
  d = vec3(d.x, d.y * cp + d.z * sp, -d.y * sp + d.z * cp);
  float cy = cos(yaw), sy = sin(yaw);
  d = vec3(d.x * cy - d.z * sy, d.y, d.x * sy + d.z * cy);
  float lon = atan(d.x, -d.z);
  float lat = asin(clamp(d.y, -1.0, 1.0));
  vec2 uv = vec2(fract(lon / (2.0 * PI) + 0.5), 0.5 - lat / PI);
  gl_FragColor = texture2D(tex, uv);
}`;

// ─── Peek sequencer ─────────────────────────────────────────────────────────
// Cards ask for their one-time "peek" when they come on screen. Peeks run one
// at a time, in card order (left → right). As soon as the visitor hovers or
// touches any 360° card, the whole sequence stops for good.
type PeekJob = { order: number; run: () => Promise<void>; stop: () => void };
const peek = {
  cancelled: false,
  pending: [] as PeekJob[],
  current: null as PeekJob | null,
  flushTimer: 0,
};

function requestPeek(job: PeekJob) {
  if (peek.cancelled) return;
  peek.pending.push(job);
  // Cards that appear together are collected briefly, then sorted by order.
  window.clearTimeout(peek.flushTimer);
  peek.flushTimer = window.setTimeout(runNextPeek, 80);
}

function runNextPeek() {
  if (peek.cancelled || peek.current || peek.pending.length === 0) return;
  peek.pending.sort((a, b) => a.order - b.order);
  const job = peek.pending.shift()!;
  peek.current = job;
  job.run().then(() => {
    if (peek.current === job) peek.current = null;
    runNextPeek();
  });
}

function cancelAllPeeks() {
  if (peek.cancelled) return;
  peek.cancelled = true;
  peek.pending = [];
  peek.current?.stop();
  peek.current = null;
}

export function PanoView({ src, fallback, alt, yaw = 0, order = 0, className = "" }: Props) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const baseYaw = (yaw * Math.PI) / 180;
    const view = { yaw: baseYaw, pitch: 0 };
    const target = { yaw: baseYaw, pitch: 0 };
    let gl: WebGLRenderingContext | null = null;
    let uYaw: WebGLUniformLocation | null = null;
    let uPitch: WebGLUniformLocation | null = null;
    let uTan: WebGLUniformLocation | null = null;
    let raf = 0;
    let disposed = false;
    let dragging = false;
    let ease = 0.12;
    let peekTimers: number[] = [];
    let peekIO: IntersectionObserver | null = null;
    const stopPeek = () => {
      peekTimers.forEach((t) => clearTimeout(t));
      peekTimers = [];
      ease = 0.12;
    };

    const draw = () => {
      if (!gl) return;
      const w = Math.round(canvas.clientWidth * Math.min(window.devicePixelRatio || 1, 2));
      const h = Math.round(canvas.clientHeight * Math.min(window.devicePixelRatio || 1, 2));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
      const tx = Math.tan(H_FOV / 2);
      gl.uniform2f(uTan, tx, tx * (h / w));
      gl.uniform1f(uYaw, view.yaw);
      gl.uniform1f(uPitch, view.pitch);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    const tick = () => {
      raf = 0;
      view.yaw += (target.yaw - view.yaw) * ease;
      view.pitch += (target.pitch - view.pitch) * ease;
      draw();
      if (
        Math.abs(target.yaw - view.yaw) > 0.0005 ||
        Math.abs(target.pitch - view.pitch) > 0.0005
      ) {
        raf = requestAnimationFrame(tick);
      }
    };
    const kick = () => {
      if (!raf && gl) raf = requestAnimationFrame(tick);
    };

    const aim = (clientX: number, clientY: number) => {
      stopPeek();
      const r = wrap.getBoundingClientRect();
      const x = (clientX - r.left) / r.width - 0.5;
      const y = (clientY - r.top) / r.height - 0.5;
      target.yaw = baseYaw + x * YAW_RANGE;
      target.pitch = y * PITCH_RANGE;
      kick();
    };
    const reset = () => {
      target.yaw = baseYaw;
      target.pitch = 0;
      kick();
    };

    const onEnter = () => cancelAllPeeks();
    const onMove = (e: PointerEvent) => {
      cancelAllPeeks();
      if (e.pointerType === "mouse" || dragging) aim(e.clientX, e.clientY);
    };
    const onDown = (e: PointerEvent) => {
      cancelAllPeeks();
      if (e.pointerType !== "mouse") {
        dragging = true;
        aim(e.clientX, e.clientY);
      }
    };
    const onUp = () => {
      dragging = false;
    };
    const onLeave = () => {
      dragging = false;
      reset();
    };

    const init = () => {
      gl = canvas.getContext("webgl", { antialias: false, premultipliedAlpha: false });
      if (!gl) return;
      const compile = (type: number, code: string) => {
        const s = gl!.createShader(type)!;
        gl!.shaderSource(s, code);
        gl!.compileShader(s);
        return s;
      };
      const prog = gl.createProgram()!;
      gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
      gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
      gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
        gl = null;
        return;
      }
      gl.useProgram(prog);
      const buf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
        gl.STATIC_DRAW,
      );
      const loc = gl.getAttribLocation(prog, "p");
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
      uYaw = gl.getUniformLocation(prog, "yaw");
      uPitch = gl.getUniformLocation(prog, "pitch");
      uTan = gl.getUniformLocation(prog, "tanHalf");

      const img = new Image();
      img.decoding = "async";
      img.onload = () => {
        if (disposed || !gl) return;
        const tex = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img);
        draw();
        setReady(true);
        startPeekWatch();
        wrap.addEventListener("pointerenter", onEnter);
        wrap.addEventListener("pointermove", onMove);
        wrap.addEventListener("pointerdown", onDown);
        wrap.addEventListener("pointerup", onUp);
        wrap.addEventListener("pointerleave", onLeave);
        wrap.addEventListener("pointercancel", onLeave);
      };
      img.src = src;
    };

    // One-time "peek": glance left, then right, then settle, so visitors
    // notice it is a live 360° view. Queued through the sequencer above.
    const startPeekWatch = () => {
      if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
      peekIO = new IntersectionObserver(
        (entries) => {
          if (!entries.some((e) => e.isIntersecting)) return;
          peekIO?.disconnect();
          requestPeek({
            order,
            stop: () => {
              stopPeek();
              target.yaw = baseYaw;
              target.pitch = 0;
              kick();
            },
            run: () =>
              new Promise<void>((resolve) => {
                const steps: [number, number, number][] = [
                  // [delay ms, yaw offset deg, pitch deg] (negative pitch = up)
                  [100, 38, -12], // right + up
                  [1000, 0, 0], // back to start
                  [1800, -38, 12], // left + down
                  [2700, 0, 0], // back to start
                ];
                ease = 0.05;
                for (const [delay, dy, dp] of steps) {
                  peekTimers.push(
                    window.setTimeout(() => {
                      target.yaw = baseYaw + (dy * Math.PI) / 180;
                      target.pitch = (dp * Math.PI) / 180;
                      kick();
                    }, delay),
                  );
                }
                // Next card starts as this one settles.
                peekTimers.push(
                  window.setTimeout(() => {
                    ease = 0.12;
                    resolve();
                  }, 3700),
                );
              }),
          });
        },
        { threshold: 0.7 },
      );
      peekIO.observe(wrap);
    };

    // Only load the panorama when the card gets near the screen.
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          init();
        }
      },
      { rootMargin: "300px" },
    );
    io.observe(wrap);

    const ro = new ResizeObserver(() => draw());
    ro.observe(canvas);

    return () => {
      disposed = true;
      stopPeek();
      peekIO?.disconnect();
      io.disconnect();
      ro.disconnect();
      if (raf) cancelAnimationFrame(raf);
      wrap.removeEventListener("pointerenter", onEnter);
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerdown", onDown);
      wrap.removeEventListener("pointerup", onUp);
      wrap.removeEventListener("pointerleave", onLeave);
      wrap.removeEventListener("pointercancel", onLeave);
    };
  }, [src, yaw, order]);

  return (
    <div
      ref={wrapRef}
      className={`absolute inset-0 ${ready ? "cursor-grab touch-pan-y" : ""} ${className}`}
    >
      <img
        src={fallback}
        alt={alt}
        loading="lazy"
        width={1200}
        height={800}
        className="h-full w-full object-cover"
      />
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className={`absolute inset-0 h-full w-full transition-opacity duration-500 ${
          ready ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
