import { ICONS } from "./icons";

/**
 * Stroke icon from the ICONS map (or a raw path via `d`).
 * Decorative by default (aria-hidden).
 */
export default function Icon({
  name,
  d,
  size = 18,
  color = "currentColor",
  strokeWidth = 2,
  fill = "none",
  linejoin = "round",
  className,
}) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill}
      stroke={fill === "none" ? color : undefined}
      strokeWidth={fill === "none" ? strokeWidth : undefined}
      strokeLinecap={fill === "none" ? "round" : undefined}
      strokeLinejoin={fill === "none" && linejoin ? linejoin : undefined}
    >
      <path d={d || ICONS[name]} />
    </svg>
  );
}
