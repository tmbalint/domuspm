export function ArchIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 56" fill="none" className={className} aria-hidden="true">
      <path
        d="M8 54V24a16 16 0 0 1 32 0v30"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path d="M24 38v16M2 54h44" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function ArchDivider() {
  return (
    <div className="flex items-center justify-center gap-4 py-2 text-accent/60">
      <span className="h-px w-16 bg-current sm:w-28" />
      <ArchIcon className="h-6 w-6 shrink-0" />
      <span className="h-px w-16 bg-current sm:w-28" />
    </div>
  );
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow text-accent">{children}</p>;
}
