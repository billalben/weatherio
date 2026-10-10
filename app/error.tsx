"use client";

import Link from "next/link";

export default function Error({
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <section className="error-content fixed inset-0 z-8 flex flex-col items-center justify-center bg-background">
      <h2 className="heading">Error</h2>
      <p className="body-1 mt-4">Something went wrong, please try again.</p>
      <div className="mt-5 flex items-center gap-4">
        <button
          type="button"
          className="btn-primary has-state"
          onClick={() => retry()}
        >
          <span className="span">Try again</span>
        </button>
        <Link href="/" className="btn-primary">
          <span className="span">Go Home</span>
        </Link>
      </div>
    </section>
  );
}
