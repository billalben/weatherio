"use server";

import { weatherApi } from "./server";
import type { GeoLocation } from "./types";

export async function searchCities(query: string): Promise<GeoLocation[]> {
  const trimmed = query.trim();
  if (!trimmed) return [];
  return weatherApi.geocoding(trimmed);
}
