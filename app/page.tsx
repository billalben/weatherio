import { Suspense } from "react";
import Header from "@/components/Header";
import WeatherContent from "@/components/WeatherContent";
import Loading from "@/components/Loading";

export default function Page(props: PageProps<"/">) {
  return (
    <>
      <Header />

      <main>
        <Suspense fallback={<Loading />}>
          <WeatherContent searchParams={props.searchParams} />
        </Suspense>
      </main>
    </>
  );
}
