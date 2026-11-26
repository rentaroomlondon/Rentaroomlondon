"use client";

import { useState } from "react";
import Link from "next/link";
import { REGIONS } from "../../data/coverage";
import SectionHeading from "../../ui/SectionHeading";
import Icon from "../../ui/Icon";
import CityMap from "./CityMap";
import "../../styles/coverage.css";

const MISSING_PINS_NOTE = "[Send this region's postcodes to pin them on the map]";

/** Coverage map — pick a region, then an area; the area card links to that area's page. */
export default function Coverage() {
  const [regionIndex, setRegionIndex] = useState(0);
  const [areaIndex, setAreaIndex] = useState(0);

  const areas = REGIONS[regionIndex].areas;
  const activeIndex = Math.min(areaIndex, areas.length - 1);
  const current = areas[activeIndex];
  const showPins = regionIndex === 0;
  const areaHref = current.href || `/find-a-room?search=${encodeURIComponent(current.code)}`;

  return (
    <section id="coverage" className="rh-sheet rh-sheet--white">
      <div className="rh-section-head">
        <SectionHeading eyebrow="COVERAGE MAP" title="Rooms across London," muted="postcode by postcode." wideTitle />
      </div>

      <div className="rh-container coverage__body">
        <div role="tablist" aria-label="Regions" className="reg-tabs">
          {REGIONS.map((region, i) => {
            const selected = i === regionIndex;
            return (
              <button
                key={region.name}
                type="button"
                role="tab"
                aria-selected={selected ? "true" : "false"}
                className={`reg-tab${selected ? " reg-tab--selected" : ""}`}
                onClick={() => {
                  setRegionIndex(i);
                  setAreaIndex(0);
                }}
              >
                {region.name}
              </button>
            );
          })}
        </div>

        <div className="coverage__layout">
          <div className="mapstage">
            <div className="mapstage__legend">
              <span className="mapstage__chip">London coverage</span>
              <span className="mapstage__chip mapstage__chip--key">
                <span className="mapstage__dot"></span>Rooms available
              </span>
            </div>
            <CityMap areas={areas} activeIndex={activeIndex} showPins={showPins} onSelectArea={setAreaIndex} />
            {!showPins && <div className="mapstage__note">{MISSING_PINS_NOTE}</div>}
            <p className="mapstage__caption">Illustrative map — not to scale</p>
          </div>

          <div role="tabpanel" className="coverage__panel">
            <div className="area-card">
              <div className="area-card__head">
                <span className="area-card__code">{current.code}</span>
                <span className="area-card__badge">ROOMS AVAILABLE</span>
              </div>
              <span className="area-card__name">{current.area}</span>
              <span className="area-card__note">{current.note}</span>
              <Link href={areaHref} className="area-card__link">
                See rooms in {current.code}{" "}
                <Icon name="arrowRight" size={14} strokeWidth={2.6} />
              </Link>
            </div>
            <div className="area-list">
              {areas.map((area, i) => {
                const pressed = i === activeIndex;
                return (
                  <button
                    key={`${area.code}-${i}`}
                    type="button"
                    onClick={() => setAreaIndex(i)}
                    aria-pressed={pressed ? "true" : "false"}
                    className={`area-list__item${pressed ? " area-list__item--active" : ""}`}
                  >
                    <span className="area-list__code">{area.code}</span>
                    <span className="area-list__name">{area.area}</span>
                    <Icon name="chevronRight" size={16} color="#C2410C" strokeWidth={2.4} />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
