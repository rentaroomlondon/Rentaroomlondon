import React from 'react';
import TrustBadges from './components/TrustBadges';
import Office from './components/Office';
import Stats from './components/Stats';
import Testimonials from './components/Testimonial';
import AreaGuides from './components/AreaGuides';
import FeaturedRooms from './components/FeaturedRooms';
import HowItWorks from './components/HowItWorks';
import HeroSection from './components/HeroSection';

export default function Home() {
  return (
    <div>
      <HeroSection />
      <HowItWorks />
      <FeaturedRooms />
      <AreaGuides />
      <Testimonials />
      <Stats />
      <Office />
      <div className="hidden lg:block">
        <TrustBadges />
      </div>
    </div>
  );
}
