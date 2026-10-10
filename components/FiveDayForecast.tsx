import { getForecastDay } from "@/lib/utils/format";
import type { Forecast, ForecastEntry } from "@/lib/weather/types";

interface FiveDayForecastProps {
  forecast: Forecast;
}

interface DayGroup {
  day: ReturnType<typeof getForecastDay>;
  entries: { entry: ForecastEntry; hour: number }[];
}

export default function FiveDayForecast({ forecast }: FiveDayForecastProps) {
  const { timezone } = forecast.city;
  const groups = new Map<string, DayGroup>();

  for (const entry of forecast.list) {
    const day = getForecastDay(entry.dt, timezone);
    const group = groups.get(day.key);
    if (group) {
      group.entries.push({ entry, hour: day.hour });
    } else {
      groups.set(day.key, { day, entries: [{ entry, hour: day.hour }] });
    }
  }

  const days = Array.from(groups.values())
    .slice(0, 5)
    .map(({ day, entries }) => {
      const closest = entries.reduce((closest, current) =>
        Math.abs(current.hour - 12) < Math.abs(closest.hour - 12)
          ? current
          : closest,
      );
      const [{ icon, description }] = closest.entry.weather;
      const temp_max = Math.max(
        ...entries.map(({ entry }) => entry.main.temp_max),
      );
      return { day, icon, description, temp_max };
    });

  return (
    <>
      <h2 className="title-2" id="forecast-label">
        5 Days Forecast
      </h2>
      <div className="card card-lg forecast-card">
        <ul>
          {days.map(({ day, icon, description, temp_max }) => (
            <li
              key={day.key}
              className="card-item mb-3 flex items-center md:mb-4"
            >
              <div className="icon-wrapper flex items-center gap-2">
                <img
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
                {day.day} {day.month}
              </p>
              <p className="label-1 flex-1 text-right font-semibold text-on-surface-variant">
                {day.weekDay}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
