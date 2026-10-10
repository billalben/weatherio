import type { NextConfig } from "next";
import { DEFAULT_LOCATION } from "./lib/location";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        missing: [
          { type: "query", key: "lat" },
          { type: "query", key: "lon" },
        ],
        destination: `/?lat=${DEFAULT_LOCATION.lat}&lon=${DEFAULT_LOCATION.lon}`,
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
