import { Compass } from "lucide-react";

export type Tour = {
  name: string;
  type: string;
  image: string;
  /** Swap in a real 360° tour embed URL to replace the placeholder. */
  embedUrl?: string;
};

export function TourCard({ tour, label, open }: { tour: Tour; label: string; open: string }) {
  return (
    <figure className="group overflow-hidden rounded-sm border border-border bg-card">
      <div className="relative aspect-[3/2] overflow-hidden bg-secondary">
        {tour.embedUrl ? (
          <iframe
            src={tour.embedUrl}
            title={tour.name}
            allowFullScreen
            loading="lazy"
            className="h-full w-full border-0"
          />
        ) : (
          <>
            <img
              src={tour.image}
              alt={tour.name}
              loading="lazy"
              width={1200}
              height={800}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 grid place-items-center bg-primary/45">
              <span className="flex flex-col items-center gap-2 text-primary-foreground">
                <Compass className="h-8 w-8 text-accent" />
                <span className="eyebrow">{label}</span>
              </span>
            </div>
          </>
        )}
      </div>
      <figcaption className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-5 py-4">
        <div className="min-w-0">
          <p className="truncate font-display text-sm font-bold">{tour.name}</p>
          <p className="truncate text-xs text-muted-foreground">{tour.type}</p>
        </div>
        <span className="eyebrow shrink-0 text-accent">{open}</span>
      </figcaption>
    </figure>
  );
}
