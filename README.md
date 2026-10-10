# weatherio

A weather app providing current conditions and forecasts for cities around the world, powered by the OpenWeatherMap API.

## Features

- **Modern, responsive design** — works on all devices (768px / 1200px / 1400px breakpoints).
- **5-day forecast** for any city, grouped by local calendar day.
- **Today's highlights** — Air Quality Index, Sunrise & Sunset, Humidity, Pressure, Visibility, and Feels Like.
- **Search bar** with city suggestions and debounce (600ms) to avoid spamming the API.
- **Current location** button using the browser's geolocation API.
- **Shareable URLs** — the location lives in the query string (`/?lat=...&lon=...`); the default location is written to the URL automatically.
- **Server-rendered** — data is fetched in Server Components, so there is no client waterfall and the API key never reaches the browser.

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

Other scripts:

```bash
pnpm lint        # ESLint
pnpm typecheck   # tsc --noEmit
pnpm build       # production build
pnpm start       # serve the production build
```

## Project Structure

```
app/
  layout.tsx               # Root layout, Nunito Sans font, metadata, viewport
  page.tsx                 # Weather page (server) — Header + Suspense boundary
  error.tsx                # Route-level error boundary
  global-error.tsx         # Root-layout error boundary
  icon.svg                 # Favicon (file convention)
  globals.css              # Tailwind v4 theme + Material Symbols font + custom CSS
  not-found.tsx            # 404 page
components/
  WeatherContent.tsx       # Server: parses coords, fetches OpenWeather in parallel
  Header.tsx               # Client: search toggle + geolocation (router.replace)
  SearchBar.tsx            # Client: debounced autocomplete via Server Action
  CurrentWeather.tsx       # Current conditions
  Highlights.tsx           # AQI, sun times, humidity, pressure, visibility
  HourlyForecast.tsx       # Next 8 forecast slots
  FiveDayForecast.tsx      # 5-day forecast grouped by local day
  Footer.tsx               # Attribution
  Loading.tsx              # Suspense fallback
lib/
  weather/
    server.ts              # Server-only OpenWeatherMap client
    actions.ts             # "use server" city-search action
    params.ts              # parseCoords: validates lat/lon, falls back to default
    types.ts               # OpenWeatherMap response types
  utils/format.ts          # Date/time helpers and AQI text
  location.ts              # Default location
```

## Tech Stack

- **Next.js 16** (App Router, Server Components, Server Actions)
- **React 19**
- **Tailwind CSS v4**
- **TypeScript**
- **OpenWeatherMap API**

## Deploy on Vercel

The easiest way to deploy is to use the [Vercel Platform](https://vercel.com/new) and set `WEATHER_API_KEY` as an environment variable in your project settings.

If you deploy to a different domain, update `SITE_URL` in `app/layout.tsx`.
