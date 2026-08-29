import Image from "next/image";
import { monthNames, weekDayNames } from "@/lib/utils/format";
import type { Forecast } from "@/lib/weather/types";

interface FiveDayForecastProps {
  forecast: Forecast;
}

interface ForecastEntry {
  temp_max: number;
  icon: string;
  description: string;
  date: Date;
}

export default function FiveDayForecast({ forecast }: FiveDayForecastProps) {
  const entries: ForecastEntry[] = [];

  for (let i = 7; i < forecast.list.length; i += 8) {
    const {
      main: { temp_max },
      weather,
      dt_txt,
    } = forecast.list[i];
    const [{ icon, description }] = weather;
    entries.push({
      temp_max,
      icon,
      description,
      date: new Date(dt_txt),
    });
  }

  return (
    <>
      <h2 className="title-2" id="forecast-label">
        5 Days Forecast
      </h2>
      <div className="card card-lg forecast-card">
        <ul>
          {entries.map(({ temp_max, icon, description, date }) => (
            <li
              key={date.toISOString()}
              className="card-item mb-3 flex items-center md:mb-4"
            >
              <div className="icon-wrapper flex items-center gap-2">
                <Image
                  src={`/weather_icons/${icon}.png`}
                  width={36}
                  height={36}
                  alt={description}
                  title={description}
                  className="weather-icon"
                />
                <span className="span">
                  <p className="title-2 mb-0">{Math.trunc(temp_max)}&deg;</p>
                </span>
              </div>
              <p className="label-1 flex-1 text-right font-semibold text-on-surface-variant">
                {date.getDate()} {monthNames[date.getUTCMonth()]}
              </p>
              <p className="label-1 flex-1 text-right font-semibold text-on-surface-variant">
                {weekDayNames[date.getUTCDay()]}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
