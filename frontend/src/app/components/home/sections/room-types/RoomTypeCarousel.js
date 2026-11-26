"use client";

import Link from "next/link";
import { ROOM_TYPES } from "../../data/roomTypes";
import { ACCOUNT_LINKS } from "../../data/navigation";
import useAutoAdvance from "../../hooks/useAutoAdvance";
import SectionHeading from "../../ui/SectionHeading";
import CarouselButton from "../../ui/CarouselButton";
import PillLink from "../../ui/PillLink";
import Icon from "../../ui/Icon";
import "../../styles/room-types.css";

const AUTO_PLAY_MS = 3500;
const PAUSE_AFTER_CLICK_MS = 10000;

// Position of card `i` relative to the active card: 0 = centre, ±1 = sides, others hidden.
function offsetFrom(active, i, count) {
  let d = (((i - active) % count) + count) % count;
  if (d > count / 2) d -= count;
  return d;
}

/** Room categories — the centre card opens that room type's page. */
export default function RoomTypeCarousel() {
  const count = ROOM_TYPES.length;
  const [active, goTo] = useAutoAdvance(count, AUTO_PLAY_MS, PAUSE_AFTER_CLICK_MS);

  return (
    <section id="rooms" className="rh-sheet rh-sheet--peach">
      <div className="rh-section-head rh-section-head--split">
        <div className="rh-section-head__text">
          <SectionHeading
            eyebrow="ROOM CATEGORIES"
            title="Every tenant deserves"
            muted="a room that fits."
            text="Bills-included rooms for students and young professionals."
            tone="warm"
          />
        </div>
        <PillLink href={ACCOUNT_LINKS.allRooms}>View all rooms</PillLink>
      </div>

      <div className="rh-container room-types__body">
        <div className="rc-stage" role="region" aria-roledescription="carousel" aria-label="Room types">
          {ROOM_TYPES.map((type, i) => {
            const d = offsetFrom(active, i, count);
            const isCentre = d === 0;
            const isVisible = Math.abs(d) <= 1;
            return (
              <Link
                key={type.title}
                href={type.href}
                className="rc-card"
                aria-hidden={isCentre ? "false" : "true"}
                tabIndex={isVisible ? 0 : -1}
                onClick={(event) => {
                  if (isCentre) return; // centre card navigates to the room type page
                  event.preventDefault();
                  goTo(i);
                }}
                style={{
                  transform: `translateX(-50%) translateX(${d * 108}%) scale(${isCentre ? 1 : 0.84})`,
                  opacity: isCentre ? 1 : isVisible ? 0.5 : 0,
                  zIndex: 10 - Math.abs(d),
                  pointerEvents: isVisible ? "auto" : "none",
                }}
              >
                <img className="rc-img" src={type.image} alt={type.title} />
                <span className="rc-card__head">
                  <span className="rc-title">{type.title}</span>
                  <span className="rc-card__arrow" style={{ background: isCentre ? "#F26A36" : "#C9D0DC" }}>
                    <Icon name="arrowRight" size={16} strokeWidth={2.4} />
                  </span>
                </span>
                <span className="rc-card__body">{type.body}</span>
              </Link>
            );
          })}
        </div>

        <div className="room-types__controls">
          <CarouselButton direction="prev" label="Previous room type" onClick={() => goTo(active - 1)} />
          <div className="room-types__dots" role="tablist" aria-label="Choose room type">
            {ROOM_TYPES.map((type, i) => {
              const isActive = i === active;
              return (
                <button
                  key={type.title}
                  type="button"
                  role="tab"
                  aria-selected={isActive ? "true" : "false"}
                  aria-label={type.title}
                  onClick={() => goTo(i)}
                  className="room-types__dot"
                >
                  <span style={{ width: isActive ? 24 : 8, background: isActive ? "#F26A36" : "#E6CDBD" }}></span>
                </button>
              );
            })}
          </div>
          <CarouselButton direction="next" label="Next room type" onClick={() => goTo(active + 1)} />
        </div>
      </div>
    </section>
  );
}
