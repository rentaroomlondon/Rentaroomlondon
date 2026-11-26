import Icon from "../../ui/Icon";
import {
  SearchScreen,
  ShortlistScreen,
  ViewingScreen,
  TermsScreen,
  ApplicationScreen,
  PaymentScreen,
  MoveInScreen,
} from "./previewScreens";

// One mock screen per step, in the same order as data/steps.js.
const SCREENS = [SearchScreen, ShortlistScreen, ViewingScreen, TermsScreen, ApplicationScreen, PaymentScreen, MoveInScreen];

/** Photo background with a floating "phone card" that shows the active step. */
export default function StepPreview({ step, index }) {
  const Screen = SCREENS[index];

  return (
    <div className="preview">
      <img className="pv-bg" src={step.image} alt="" aria-hidden="true" />
      <div className="pv-tint" aria-hidden="true"></div>
      <div className="pv-blob" aria-hidden="true"></div>
      <div className="pv-card">
        <div className="pv-card__head">
          <span className="pv-card__brand">
            <span className="pv-card__icon">
              <Icon name={step.icon} size={18} color="#FFFFFF" strokeWidth={2.2} />
            </span>
            <span className="pv-card__titles">
              <span className="pv-card__title">{step.title}</span>
            </span>
          </span>
        </div>
        <div className="pv-body">{Screen && <Screen />}</div>
      </div>
    </div>
  );
}
