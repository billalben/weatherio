export interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface CurrentWeather {
  weather: WeatherCondition[];
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  dt: number;
  sys: {
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  name: string;
  coord: {
    lat: number;
    lon: number;
  };
}

export interface ForecastEntry {
  dt: number;
  main: {
    temp: number;
    temp_max: number;
    temp_min: number;
  };
  weather: WeatherCondition[];
  wind: {
    speed: number;
    deg: number;
  };
  dt_txt: string;
}

export interface Forecast {
  list: ForecastEntry[];
  city: {
    timezone: number;
    name: string;
    country: string;
  };
}

export interface AirPollution {
  list: {
    main: {
      aqi: 1 | 2 | 3 | 4 | 5;
    };
    components: {
      co: number;
      no: number;
      no2: number;
      o3: number;
      so2: number;
      pm2_5: number;
      pm10: number;
      nh3: number;
    };
  }[];
}

export interface GeoLocation {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

export type ReverseGeocoding = GeoLocation[];
