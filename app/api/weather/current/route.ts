import { weatherApi } from "@/lib/weather/server";
import { getCoords } from "@/lib/weather/params";

export async function GET(request: Request) {
  const coords = getCoords(new URL(request.url));
  if (!coords) {
    return Response.json(
      { message: "Please provide latitude and longitude" },
      { status: 400 },
    );
  }
  const data = await weatherApi.currentWeather(coords.lat, coords.lon);
  return Response.json(data);
}
