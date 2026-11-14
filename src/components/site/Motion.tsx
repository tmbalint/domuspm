import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

/*
 * Small scroll-animation helpers. No dependencies.
 *
 * - Server render (and visitors without JS) always get the content fully
 *   visible; animation is only added on the client.
 * - Elements already on screen at load are left alone (no flash), only
 *   things below the fold fade in as they are scrolled to.
 * - Everything respects the "reduce motion" OS setting.
 */

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  );
}

/** Calls `onEnter` once, the first time the element scrolls into view. */
function useEnterOnce<T extends Element>(onEnter: () => void, onMountVisible?: () => void) {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      onMountVisible?.();
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          onEnter();
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return ref;
}

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Delay in ms — use small steps (e.g. i * 90) to stagger a row of cards. */
  delay?: number;
  as?: ElementType;
};

/** Fades + slides its content up when it first scrolls into view. */
export function Reveal({ children, className = "", delay = 0, as: Tag = "div" }: RevealProps) {
  // "static" = render normally (SSR, already on screen, reduced motion)
  const [state, setState] = useState<"static" | "hidden" | "shown">("static");
  const ref = useEnterOnce<HTMLElement>(() => setState("shown"));

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.top >= window.innerHeight) setState((s) => (s === "static" ? "hidden" : s));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cls = state === "static" ? "" : state === "hidden" ? "reveal" : "reveal reveal-in";

  return (
    <Tag
      ref={ref}
      className={`${cls} ${className}`.trim()}
      style={delay && state !== "static" ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}

/**
 * Renders `text` and counts its first number up from zero when it scrolls
 * into view, keeping the original formatting ("29 990 Ft", "48 órás …").
 */
export function CountUp({ text, duration = 1200 }: { text: string; duration?: number }) {
  const match = text.match(/\d{1,3}(?:[ \u00a0]\d{3})+|\d+/);
  const target = match ? Number(match[0].replace(/[ \u00a0]/g, "")) : 0;
  const [value, setValue] = useState<number | null>(null); // null = show final text

  const run = () => {
    if (!match || prefersReducedMotion()) return;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(p < 1 ? Math.round(target * eased) : null);
      if (p < 1) requestAnimationFrame(tick);
    };
    setValue(0);
    requestAnimationFrame(tick);
  };
  // Counts when scrolled to, or right away if it is on screen at load (hero).
  const ref = useEnterOnce<HTMLSpanElement>(run, run);

  if (!match || value === null) return <span ref={ref}>{text}</span>;

  // Same thousands-separator style as the source text.
  const sep = match[0].includes("\u00a0") ? "\u00a0" : " ";
  const formatted = String(value).replace(/\B(?=(\d{3})+(?!\d))/g, sep);
  const i = match.index ?? 0;
  return (
    <span ref={ref} className="tabular-nums">
      {text.slice(0, i)}
      {formatted}
      {text.slice(i + match[0].length)}
    </span>
  );
}

/** True once the page has been scrolled past `offset` px. */
export function useScrolled(offset = 24) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > offset);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [offset]);
  return scrolled;
}
