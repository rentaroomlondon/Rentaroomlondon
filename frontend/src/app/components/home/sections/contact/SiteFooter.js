import Link from "next/link";
import { AREA_PAGES, FOOTER_LINKS, LEGAL_LINKS } from "../../data/navigation";
import { CONTACT, SOCIAL_LINKS } from "../../data/contact";
import Icon from "../../ui/Icon";
import { SOCIAL_ICONS } from "./socialIcons";

const SOCIAL_ORDER = [
  ["facebook", "Facebook"],
  ["x", "X"],
  ["youtube", "YouTube"],
  ["linkedin", "LinkedIn"],
];

function ContactIcon({ children }) {
  return <span className="pf-ico">{children}</span>;
}

export default function SiteFooter() {
  return (
    <footer className="pfoot">
      <div className="pf-word" aria-hidden="true">RENTAROOM</div>
      <div className="pf-body">
        <div className="pf-cols">
          <div className="pf-brand">
            <img src="/home/logo.webp" alt="Rental Room UK London" className="pf-brand__logo" />
            <span className="pf-brand__text">
              Book your perfect room with us today. No hidden costs, no surprises — affordable living with bills included.
            </span>
            <div className="pf-brand__social">
              {SOCIAL_ORDER.map(([key, label]) => {
                const href = SOCIAL_LINKS[key];
                const external = href.startsWith("http");
                return (
                  <a
                    key={key}
                    href={href}
                    aria-label={label}
                    className="soc2"
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    <Icon d={SOCIAL_ICONS[key].d} size={SOCIAL_ICONS[key].size} fill="currentColor" />
                  </a>
                );
              })}
            </div>
          </div>

          <nav aria-label="Explore" className="pf-nav">
            <span className="pf-h">Explore</span>
            {FOOTER_LINKS.map((link) => (
              <Link key={link.label} href={link.href} className="pf-link">{link.label}</Link>
            ))}
          </nav>

          <nav aria-label="Locations" className="pf-nav">
            <span className="pf-h">Rent a room in</span>
            <div className="pf-areas">
              {AREA_PAGES.map((area) => (
                <Link key={area.label} href={area.href} className="pf-link">{area.label}</Link>
              ))}
            </div>
          </nav>

          <div className="pf-nav">
            <span className="pf-h">Contact</span>
            <a href={`mailto:${CONTACT.email}`} className="pf-contact">
              <ContactIcon><Icon name="mail" size={13} strokeWidth={2.2} /></ContactIcon>
              {CONTACT.email}
            </a>
            <a href={CONTACT.phoneHref} className="pf-contact">
              <ContactIcon><Icon name="phone" size={13} strokeWidth={2.2} /></ContactIcon>
              {CONTACT.phoneDisplay}
            </a>
            <span className="pf-contact">
              <ContactIcon>
                <svg aria-hidden="true" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" />
                  <circle cx="12" cy="9.5" r="2.5" />
                </svg>
              </ContactIcon>
              {CONTACT.location}
            </span>
          </div>
        </div>

        <div className="pf-bar">
          <span>© {new Date().getFullYear()} Rental Room London</span>
          <span className="pf-bar__links">
            {LEGAL_LINKS.map((link) => (
              <Link key={link.label} href={link.href} className="pf-link">{link.label}</Link>
            ))}
          </span>
        </div>
      </div>
    </footer>
  );
}
