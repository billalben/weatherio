import { aqiText, getTime } from "@/lib/utils/format";
import type {
  AirPollution,
  CurrentWeather as CurrentWeatherData,
} from "@/lib/weather/types";

const aqiColors: Record<number, string> = {
  1: "bg-aqi-1 text-on-aqi-1",
  2: "bg-aqi-2 text-on-aqi-2",
  3: "bg-aqi-3 text-on-aqi-3",
  4: "bg-aqi-4 text-on-aqi-4",
  5: "bg-aqi-5 text-on-aqi-5",
};

interface HighlightsProps {
  current: CurrentWeatherData;
  airPollution: AirPollution;
}

export default function Highlights({ current, airPollution }: HighlightsProps) {
  const {
    main: { aqi },
    components: { no2, o3, so2, pm2_5 },
  } = airPollution.list[0];

  const aqiColor = aqiColors[aqi] ?? aqiColors[1];
  const aqiInfo = aqiText[aqi] ?? aqiText[1];

  return (
    <div className="card card-lg">
      <h2 className="title-2" id="highlights-label">
        Todays Highlights
      </h2>

      <div className="highlight-list grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {/* AIR QUALITY INDEX */}
        <div className="card card-sm highlight-card one md:col-span-2 md:h-40 lg:h-50">
          <h3 className="title-3 mb-5 text-on-surface-variant">
            Air Quality Index
          </h3>
          <div className="wrapper flex items-center justify-between gap-4">
            <span className="m-icon">air</span>
            <ul className="card-list flex grow flex-wrap items-center gap-y-2">
              <li className="card-item flex w-1/2 items-center justify-end gap-1 md:w-1/4 md:flex-col-reverse md:gap-2">
                <p className="title-1">{pm2_5.toPrecision(3)}</p>
                <p className="label-1 text-on-surface-variant">
                  PM<sub>2.5</sub>
                </p>
              </li>
              <li className="card-item flex w-1/2 items-center justify-end gap-1 md:w-1/4 md:flex-col-reverse md:gap-2">
                <p className="title-1">{so2.toPrecision(3)}</p>
                <p className="label-1 text-on-surface-variant">
                  SO<sub>2</sub>
                </p>
              </li>
              <li className="card-item flex w-1/2 items-center justify-end gap-1 md:w-1/4 md:flex-col-reverse md:gap-2">
                <p className="title-1">{no2.toPrecision(3)}</p>
                <p className="label-1 text-on-surface-variant">
                  NO<sub>2</sub>
                </p>
              </li>
              <li className="card-item flex w-1/2 items-center justify-end gap-1 md:w-1/4 md:flex-col-reverse md:gap-2">
                <p className="title-1">{o3.toPrecision(3)}</p>
                <p className="label-1 text-on-surface-variant">
                  O<sub>3</sub>
                </p>
              </li>
            </ul>
          </div>
          <span
            className={`badge absolute right-4 top-4 cursor-help rounded-pill px-3 py-0.5 font-semibold md:right-5 md:top-5 ${aqiColor}`}
            title={aqiInfo.message}
          >
            {aqiInfo.level}
          </span>
        </div>

        {/* SUNRISE & SUNSET */}
        <div className="card card-sm highlight-card two md:col-span-2 md:h-40 lg:h-50">
          <h3 className="title-3 mb-5 text-on-surface-variant">
            Sunrise &amp; Sunset
          </h3>
          <div className="card-list flex flex-wrap items-center gap-x-4 gap-y-2">
            <div className="card-item flex flex-wrap items-center justify-start gap-4">
              <span className="m-icon">clear_day</span>
              <div>
                <p className="label-1 mb-1 text-on-surface-variant">Sunrise</p>
                <p className="title-1">
                  {getTime(current.sys.sunrise, current.timezone)}
                </p>
              </div>
            </div>
            <div className="card-item flex flex-wrap items-center justify-start gap-4">
              <span className="m-icon">clear_night</span>
              <div>
                <p className="label-1 mb-1 text-on-surface-variant">Sunset</p>
                <p className="title-1">
                  {getTime(current.sys.sunset, current.timezone)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* HUMIDITY */}
        <div className="card card-sm highlight-card md:h-30 lg:h-37.5">
          <h3 className="title-3 mb-5 text-on-surface-variant">Humidity</h3>
          <div className="wrapper flex items-center justify-between gap-4">
            <span className="m-icon">humidity_percentage</span>
            <p className="title-1">
              {current.main.humidity}
              <sub>%</sub>
            </p>
          </div>
        </div>

        {/* PRESSURE */}
        <div className="card card-sm highlight-card md:h-30 lg:h-37.5">
          <h3 className="title-3 mb-5 text-on-surface-variant">Pressure</h3>
          <div className="wrapper flex items-center justify-between gap-4">
            <span className="m-icon">airwave</span>
            <p className="title-1">
              {current.main.pressure}
              <sub>hPa</sub>
            </p>
          </div>
        </div>

        {/* VISIBILITY */}
        <div className="card card-sm highlight-card md:h-30 lg:h-37.5">
          <h3 className="title-3 mb-5 text-on-surface-variant">Visibility</h3>
          <div className="wrapper flex items-center justify-between gap-4">
            <span className="m-icon">visibility</span>
            <p className="title-1">
              {current.visibility / 1000}
              <sub>km</sub>
            </p>
          </div>
        </div>

        {/* FEELS LIKE */}
        <div className="card card-sm highlight-card md:h-30 lg:h-37.5">
          <h3 className="title-3 mb-5 text-on-surface-variant">Feels Like</h3>
          <div className="wrapper flex items-center justify-between gap-4">
            <span className="m-icon">thermostat</span>
            <p className="title-1">
              {Math.trunc(current.main.feels_like)}&deg;<sup>c</sup>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
