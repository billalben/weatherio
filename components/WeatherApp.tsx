"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Header from "./Header";
import CurrentWeather from "./CurrentWeather";
import Highlights from "./Highlights";
import HourlyForecast from "./HourlyForecast";
import FiveDayForecast from "./FiveDayForecast";
import Footer from "./Footer";
import Loading from "./Loading";
import type {
  AirPollution,
  CurrentWeather as CurrentWeatherData,
  Forecast,
  GeoLocation,
} from "@/lib/weather/types";
import { DEFAULT_LOCATION } from "@/lib/location";

interface WeatherData {
  current: CurrentWeatherData;
  forecast: Forecast;
  airPollution: AirPollution;
  location: GeoLocation | null;
}

export default function WeatherApp() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const lat = searchParams.get("lat") ?? DEFAULT_LOCATION.lat;
  const lon = searchParams.get("lon") ?? DEFAULT_LOCATION.lon;

  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [locating, setLocating] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(false);
      try {
        const [currentRes, forecastRes, airRes, geoRes] = await Promise.all([
          fetch(`/api/weather/current?lat=${lat}&lon=${lon}`),
          fetch(`/api/weather/forecast?lat=${lat}&lon=${lon}`),
          fetch(`/api/weather/air-pollution?lat=${lat}&lon=${lon}`),
          fetch(`/api/weather/reverse-geocoding?lat=${lat}&lon=${lon}`),
        ]);
        const [current, forecast, air, geo] = await Promise.all([
          currentRes.json(),
          forecastRes.json(),
          airRes.json(),
          geoRes.json(),
        ]);
        if (cancelled) return;
        setData({
          current,
          forecast,
          airPollution: air,
          location: Array.isArray(geo) && geo.length > 0 ? geo[0] : null,
        });
      } catch {
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [lat, lon]);

  const updateLocation = useCallback(
    (newLat: string, newLon: string) => {
      router.replace(`/?lat=${newLat}&lon=${newLon}`);
    },
    [router],
  );

  const goToCurrentLocation = useCallback(() => {
    if (!navigator.geolocation) {
      updateLocation(DEFAULT_LOCATION.lat, DEFAULT_LOCATION.lon);
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocating(false);
        updateLocation(
          String(position.coords.latitude),
          String(position.coords.longitude),
        );
      },
      () => {
        setLocating(false);
        updateLocation(DEFAULT_LOCATION.lat, DEFAULT_LOCATION.lon);
      },
    );
  }, [updateLocation]);

  return (
    <>
      <Header
        onSelectLocation={updateLocation}
        onCurrentLocation={goToCurrentLocation}
        locating={locating}
      />

      <main>
        <article
          className={`container ${data && !loading ? "animate-fade-in" : ""}`}
        >
          <div className="content-left">
            <section
              className="section current-weather"
              aria-label="current weather"
            >
              {data && !loading && (
                <CurrentWeather
                  current={data.current}
                  location={data.location}
                />
              )}
            </section>

            <section
              className="section forecast"
              aria-labelledby="forecast-label"
            >
              {data && !loading && <FiveDayForecast forecast={data.forecast} />}
            </section>
          </div>

          <div className="content-right">
            <section
              className="section highlights"
              aria-labelledby="highlights-label"
            >
              {data && !loading && (
                <Highlights
                  current={data.current}
                  airPollution={data.airPollution}
                />
              )}
            </section>

            <section
              className="section hourly-forecast"
              aria-label="hourly forecast"
            >
              {data && !loading && <HourlyForecast forecast={data.forecast} />}
            </section>

            <Footer />
          </div>

          {loading && <Loading />}
        </article>
      </main>

      {error && <ErrorContent />}
    </>
  );
}

function ErrorContent() {
  return (
    <section className="error-content fixed inset-0 z-8 flex flex-col items-center justify-center bg-background">
      <h2 className="heading">Error</h2>
      <p className="body-1 mt-4">Something went wrong, please try again.</p>
      <Link href="/" className="btn-primary mt-5">
        <span className="span">Go Home</span>
      </Link>
    </section>
  );
}
