import Link from "next/link";
import ArrowCircle from "./ArrowCircle";

/**
 * Rounded call-to-action link with the orange arrow badge.
 * variant: "outline" (white with peach border) | "navy" (filled)
 */
export default function PillLink({ href, children, variant = "outline", className = "" }) {
  return (
    <Link href={href} className={`rh-pill rh-pill--${variant} ${className}`.trim()}>
      {children}
      <ArrowCircle size={variant === "navy" ? 36 : 34} />
    </Link>
  );
}
