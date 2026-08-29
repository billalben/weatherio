import Link from "next/link";
import { DEFAULT_LOCATION } from "@/lib/location";

export default function NotFound() {
  return (
    <section className="fixed inset-0 z-8 flex flex-col items-center justify-center bg-background">
      <h2 className="heading">404</h2>
      <p className="body-1 mt-2">Page not found!</p>
      <Link
        href={`/?lat=${DEFAULT_LOCATION.lat}&lon=${DEFAULT_LOCATION.lon}`}
        className="btn-primary mt-5"
      >
        <span className="span">Go Home</span>
      </Link>
    </section>
  );
}
