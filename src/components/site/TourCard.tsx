import { Compass } from "lucide-react";

export type Tour = {
  name: string;
  type: string;
  /** Optional 360° panorama strip (horizontal band of the equirectangular
   *  image). When set, the card slowly pans around the room instead of
   *  showing the static cover. */
  pano?: string | undefined;
  /** Client agency · agent, shown under the size line. */
  client?: string | undefined;
  image: string;
  /** Keypano tour link — opened in a new tab (Keypano blocks iframe embedding). */
  url?: string | undefined;
};

export function TourCard({ tour, open }: { tour: Tour; open: string }) {
  return (
    <figure className="card-lift group flex h-full flex-col overflow-hidden rounded-sm border border-border bg-card">
      <div className="relative aspect-[3/2] overflow-hidden bg-secondary">
        {tour.pano ? (
          <>
            {/* Static cover for reduced-motion visitors */}
            <img
              src={tour.image}
              alt={tour.name}
              loading="lazy"
              width={1200}
              height={800}
              className="pano-fallback h-full w-full object-cover"
            />
            {/* Two copies side by side; sliding by half loops seamlessly. */}
            <div className="pano-track absolute inset-y-0 left-0 flex h-full" aria-hidden="true">
              <img src={tour.pano} alt="" loading="lazy" className="h-full w-auto max-w-none" />
              <img src={tour.pano} alt="" loading="lazy" className="h-full w-auto max-w-none" />
            </div>
          </>
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
            tour.pano ? "bg-primary/30 group-hover:opacity-0" : "bg-primary/45"
          }`}
        >
          <span className="flex flex-col items-center gap-2 text-primary-foreground">
            <Compass className="h-8 w-8 text-accent" />
            <span className="eyebrow">360°</span>
          </span>
        </div>
      </div>
      <figcaption className="flex flex-1 flex-col justify-between gap-4 px-5 py-5">
        <div>
          <p className="font-display text-base font-bold leading-snug">{tour.name}</p>
          <p className="mt-1 text-sm text-muted-foreground">{tour.type}</p>
          {tour.client && (
            <p className="mt-3 text-xs tracking-wide text-accent">{tour.client}</p>
          )}
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
