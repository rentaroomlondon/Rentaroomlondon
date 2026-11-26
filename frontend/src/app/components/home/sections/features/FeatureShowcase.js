"use client";

import { useState } from "react";
import { FEATURES, FEATURES_INTRO } from "../../data/features";
import SectionHeading from "../../ui/SectionHeading";
import Icon from "../../ui/Icon";
import "../../styles/features.css";

const SHADE_ACTIVE = "linear-gradient(180deg, rgba(10,21,48,0) 35%, rgba(10,21,48,.25) 100%)";
const SHADE_IDLE = "linear-gradient(180deg, rgba(10,21,48,.35) 0%, rgba(10,21,48,.88) 70%)";

/** Section 1 — expanding photo panels (one open at a time). */
export default function FeatureShowcase() {
  const [active, setActive] = useState(0);
  const total = String(FEATURES.length).padStart(2, "0");

  return (
    <section id="difference" className="rh-sheet rh-sheet--white features">
      <div className="rh-section-head">
        <SectionHeading {...FEATURES_INTRO} tone="cool" wideTitle textWidth={520} />
      </div>

      <div className="feat-row">
        {FEATURES.map((feature, i) => {
          const isActive = i === active;
          return (
            <button
              key={feature.title}
              type="button"
              className="feat-panel"
              onClick={() => setActive(i)}
              aria-expanded={isActive ? "true" : "false"}
              aria-label={feature.title}
              style={{ flex: `${isActive ? 5 : 1} 1 0` }}
            >
              <img
                className="feat-panel__image"
                src={feature.image}
                alt={feature.alt}
                style={{ objectPosition: feature.position, transform: `scale(${isActive ? 1 : 1.08})` }}
              />
              <div className="feat-panel__shade" style={{ background: isActive ? SHADE_ACTIVE : SHADE_IDLE }}></div>

              {isActive ? (
                <>
                  <div className="feat-panel__counter">
                    <span>{String(i + 1).padStart(2, "0")} / {total}</span>
                  </div>
                  <div className="feat-copy">
                    <span className="feat-copy__icon">
                      <Icon name={feature.icon} size={22} color="#FFFFFF" />
                    </span>
                    <span className="feat-title">{feature.title}</span>
                    <span className="feat-copy__body">{feature.body}</span>
                  </div>
                </>
              ) : (
                <>
                  <span className="feat-panel__chip" style={{ background: feature.chip }}>
                    <Icon name={feature.icon} size={20} color="#FFFFFF" />
                  </span>
                  <span className="vtext feat-panel__label">{feature.title}</span>
                </>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}
