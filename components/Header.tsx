"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SearchBar from "./SearchBar";

interface HeaderProps {
  onSelectLocation: (lat: string, lon: string) => void;
  onCurrentLocation: () => void;
  locating: boolean;
}

export default function Header({
  onSelectLocation,
  onCurrentLocation,
  locating,
}: HeaderProps) {
  const [searchOpen, setSearchOpen] = useState(false);

  const toggleSearch = () => setSearchOpen((open) => !open);
  const closeSearch = () => setSearchOpen(false);

  return (
    <header className="header">
      <div className="container flex items-center justify-between">
        <Link href="/" className="logo block">
          <Image
            src="/images/logo.png"
            alt="logo"
            width={364}
            height={58}
            priority
            className="h-auto w-37.5"
          />
        </Link>

        <SearchBar
          open={searchOpen}
          onToggle={toggleSearch}
          onClose={closeSearch}
          onSelectLocation={onSelectLocation}
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
            onClick={onCurrentLocation}
          >
            <span className="m-icon">my_location</span>
            <span className="span">Current Location</span>
          </button>
        </div>
      </div>
    </header>
  );
}
