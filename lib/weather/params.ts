export function getCoords(url: URL): { lat: string; lon: string } | null {
  const lat = url.searchParams.get("lat");
  const lon = url.searchParams.get("lon");
  if (!lat || !lon) return null;
  return { lat, lon };
}
