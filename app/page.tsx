import { Suspense } from "react";
import WeatherApp from "@/components/WeatherApp";
import Loading from "@/components/Loading";

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <WeatherApp />
    </Suspense>
  );
}
