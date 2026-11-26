import ContactCta from "./ContactCta";
import SiteFooter from "./SiteFooter";
import "../../styles/contact.css";

/** Navy closing section: photo background, contact CTA and the footer. */
export default function ContactSection() {
  return (
    <section id="contact" className="contact">
      <img src="/home/footer-bg.webp" alt="" aria-hidden="true" className="pf-img" />
      <div className="pf-fade" aria-hidden="true"></div>
      <ContactCta />
      <SiteFooter />
    </section>
  );
}
