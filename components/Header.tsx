"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import SearchBar from "./SearchBar";
import { DEFAULT_LOCATION } from "@/lib/location";

export default function Header() {
  const router = useRouter();
  const [searchOpen, setSearchOpen] = useState(false);
  const [locating, setLocating] = useState(false);

  const toggleSearch = () => setSearchOpen((open) => !open);
  const closeSearch = () => setSearchOpen(false);

  const updateLocation = useCallback(
    (lat: string, lon: string) => {
      router.replace(`/?lat=${lat}&lon=${lon}`);
    },
    [router],
  );

  const goToCurrentLocation = useCallback(() => {
    if (!navigator.geolocation) {
      updateLocation(DEFAULT_LOCATION.lat, DEFAULT_LOCATION.lon);
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocating(false);
        updateLocation(
          String(position.coords.latitude),
          String(position.coords.longitude),
        );
      },
      () => {
        setLocating(false);
        updateLocation(DEFAULT_LOCATION.lat, DEFAULT_LOCATION.lon);
      },
    );
  }, [updateLocation]);

  return (
    <header className="header">
      <div className="container flex items-center justify-between">
        <Link href="/" className="logo block">
          <img
            src="/images/logo.png"
            alt="logo"
            width={364}
            height={58}
            fetchPriority="high"
            className="h-auto w-37.5"
          />
        </Link>

        <SearchBar
          open={searchOpen}
          onToggle={toggleSearch}
          onClose={closeSearch}
          onSelectLocation={updateLocation}
        />

        <div className="header-actions flex items-center gap-4">
          <button
            type="button"
            className="icon-btn has-state"
            aria-label="open search"
            onClick={toggleSearch}
          >
            <span className="m-icon">search</span>
          </button>

          <button
            type="button"
            className={`btn-primary has-state ${locating ? "is-disabled" : ""}`}
            aria-disabled={locating}
            onClick={goToCurrentLocation}
          >
            <span className="m-icon">my_location</span>
            <span className="span">Current Location</span>
          </button>
        </div>
      </div>
    </header>
  );
}
