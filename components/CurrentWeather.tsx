import Image from "next/image";
import { getDate } from "@/lib/utils/format";
import type {
  CurrentWeather as CurrentWeatherData,
  GeoLocation,
} from "@/lib/weather/types";

interface CurrentWeatherProps {
  current: CurrentWeatherData;
  location: GeoLocation | null;
}

export default function CurrentWeather({
  current,
  location,
}: CurrentWeatherProps) {
  const [{ description, icon }] = current.weather;
  const cityName = location ? `${location.name}, ${location.country}` : "";

  return (
    <div className="card card-lg current-weather-card">
      <h2 className="title-2 text-white">Now</h2>
      <div className="wrapper my-3 flex items-center gap-2">
        <p className="heading">
          {Math.trunc(current.main.temp)}&deg;<sup>c</sup>
        </p>
        <Image
          src={`/weather_icons/${icon}.png`}
          width={64}
          height={64}
          alt={description}
          className="weather-icon mx-auto h-16 w-16"
        />
      </div>
      <p className="body-3 capitalize">{description}</p>
      <ul className="meta-list mt-4 border-t border-outline pt-4">
        <li className="meta-item mb-3 flex items-center gap-2">
          <span className="m-icon">calendar_today</span>
          <p className="title-3 meta-text text-on-surface-variant">
            {getDate(current.dt, current.timezone)}
          </p>
        </li>
        <li className="meta-item flex items-center gap-2">
          <span className="m-icon">location_on</span>
          <p className="title-3 meta-text text-on-surface-variant">
            {cityName}
          </p>
        </li>
      </ul>
    </div>
  );
}
