"use client";

import { STEPS } from "../../data/steps";
import useAutoAdvance from "../../hooks/useAutoAdvance";
import SectionHeading from "../../ui/SectionHeading";
import Icon from "../../ui/Icon";
import StepTimeline from "./StepTimeline";
import StepPreview from "./StepPreview";
import "../../styles/how-it-works.css";

const AUTO_PLAY_MS = 4500;
const PAUSE_AFTER_CLICK_MS = 12000;

/** Seven-step process with an auto-playing timeline and a live preview card. */
export default function HowItWorks() {
  const [active, goTo] = useAutoAdvance(STEPS.length, AUTO_PLAY_MS, PAUSE_AFTER_CLICK_MS);
  const step = STEPS[active];
  const number = String(active + 1).padStart(2, "0");

  return (
    <section id="how" className="rh-sheet rh-sheet--peach">
      <div className="rh-section-head">
        <SectionHeading
          eyebrow="A SIMPLER PROCESS"
          title="Finding a room has never"
          muted="been this easy."
          text="No pressure, no confusing jargon. Seven simple steps from search to keys."
          tone="warm"
          wideTitle
          textWidth={520}
        />
      </div>

      <div className="rh-container how__timeline">
        <StepTimeline steps={STEPS} active={active} onSelect={goTo} />
      </div>

      <div className="rh-container how__stage">
        <div className="how__copy">
          <span className="step-num" aria-hidden="true">{number}</span>
          <h3 className="step-copy how__title">{step.title}</h3>
          <p className="step-copy how__body">{step.body}</p>
          <div className="how__controls">
            <button type="button" aria-label="Previous step" onClick={() => goTo(active - 1)} className="how__btn how__btn--prev">
              <Icon name="arrowLeft" size={18} strokeWidth={2.4} />
            </button>
            <button type="button" aria-label="Next step" onClick={() => goTo(active + 1)} className="how__btn how__btn--next">
              <Icon name="arrowRight" size={18} strokeWidth={2.4} />
            </button>
          </div>
        </div>
        <StepPreview step={step} index={active} />
      </div>
    </section>
  );
}
