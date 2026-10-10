import { AirPollution, CurrentWeather, Forecast, GeoLocation } from "./types";

const BASE_URL = "https://api.openweathermap.org";

function getApiKey(): string {
  const key = process.env.WEATHER_API_KEY;
  if (!key) {
    throw new Error("WEATHER_API_KEY is not set");
  }
  return key;
}

function buildUrl(path: string, params: Record<string, string>): string {
  const url = new URL(path, BASE_URL);
  for (const [name, value] of Object.entries(params)) {
    url.searchParams.set(name, value);
  }
  url.searchParams.set("appid", getApiKey());
  return url.toString();
}

export const weatherApi = {
  currentWeather(lat: string, lon: string) {
    return fetchWeather<CurrentWeather>(
      buildUrl("/data/2.5/weather", { lat, lon, units: "metric" }),
    );
  },
  forecast(lat: string, lon: string) {
    return fetchWeather<Forecast>(
      buildUrl("/data/2.5/forecast", { lat, lon, units: "metric" }),
    );
  },
  airPollution(lat: string, lon: string) {
    return fetchWeather<AirPollution>(
      buildUrl("/data/2.5/air_pollution", { lat, lon }),
    );
  },
  reverseGeocoding(lat: string, lon: string) {
    return fetchWeather<GeoLocation[]>(
      buildUrl("/geo/1.0/reverse", { lat, lon, limit: "5" }),
    );
  },
  geocoding(query: string) {
    return fetchWeather<GeoLocation[]>(
      buildUrl("/geo/1.0/direct", { q: query, limit: "5" }),
    );
  },
};

async function fetchWeather<T>(url: string): Promise<T> {
  const res = await fetch(url, {
    next: { revalidate: 600 },
  });
  if (!res.ok) {
    throw new Error(`Weather API request failed with status ${res.status}`);
  }
  return res.json();
}
