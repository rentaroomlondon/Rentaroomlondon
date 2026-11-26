import Link from "next/link";
import { ICONS } from "../../ui/icons";

/** One listing in the "Rooms ready to move into" carousel. */
export default function RoomCard({ room, saved, onToggleSave }) {
  return (
    <div className="ls-card">
      <div className="ls-card__media">
        <Link href={room.href} className="ls-card__image-link">
          <img src={room.image} alt={room.title} className="ls-img" loading="lazy" />
        </Link>
        <span className="ls-card__badge">{room.badge}</span>
        <button
          type="button"
          onClick={onToggleSave}
          aria-pressed={saved ? "true" : "false"}
          aria-label={`Save ${room.title}`}
          className="ls-heart"
        >
          <svg aria-hidden="true" width="26" height="26" viewBox="0 0 24 24" fill={saved ? "#F26A36" : "rgba(20,33,61,.35)"} stroke="#FFFFFF" strokeWidth="2" strokeLinejoin="round">
            <path d={ICONS.heart} />
          </svg>
        </button>
      </div>
      <Link href={room.href} className="ls-card__info">
        <span className="ls-card__title" title={room.title}>{room.title}</span>
        <span className="ls-card__meta">
          {room.district} · Available {room.availability}
        </span>
        <span className="ls-card__price">
          <strong>{room.priceLabel}</strong> / month · bills included
        </span>
      </Link>
    </div>
  );
}
