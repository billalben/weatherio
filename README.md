# weatherio

A weather app providing current conditions and forecasts for cities around the world, powered by the OpenWeatherMap API.

## Features

- **Modern, responsive design** — works on all devices (768px / 1200px / 1400px breakpoints).
- **5-day forecast** for any city.
- **Today's highlights** — Air Quality Index, Sunrise & Sunset, Humidity, Pressure, Visibility, and Feels Like.
- **Search bar** with city suggestions and debounce (600ms) to avoid spamming the API.
- **Current location** button using the browser's geolocation API.
- **Shareable URLs** — the location is stored in the URL query string (`/?lat=...&lon=...`).
- **API key kept server-side** — all OpenWeatherMap calls go through Next.js Route Handlers, so the key never reaches the browser.

## Getting Started

Create `.env.local` with your OpenWeatherMap API key:

```bash
echo "WEATHER_API_KEY=your_api_key_here" > .env.local
```

Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
app/
  layout.tsx               # Root layout, Nunito Sans font, metadata
  page.tsx                 # Weather page (client component, reads lat/lon from search params)
  globals.css              # Tailwind v4 theme + Material Symbols font + custom CSS
  not-found.tsx            # 404 page
  api/weather/             # Route handlers proxying the OpenWeatherMap API
    current/route.ts       #   GET ?lat&lon
    forecast/route.ts      #   GET ?lat&lon
    air-pollution/route.ts #   GET ?lat&lon
    reverse-geocoding/     #   GET ?lat&lon
    geo-coding/route.ts    #   GET ?query
components/                # Header, SearchBar, CurrentWeather, Highlights,
                           # HourlyForecast, FiveDayForecast, Footer, Loading, WeatherApp
lib/
  weather/                 # Types + server-only OpenWeatherMap client
  utils/format.ts          # Date/time helpers and AQI text
  location.ts              # Default location
```

## Tech Stack

- **Next.js 16** (App Router, Route Handlers)
- **React 19**
- **Tailwind CSS v4**
- **TypeScript**
- **OpenWeatherMap API**

## Deploy on Vercel

The easiest way to deploy is to use the [Vercel Platform](https://vercel.com/new) and set `WEATHER_API_KEY` as an environment variable in your project settings.