import { AirPollution, CurrentWeather, Forecast, GeoLocation } from "./types";

const BASE_URL = "https://api.openweathermap.org";

const API_KEY = process.env.WEATHER_API_KEY;

export const weatherApi = {
  currentWeather(lat: string, lon: string) {
    return fetchWeather<CurrentWeather>(
      `${BASE_URL}/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric`,
    );
  },
  forecast(lat: string, lon: string) {
    return fetchWeather<Forecast>(
      `${BASE_URL}/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric`,
    );
  },
  airPollution(lat: string, lon: string) {
    return fetchWeather<AirPollution>(
      `${BASE_URL}/data/2.5/air_pollution?lat=${lat}&lon=${lon}`,
    );
  },
  reverseGeocoding(lat: string, lon: string) {
    return fetchWeather<GeoLocation[]>(
      `${BASE_URL}/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=5`,
    );
  },
  geocoding(query: string) {
    return fetchWeather<GeoLocation[]>(
      `${BASE_URL}/geo/1.0/direct?q=${query}&limit=5`,
    );
  },
};

async function fetchWeather<T>(url: string): Promise<T> {
  const res = await fetch(`${url}&appid=${API_KEY}`, {
    next: { revalidate: 600 },
  });
  if (!res.ok) {
    throw new Error(`Weather API request failed with status ${res.status}`);
  }
  return res.json();
}
