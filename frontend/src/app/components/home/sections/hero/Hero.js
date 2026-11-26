import { HERO, HERO_STATS } from "../../data/hero";
import Icon from "../../ui/Icon";
import SiteHeader from "./SiteHeader";
import OfferSearch from "./OfferSearch";
import "../../styles/hero.css";

export default function Hero() {
  return (
    <section className="hero-photo hero-full">
      <img className="hp-img" src={HERO.image.src} alt={HERO.image.alt} aria-hidden="false" />
      <div className="hp-shade" aria-hidden="true"></div>
      <div className="hp-fog-top" aria-hidden="true"></div>
      <div className="hp-fog" aria-hidden="true"></div>

      <SiteHeader />

      <div className="hero-copy">
        <div className="hero-badge">
          <span className="hero-badge__stars" aria-label="Five star rated" role="img">
            {Array.from({ length: 5 }, (_, i) => (
              <Icon key={i} name="star" size={14} fill="#FFB547" />
            ))}
          </span>
          <span className="hero-badge__text">{HERO.badge}</span>
        </div>
        <h1 className="hero-title">
          {HERO.titleLines[0]}
          <br />
          {HERO.titleLines[1]}
        </h1>
        <p className="hero-intro">{HERO.intro}</p>
        <OfferSearch />
      </div>

      <div className="hero-stat">
        {HERO_STATS.map((stat) => (
          <div key={stat.label} className="hero-stat__item">
            <span className="hero-stat__value">{stat.value}</span>
            <span className="hero-stat__label">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
