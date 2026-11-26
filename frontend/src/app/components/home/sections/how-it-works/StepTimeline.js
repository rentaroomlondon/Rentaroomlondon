import Icon from "../../ui/Icon";

function stepColors(i, active) {
  if (i === active) return { bg: "#F26A36", fg: "#FFFFFF", border: "#F26A36", label: "#C2410C" };
  if (i < active) return { bg: "#14213D", fg: "#FFFFFF", border: "#14213D", label: "#14213D" };
  return { bg: "#FFFFFF", fg: "#8A6E5E", border: "#EBD6C8", label: "#8A6E5E" };
}

/** Horizontal timeline of step buttons with a progress line. */
export default function StepTimeline({ steps, active, onSelect }) {
  const progress = ((active / (steps.length - 1)) * 100).toFixed(2);

  return (
    <div className="tl">
      <div className="tl-track" aria-hidden="true">
        <div className="tl-fill" style={{ width: `${progress}%` }}></div>
      </div>
      {steps.map((step, i) => {
        const colors = stepColors(i, active);
        return (
          <button
            key={step.short}
            type="button"
            className="tl-node"
            onClick={() => onSelect(i)}
            aria-pressed={i === active ? "true" : "false"}
            aria-label={`Step ${String(i + 1).padStart(2, "0")}: ${step.title}`}
          >
            <span
              className="tl-dot"
              style={{
                background: colors.bg,
                color: colors.fg,
                borderColor: colors.border,
                transform: `scale(${i === active ? 1.15 : 1})`,
              }}
            >
              <Icon name={step.icon} size={18} strokeWidth={2.2} />
            </span>
            <span className="tl-node__label" style={{ color: colors.label }}>{step.short}</span>
          </button>
        );
      })}
    </div>
  );
}
