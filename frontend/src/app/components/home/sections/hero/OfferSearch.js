"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { OFFER, SEARCH_ROOM_TYPES } from "../../data/hero";
import Icon from "../../ui/Icon";
import LocationAutocomplete from "@/app/components/LocationAutocomplete";

/** Orange offer strip + room search form. Submits to /find-a-room. */
export default function OfferSearch() {
  const router = useRouter();
  const [location, setLocation] = useState("");
  const locationFieldRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget.elements;
    const type = SEARCH_ROOM_TYPES[form.type.selectedIndex] || SEARCH_ROOM_TYPES[0];
    const params = new URLSearchParams();
    if (location.trim()) params.set("search", location.trim());
    if (form.date.value) params.set("date", form.date.value);
    if (type.roomType) params.set("roomType", type.roomType);
    const query = params.toString();
    router.push(`/find-a-room${query ? `?${query}` : ""}`);
  };

  return (
    <div className="offer-wrap">
      <div className="offer-strip">
        <span className="offer-strip__tag">
          <span aria-hidden="true" className="offer-strip__dot"></span>
          {OFFER.label}
        </span>
        <p className="offer-strip__text">
          <strong>{OFFER.headline}</strong>
          {OFFER.detail}
        </p>
        <Link href={OFFER.cta.href} className="offer-strip__cta">
          {OFFER.cta.label}{" "}
          <Icon name="arrowRight" size={14} strokeWidth={2.6} />
        </Link>
      </div>
      <form className="hero-form" onSubmit={handleSubmit}>
        <div ref={locationFieldRef} className="hero-form__field hero-form__field--location">
          <label htmlFor="loc">Where are you looking?</label>
          <LocationAutocomplete
            id="loc"
            name="loc"
            placeholder="Area, city or postcode, e.g. NW4"
            enterKeyHint="search"
            value={location}
            onChange={setLocation}
            onSelect={(place) => setLocation(place.value)}
            anchorRef={locationFieldRef}
          />
        </div>
        <div className="hero-form__field">
          <label htmlFor="date">Move-in date</label>
          <input id="date" name="date" type="date" />
        </div>
        <div className="hero-form__field">
          <label htmlFor="type">Room type</label>
          <select id="type" name="type">
            {SEARCH_ROOM_TYPES.map((option) => (
              <option key={option.label}>{option.label}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="hero-form__submit">
          <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round">
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-3.5-3.5" />
          </svg>
          Search rooms
        </button>
      </form>
    </div>
  );
}
