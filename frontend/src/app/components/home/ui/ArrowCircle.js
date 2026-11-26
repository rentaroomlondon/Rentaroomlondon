import Icon from "./Icon";

/** Orange round badge with a right arrow — used at the end of pill links. */
export default function ArrowCircle({ size = 34, iconSize = 16, className = "" }) {
  return (
    <span className={`rh-arrow-circle ${className}`} style={{ width: size, height: size }}>
      <Icon name="arrowRight" size={iconSize} color="#FFFFFF" strokeWidth={2.4} />
    </span>
  );
}
