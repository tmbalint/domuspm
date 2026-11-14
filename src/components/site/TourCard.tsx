import { useState } from "react";
import { Compass, Hand, MousePointer2 } from "lucide-react";

import { PanoView } from "@/components/site/PanoView";

export type Tour = {
  name: string;
  type: string;
  /** Optional full equirectangular panorama. When set, the card becomes a
   *  small 360° view that follows the cursor (see PanoView). */
  pano?: string | undefined;
  /** Starting direction of the 360° view, degrees. */
  panoYaw?: number | undefined;
  /** Position in the left → right peek sequence. */
  panoOrder?: number | undefined;
  /** Client agency · agent, shown under the size line. */
  client?: string | undefined;
  image: string;
  /** Keypano tour link — opened in a new tab (Keypano blocks iframe embedding). */
  url?: string | undefined;
};

export function TourCard({
  tour,
  open,
  hint,
}: {
  tour: Tour;
  open: string;
  /** Labels for the 360° cards: mouse devices vs touchscreens. */
  hint?: { mouse: string; touch: string } | undefined;
}) {
  // Touchscreens have no hover, so hide the hint once the card is touched.
  const [touched, setTouched] = useState(false);
  return (
    <figure
      onPointerDown={(e) => {
        if (e.pointerType !== "mouse") setTouched(true);
      }}
      className="card-lift group flex h-full flex-col overflow-hidden rounded-sm border border-border bg-card"
    >
      <div className="relative aspect-[3/2] overflow-hidden bg-secondary">
        {tour.pano ? (
          <PanoView
            src={tour.pano}
            fallback={tour.image}
            alt={tour.name}
            yaw={tour.panoYaw}
            order={tour.panoOrder}
          />
        ) : (
          <img
            src={tour.image}
            alt={tour.name}
            loading="lazy"
            width={1200}
            height={800}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        )}
        <div
          className={`absolute inset-0 grid place-items-center transition-opacity duration-500 ${
            tour.pano
              ? `pointer-events-none bg-primary/30 group-hover:opacity-0 ${touched ? "opacity-0" : ""}`
              : "bg-primary/45"
          }`}
        >
          {tour.pano && hint ? (
            <span className="flex flex-col items-center gap-2 text-center text-primary-foreground">
              {/* Mouse devices */}
              <MousePointer2 className="h-7 w-7 animate-pulse text-accent [@media(hover:none)]:hidden" />
              <span className="eyebrow [@media(hover:none)]:hidden">{hint.mouse}</span>
              {/* Touchscreens */}
              <Hand className="hidden h-7 w-7 animate-pulse text-accent [@media(hover:none)]:block" />
              <span className="eyebrow hidden [@media(hover:none)]:inline">{hint.touch}</span>
            </span>
          ) : (
            <span className="flex flex-col items-center gap-2 text-primary-foreground">
              <Compass className="h-8 w-8 text-accent" />
              <span className="eyebrow">360°</span>
            </span>
          )}
        </div>
      </div>
      <figcaption className="flex flex-1 flex-col justify-between gap-4 px-5 py-5">
        <div>
          <p className="font-display text-base font-bold leading-snug">{tour.name}</p>
          <p className="mt-1 text-sm text-muted-foreground">{tour.type}</p>
          {tour.client && <p className="mt-3 text-xs tracking-wide text-accent">{tour.client}</p>}
        </div>
        {tour.url && (
          <a
            href={tour.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full rounded-sm border border-accent px-4 py-3 text-center text-xs tracking-[0.18em] text-accent uppercase transition-colors hover:bg-accent/10"
          >
            {open}
          </a>
        )}
      </figcaption>
    </figure>
  );
}
