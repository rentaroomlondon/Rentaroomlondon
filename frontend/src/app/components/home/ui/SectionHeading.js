/**
 * Eyebrow + two-tone heading + optional intro, as used at the top of every sheet.
 * Renders a fragment so each section keeps its own wrapper (layout differs per section).
 *
 * tone: "cool" (white/grey sheets) or "warm" (peach sheets)
 */
export default function SectionHeading({ eyebrow, title, muted, text, tone = "cool", wideTitle = false, textWidth }) {
  return (
    <>
      <span className="rh-eyebrow">{eyebrow}</span>
      <h2 className={`rh-title${wideTitle ? " rh-title--wide" : ""}`}>
        <span className="rh-title__strong">{title}</span>{" "}
        <span className={`rh-title__muted rh-title__muted--${tone}`}>{muted}</span>
      </h2>
      {text && (
        <p className={`rh-intro rh-intro--${tone}`} style={textWidth ? { maxWidth: textWidth } : undefined}>
          {text}
        </p>
      )}
    </>
  );
}
