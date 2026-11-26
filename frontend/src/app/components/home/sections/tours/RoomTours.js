"use client";

import { useState } from "react";
import Link from "next/link";
import { TOURS } from "../../data/tours";
import { ACCOUNT_LINKS } from "../../data/navigation";
import { SOCIAL_LINKS } from "../../data/contact";
import SectionHeading from "../../ui/SectionHeading";
import PillLink from "../../ui/PillLink";
import Icon from "../../ui/Icon";
import "../../styles/tours.css";

/** Featured video tour + list of other tours. */
export default function RoomTours() {
  const [active, setActive] = useState(0);
  const tour = TOURS[active];

  return (
    <section id="tours" className="rh-sheet rh-sheet--peach">
      <div className="rh-section-head rh-section-head--split">
        <div className="rh-section-head__text">
          <SectionHeading
            eyebrow="ROOM TOURS"
            title="Take a look inside"
            muted="before you visit."
            text="Watch short video tours of our rooms, then book a viewing for the ones you love."
            tone="warm"
          />
        </div>
        <PillLink href={SOCIAL_LINKS.youtube}>More on YouTube</PillLink>
      </div>

      <div className="rh-container tours__layout">
        <div className="tour-main">
          <div className="ph-dark tour-main__poster"></div>
          <div className="tour-main__shade"></div>
          <span className="tour-main__placeholder">[Video: {tour.title}]</span>
          <button type="button" aria-label={`Play video: ${tour.title}`} className="tour-main__play">
            <span className="playring" aria-hidden="true"></span>
            <Icon name="play" size={30} fill="#FFFFFF" />
          </button>
          <div className="tour-main__caption">
            <span className="tour-tag">VIDEO TOUR</span>
            <span className="tour-main__title">{tour.title}</span>
            <span className="tour-main__body">{tour.body}</span>
          </div>
        </div>

        <div className="tours__list">
          {TOURS.map((item, i) => {
            const isActive = i === active;
            return (
              <button
                key={item.title}
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={isActive ? "true" : "false"}
                className={`tour-item${isActive ? " tour-item--active" : ""}`}
              >
                <span className="ph-dark tour-thumb">
                  <span className="tour-thumb__play">
                    <Icon name="play" size={14} fill="#FFFFFF" />
                  </span>
                </span>
                <span className="tour-item__text">
                  <span className="tour-item__title">{item.title}</span>
                  <span className="tour-item__tag">VIDEO TOUR</span>
                </span>
              </button>
            );
          })}
          <Link href={ACCOUNT_LINKS.bookViewing} className="tours__cta">
            <span className="tours__cta-text">
              <span className="tours__cta-title">Like what you see?</span>
              <span className="tours__cta-sub">Book a viewing in person or by video call.</span>
            </span>
            <span className="rh-arrow-circle tours__cta-arrow">
              <Icon name="arrowRight" size={18} color="#FFFFFF" strokeWidth={2.4} />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
