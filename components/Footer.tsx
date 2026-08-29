import Image from "next/image";

export default function Footer() {
  return (
    <footer className="footer mt-7 mb-6 flex flex-wrap items-center justify-center gap-3 gap-x-6 text-center text-on-surface-variant">
      <p className="body-3">
        Copyright &copy; {new Date().getFullYear()} billal benz. All rights
        reserved.
      </p>
      <p className="body-3 flex flex-wrap items-center gap-2">
        Powered by
        <a
          href="https://openweathermap.org/api"
          title="Free OpenWeather Api"
          target="_blank"
          rel="noopener"
        >
          <Image
            src="/images/openweather.png"
            width={150}
            height={30}
            loading="lazy"
            alt="OpenWeather"
            className="h-7.5 w-37.5"
          />
        </a>
      </p>
    </footer>
  );
}
