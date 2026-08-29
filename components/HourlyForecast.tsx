import Image from "next/image";
import { getHours, mpsToKmh } from "@/lib/utils/format";
import type { Forecast } from "@/lib/weather/types";

interface HourlyForecastProps {
  forecast: Forecast;
}

export default function HourlyForecast({ forecast }: HourlyForecastProps) {
  const { list: forecastList, city } = forecast;

  return (
    <>
      <h2 className="title-2 text-white">Today at</h2>
      <div className="slider-container">
        <ul className="slider-list">
          {forecastList.slice(0, 8).map((data) => {
            const [{ icon, description }] = data.weather;
            return (
              <li key={data.dt} className="slider-item min-w-27.5">
                <div className="card card-sm slider-card text-center">
                  <p className="body-3">{getHours(data.dt, city.timezone)}</p>
                  <Image
                    src={`/weather_icons/${icon}.png`}
                    width={48}
                    height={48}
                    alt={description}
                    title={description}
                    className="weather-icon mx-auto my-3 h-12 w-12"
                  />
                  <p className="body-3">{Math.trunc(data.main.temp)}&deg;</p>
                </div>
              </li>
            );
          })}
        </ul>

        <ul className="slider-list">
          {forecastList.slice(0, 8).map((data) => (
            <li key={data.dt} className="slider-item min-w-27.5">
              <div className="card card-sm slider-card text-center">
                <p className="body-3">{getHours(data.dt, city.timezone)}</p>
                <Image
                  src="/weather_icons/direction.png"
                  width={48}
                  height={48}
                  alt="direction"
                  className="weather-icon mx-auto my-3 h-12 w-12"
                  style={{ transform: `rotate(${data.wind.deg - 180}deg)` }}
                />
                <p className="body-3">
                  {Math.trunc(mpsToKmh(data.wind.speed))} km/h
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
