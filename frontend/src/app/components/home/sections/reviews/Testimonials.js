"use client";

import { useState } from "react";
import { REVIEWS } from "../../data/reviews";
import { SOCIAL_LINKS } from "../../data/contact";
import SectionHeading from "../../ui/SectionHeading";
import CarouselButton from "../../ui/CarouselButton";
import "../../styles/reviews.css";

/** One review at a time with prev/next controls. */
export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const review = REVIEWS[index];
  const step = (by) => setIndex((i) => (i + by + REVIEWS.length) % REVIEWS.length);

  return (
    <section id="reviews" className="rh-sheet rh-sheet--white">
      <div className="rh-section-head">
        <SectionHeading eyebrow="TENANT REVIEWS" title="In their" muted="own words." />
        <a href={SOCIAL_LINKS.trustpilot} aria-label="Rated 5 stars on Trustpilot" className="reviews__badge">
          <img src="/home/trustpilot.webp" alt="Trustpilot — 5 stars" />
        </a>
      </div>

      <div className="rh-container reviews__body">
        <figure className="tq">
          <blockquote className="tq-text">
            {review.before}
            <mark>{review.highlight}</mark>
            {review.after}
          </blockquote>
          <figcaption className="reviews__caption">
            <span className="reviews__name">{review.name}</span>
            <span className="reviews__source">{review.source}</span>
          </figcaption>
        </figure>

        <div className="reviews__footer">
          <div className="reviews__controls">
            <CarouselButton direction="prev" label="Previous review" onClick={() => step(-1)} />
            <span className="reviews__count">{index + 1} / {REVIEWS.length}</span>
            <CarouselButton direction="next" label="Next review" onClick={() => step(1)} />
          </div>
          <a href={SOCIAL_LINKS.trustpilot} className="reviews__all">Read all reviews on Trustpilot</a>
        </div>
      </div>
    </section>
  );
}
