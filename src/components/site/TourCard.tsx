import { Compass } from "lucide-react";

export type Tour = {
  name: string;
  type: string;
  image: string;
  /** Swap in a real 360° tour embed URL to replace the placeholder. */
  embedUrl?: string | undefined;
};

export function TourCard({ tour, label, open }: { tour: Tour; label: string; open: string }) {
  return (
    <figure className="group overflow-hidden rounded-sm border border-border bg-card">
      <div className="relative aspect-[3/2] overflow-hidden bg-secondary">
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
      </div>
      <figcaption className="flex items-center justify-between gap-3 px-5 py-4">
        <div className="min-w-0">
          <p className="truncate font-display text-sm font-bold">{tour.name}</p>
          <p className="truncate text-xs text-muted-foreground">{tour.type}</p>
        </div>
        {tour.embedUrl && (
          <a
            href={tour.embedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded-sm border border-accent px-4 py-2 text-xs tracking-[0.18em] text-accent uppercase transition-colors hover:bg-accent/10"
          >
            {open}
          </a>
        )}
      </figcaption>
    </figure>
  );
}
