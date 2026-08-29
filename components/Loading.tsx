export default function Loading() {
  return (
    <div className="absolute inset-0 z-1 grid place-items-center bg-background">
      <span className="h-12 w-12 animate-loading rounded-full border-4 border-on-surface-variant border-t-transparent" />
    </div>
  );
}
