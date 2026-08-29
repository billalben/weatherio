"use client";

import { useEffect, useRef, useState } from "react";
import type { GeoLocation } from "@/lib/weather/types";

const SEARCH_TIMEOUT_DURATION = 600;

interface SearchBarProps {
  open: boolean;
  onToggle: () => void;
  onClose: () => void;
  onSelectLocation: (lat: string, lon: string) => void;
}

export default function SearchBar({
  open,
  onToggle,
  onClose,
  onSelectLocation,
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<GeoLocation[]>([]);
  const [searching, setSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(
    () => () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    },
    [],
  );

  const handleInput = (value: string) => {
    setQuery(value);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    if (!value) {
      setResults([]);
      setSearching(false);
      return;
    }
    setSearching(true);

    timeoutRef.current = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/weather/geo-coding?query=${encodeURIComponent(value)}`,
        );
        const data = await res.json();
        setResults(Array.isArray(data) ? data : []);
      } catch {
        setResults([]);
      } finally {
        setSearching(false);
      }
    }, SEARCH_TIMEOUT_DURATION);
  };

  const handleSelect = (location: GeoLocation) => {
    onSelectLocation(String(location.lat), String(location.lon));
    onClose();
    setQuery("");
    setResults([]);
  };

  return (
    <div className={`search-view ${open ? "active" : ""}`}>
      <div className="search-wrapper">
        <span className="m-icon leading-icon">search</span>
        <input
          ref={inputRef}
          type="search"
          name="search"
          placeholder="Search city..."
          autoComplete="off"
          className={`search-field w-full bg-transparent ${
            searching ? "searching" : ""
          }`}
          value={query}
          onChange={(event) => handleInput(event.target.value)}
        />
        <button
          type="button"
          className="icon-btn leading-icon has-state"
          aria-label="close search"
          onClick={onToggle}
        >
          <span className="m-icon">arrow_back</span>
        </button>
      </div>

      <div className={`search-result ${results.length > 0 ? "active" : ""}`}>
        <ul className="view-list">
          {results.map((location) => (
            <li key={`${location.lat}-${location.lon}`} className="view-item">
              <span className="m-icon">location_on</span>
              <div>
                <p className="item-title title-3">{location.name}</p>
                <p className="item-subtitle label-2">
                  {location.state ? `${location.state}, ` : ""}
                  {location.country}
                </p>
              </div>
              <button
                type="button"
                className="item-link has-state"
                aria-label={`${location.name} weather`}
                onClick={() => handleSelect(location)}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
