// base.css first: it declares the CSS layer order used by the home section stylesheets.
import "../components/home/styles/base.css";
import ContactSection from "../components/home/sections/contact/ContactSection";

/**
 * The home page's closing section (contact CTA + footer), reused on every other page.
 * Wrapped in `.rrl-home` so the scoped home styles apply; `.rrl-site-footer` undoes the
 * overlap the home page uses to stack its sections.
 */
export default function HomeFooter() {
  return (
    <div className="rrl-home rrl-site-footer">
      <ContactSection />
    </div>
  );
}
