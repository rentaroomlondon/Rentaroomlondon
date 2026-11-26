import { CONTACT } from "../../data/contact";
import Icon from "../../ui/Icon";
import { WHATSAPP_PATH } from "./socialIcons";

/** Glass call-to-action card at the top of the navy footer. */
export default function ContactCta() {
  return (
    <div className="contact__inner">
      <div className="glass-cta">
        <div className="glass-cta__copy">
          <h2>Your London room is one search away.</h2>
          <p>Talk to our team today — we&apos;ll match you with rooms that fit your budget, commute and move-in date.</p>
        </div>
        <div className="glass-cta__actions">
          <a href={CONTACT.phoneHref} className="glass-cta__btn glass-cta__btn--call">
            <Icon name="phone" size={18} />
            Call {CONTACT.phoneDisplay}
          </a>
          <a href={CONTACT.whatsappHref} target="_blank" rel="noopener noreferrer" className="glass-cta__btn glass-cta__btn--whatsapp">
            <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="#25D366">
              <path d={WHATSAPP_PATH} />
            </svg>
            WhatsApp us
          </a>
        </div>
      </div>
    </div>
  );
}
