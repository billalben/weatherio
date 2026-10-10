import { redirect } from "next/navigation";
import CurrentWeather from "./CurrentWeather";
import FiveDayForecast from "./FiveDayForecast";
import Highlights from "./Highlights";
import HourlyForecast from "./HourlyForecast";
import Footer from "./Footer";
import { hasValidCoords, parseCoords } from "@/lib/weather/params";
import { weatherApi } from "@/lib/weather/server";

interface WeatherContentProps {
  searchParams: PageProps<"/">["searchParams"];
}

export default async function WeatherContent({
  searchParams,
}: WeatherContentProps) {
  const resolved = await searchParams;
  const { lat, lon } = parseCoords(resolved);

  if (!hasValidCoords(resolved)) {
    redirect(`/?lat=${lat}&lon=${lon}`);
  }

  const [current, forecast, airPollution, reverseGeo] = await Promise.all([
    weatherApi.currentWeather(lat, lon),
    weatherApi.forecast(lat, lon),
    weatherApi.airPollution(lat, lon),
    weatherApi.reverseGeocoding(lat, lon),
  ]);

  if (!current.weather?.[0] || !airPollution.list?.[0]) {
    throw new Error("Incomplete weather data received from upstream");
  }

  const location = reverseGeo[0] ?? null;

  return (
    <article className="container animate-fade-in">
      <div className="content-left">
        <section
          className="section current-weather"
          aria-label="current weather"
        >
          <CurrentWeather current={current} location={location} />
        </section>

        <section className="section forecast" aria-labelledby="forecast-label">
          <FiveDayForecast forecast={forecast} />
        </section>
      </div>

      <div className="content-right">
        <section className="section highlights" aria-labelledby="highlights-label">
          <Highlights current={current} airPollution={airPollution} />
        </section>

        <section
          className="section hourly-forecast"
          aria-label="hourly forecast"
        >
          <HourlyForecast forecast={forecast} />
        </section>

        <Footer />
      </div>
    </article>
  );
}
