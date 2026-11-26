// base.css first: it declares the CSS layer order used by every section stylesheet.
import "./styles/base.css";
import Hero from "./sections/hero/Hero";
import FeatureShowcase from "./sections/features/FeatureShowcase";
import AvailableRooms from "./sections/available/AvailableRooms";
import RoomTypeCarousel from "./sections/room-types/RoomTypeCarousel";
import Coverage from "./sections/coverage/Coverage";
import HowItWorks from "./sections/how-it-works/HowItWorks";
import Testimonials from "./sections/reviews/Testimonials";
import RoomTours from "./sections/tours/RoomTours";
import Faq from "./sections/faq/Faq";
import ContactSection from "./sections/contact/ContactSection";

/**
 * Home page (Option D design).
 * `rooms`     — live listings for "Rooms ready to move into" (see lib/listings.js)
 * The Manrope font (--font-manrope) is loaded in app/layout.js.
 */
export default function HomePage({ rooms = [] }) {
  return (
    <div id="top" className="rrl-home">
      <Hero />
      <FeatureShowcase />
      <AvailableRooms rooms={rooms} />
      <RoomTypeCarousel />
      <Coverage />
      <HowItWorks />
      <Testimonials />
      <RoomTours />
      <Faq />
      <ContactSection />
    </div>
  );
}
