import { weatherApi } from "@/lib/weather/server";

export async function GET(request: Request) {
  const query = new URL(request.url).searchParams.get("query");
  if (!query) {
    return Response.json({ message: "Please provide a city" }, { status: 400 });
  }
  const data = await weatherApi.geocoding(query);
  return Response.json(data);
}
