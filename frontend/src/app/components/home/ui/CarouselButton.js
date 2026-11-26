import Icon from "./Icon";

/** Round prev/next button (white, turns navy on hover). */
export default function CarouselButton({ direction = "next", label, onClick, className = "", style }) {
  return (
    <button type="button" aria-label={label} onClick={onClick} className={`rv-btn ${className}`.trim()} style={style}>
      <Icon name={direction === "next" ? "arrowRight" : "arrowLeft"} size={18} strokeWidth={2.2} />
    </button>
  );
}
