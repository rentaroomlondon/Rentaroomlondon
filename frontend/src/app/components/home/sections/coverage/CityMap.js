import { BLOCKS, BUILDINGS, TREES, routePath } from "./cityMapModel";
import { MAP_ORIGIN, PIN_POSITIONS } from "../../data/coverage";

const DEFAULT_PIN = [548, 350];

function MapPin({ area, active, x, y, onSelect }) {
  return (
    <div className="bb" style={{ left: x, top: y }}>
      <button
        type="button"
        className="bbi mpin"
        onClick={onSelect}
        aria-pressed={active ? "true" : "false"}
        aria-label={`${area.code}: ${area.area}`}
      >
        {active ? (
          <span className="map-callout">
            <span className="map-callout__kicker">Your next room</span>
            <span className="map-callout__row">
              <span className="map-callout__code">{area.code}</span>
              <span className="map-callout__status">Rooms available</span>
            </span>
            <span className="map-callout__area">{area.area}</span>
            <span className="map-callout__track">
              <span className="map-callout__line map-callout__line--done"></span>
              <span className="map-callout__stop"></span>
              <span className="map-callout__line"></span>
            </span>
            <span className="map-callout__ends">
              <span>Central London</span>
              <span>{area.code}</span>
            </span>
          </span>
        ) : (
          <span className="map-pin-label">{area.code}</span>
        )}
        <svg aria-hidden="true" width={active ? 40 : 30} height={active ? 53 : 40} viewBox="0 0 30 40">
          <path d="M15 39 C 15 39 3 24 3 15 a12 12 0 0 1 24 0 c0 9-12 24-12 24z" fill={active ? "#F26A36" : "#14213D"} />
          <circle cx="15" cy="15" r="5" fill="#FFFFFF" />
        </svg>
      </button>
    </div>
  );
}

/** Isometric illustrated London map. Pins are shown only for regions with real postcodes. */
export default function CityMap({ areas, activeIndex, showPins, onSelectArea }) {
  const target = showPins ? PIN_POSITIONS[areas[activeIndex]?.code] || DEFAULT_PIN : MAP_ORIGIN;
  const route = routePath(MAP_ORIGIN, target);

  return (
    <div className="plane">
      {BLOCKS.map((block) => (
        <div
          key={`${block.x}-${block.y}`}
          className="map-block"
          style={{ left: block.x, top: block.y, background: block.park ? "#DDF0CC" : "#E9ECF0" }}
        ></div>
      ))}

      <svg aria-hidden="true" viewBox="0 0 1100 880" className="map-layer">
        <path d="M -40 640 C 180 600, 330 735, 560 700 S 900 612, 1140 668" fill="none" stroke="#CFE5F8" strokeWidth="64" strokeLinecap="round" />
      </svg>
      <span className="map-river-label">River Thames</span>

      {showPins && (
        <>
          <svg aria-hidden="true" viewBox="0 0 1100 880" className="map-layer map-layer--route">
            <path d={route} fill="none" stroke="#14213D" strokeWidth="16" strokeLinejoin="round" strokeLinecap="round" />
            <path d={route} fill="none" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="7 9" strokeLinejoin="round" />
            <circle cx={MAP_ORIGIN[0]} cy={MAP_ORIGIN[1]} r="15" fill="#14213D" />
            <circle cx={MAP_ORIGIN[0]} cy={MAP_ORIGIN[1]} r="6" fill="#FFFFFF" />
          </svg>
          <div className="car" style={{ offsetPath: `path('${route}')` }}>
            <svg width="38" height="20" viewBox="0 0 38 20">
              <rect x="1" y="2" width="36" height="16" rx="6" fill="#FFFFFF" stroke="#C7CDD6" />
              <rect x="22" y="4" width="8" height="12" rx="2" fill="#9AA6B8" />
              <rect x="7" y="4" width="6" height="12" rx="2" fill="#B9C2CF" />
              <rect x="31" y="4" width="4" height="3" rx="1" fill="#F26A36" />
              <rect x="31" y="13" width="4" height="3" rx="1" fill="#F26A36" />
            </svg>
          </div>
        </>
      )}

      {BUILDINGS.map((b) => (
        <BuildingBlock key={`${b.x}-${b.y}`} building={b} />
      ))}

      {TREES.map((tree) => (
        <div key={`${tree.x}-${tree.y}`} className="bb" style={{ left: tree.x, top: tree.y }}>
          <svg className="bbi" aria-hidden="true" width={tree.w} height={tree.h} viewBox="0 0 30 46">
            <rect x="13" y="32" width="4" height="12" rx="2" fill="#A3A9B3" />
            <path d="M15 2 L27 34 Q15 39 3 34 Z" fill="#8FD16A" />
            <path d="M15 2 L27 34 Q21 37 15 37 Z" fill="#6DB548" />
          </svg>
        </div>
      ))}

      <div className="bb" style={{ left: 993, top: 600 }}>
        <span className="bbi map-centre-label">Central London</span>
      </div>

      {showPins &&
        areas.map((area, i) => {
          const [x, y] = PIN_POSITIONS[area.code] || DEFAULT_PIN;
          return <MapPin key={area.code} area={area} active={i === activeIndex} x={x} y={y} onSelect={() => onSelectArea(i)} />;
        })}
    </div>
  );
}

function BuildingBlock({ building: b }) {
  return (
    <>
      <div className="bx-shadow" style={{ left: b.x + 10, top: b.y + 10, width: b.w, height: b.d }}></div>
      <div className="bx" style={{ left: b.x, top: b.y, width: b.w, height: b.d }}>
        <div className="bx-s" style={{ height: b.h, background: b.side }}></div>
        <div className="bx-w" style={{ width: b.h, background: b.side2 }}></div>
        <div className="bx-t" style={{ transform: `translateZ(${b.h}px)`, background: b.top }}></div>
      </div>
    </>
  );
}
