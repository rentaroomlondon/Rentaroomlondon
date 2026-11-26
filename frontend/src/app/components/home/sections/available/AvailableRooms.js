"use client";

import { useState } from "react";
import { ACCOUNT_LINKS } from "../../data/navigation";
import { useWishlist } from "@/app/utils/useWishlist";
import SectionHeading from "../../ui/SectionHeading";
import CarouselButton from "../../ui/CarouselButton";
import PillLink from "../../ui/PillLink";
import RoomCard from "./RoomCard";
import "../../styles/available.css";

const VISIBLE_CARDS = 4;

/** "Rooms ready to move into" — live listings from the API (see lib/listings.js). */
export default function AvailableRooms({ rooms = [] }) {
  const [start, setStart] = useState(0);
  const { isSaved, toggleWishlist } = useWishlist();

  const maxStart = Math.max(0, rooms.length - VISIBLE_CARDS);
  const index = Math.min(start, maxStart);

  return (
    <section id="available" className="rh-sheet rh-sheet--grey">
      <div className="rh-section-head">
        <SectionHeading
          eyebrow="AVAILABLE NOW"
          title="Rooms ready"
          muted="to move into."
          text="Hand-picked rooms across London, every one with bills included."
          textWidth={560}
        />
      </div>

      <div className="rh-container available__body">
        {rooms.length > 0 ? (
          <div className="ls-view">
            <div className="ls-track" style={{ "--i": index }}>
              {rooms.map((room) => (
                <RoomCard
                  key={room.id}
                  room={room}
                  saved={isSaved(room.id)}
                  onToggleSave={() => toggleWishlist(room.wishlistItem)}
                />
              ))}
            </div>
          </div>
        ) : (
          <p className="available__empty">New rooms are added every week — browse all available rooms below.</p>
        )}

        <div className="available__nav">
          <CarouselButton
            direction="prev"
            label="Previous rooms"
            className="ls-nav"
            onClick={() => setStart(Math.max(0, index - 1))}
            style={{ opacity: index === 0 ? 0.35 : 1 }}
          />
          <PillLink href={ACCOUNT_LINKS.allRooms} variant="navy">View all rooms</PillLink>
          <CarouselButton
            direction="next"
            label="Next rooms"
            className="ls-nav"
            onClick={() => setStart(Math.min(maxStart, index + 1))}
            style={{ opacity: index === maxStart ? 0.35 : 1 }}
          />
        </div>
      </div>
    </section>
  );
}
