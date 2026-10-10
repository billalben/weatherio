import { DEFAULT_LOCATION } from "@/lib/location";

type SearchParams = { [key: string]: string | string[] | undefined };

function parseCoord(
  value: string | string[] | undefined,
  limit: number,
): number | null {
  if (typeof value !== "string" || value.trim() === "") return null;
  const coord = Number(value);
  if (!Number.isFinite(coord) || Math.abs(coord) > limit) return null;
  return coord;
}

export function parseCoords(searchParams: SearchParams): {
  lat: string;
  lon: string;
} {
  const lat = parseCoord(searchParams.lat, 90);
  const lon = parseCoord(searchParams.lon, 180);
  if (lat === null || lon === null) {
    return { ...DEFAULT_LOCATION };
  }
  return { lat: String(lat), lon: String(lon) };
}

export function hasValidCoords(searchParams: SearchParams): boolean {
  return (
    parseCoord(searchParams.lat, 90) !== null &&
    parseCoord(searchParams.lon, 180) !== null
  );
}
