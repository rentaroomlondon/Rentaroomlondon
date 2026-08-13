import React from "react";
import Link from "next/link";
import ContactForm from "@/app/Shared/ContactForm";

const HeroSection = () => {
  return (
    <section className="relative w-full min-h-[600px] flex items-center overflow-hidden px-5 py-16 lg:py-24 bg-[#1A2332] md:bg-[linear-gradient(102.2deg,#1A2332_0%,#243044_100%)]">
      
      {/* Decorative Background Elements */}
      <div className="hidden lg:block absolute inset-0 z-0 pointer-events-none">
        <div className="absolute right-[-5vw] top-1/2 -translate-y-1/2 w-[45vw] h-[45vw] rounded-full bg-[#FF6B350D]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* LEFT COLUMN: Hero Content */}
          <div className="max-w-2xl">
            <nav className="flex items-center space-x-2 mb-6 text-[13px] md:text-[14px] font-sans">
              <Link href="/" className="text-[#FFFFFFA6] hover:text-[#FF6B35] transition-colors">
                Home
              </Link>
              <span className="text-[#FFFFFFA6]">/</span>
              <span className="text-white font-medium">Rental Rooms in Plumstead</span>
            </nav>
            

            <h1 className="text-white mb-6 font-playfair text-[36px] leading-[1.1] md:text-[60px] font-bold">
              Rooms to Rent in Plumstead SE18 — Elizabeth Line Access, {" "}
              <span className="text-[#FF6B35] italic font-playfair">
                All Bills Included
              </span>{" "}
            </h1>

            <p className="text-[#FFFFFFA6] font-sans font-light text-[16px] leading-7 md:text-[18px] mb-8">
              Whether you're a student chasing Canary Wharf in under 15 minutes, a professional relocating to South East London, or a tenant who simply wants a reliable, no-surprises tenancy — our rooms in Plumstead SE18 give you one of London's most underrated postcodes at a price that makes sense. Transparent pricing, bills included, and a smooth process from first enquiry to 
              <span className="text-white font-medium"> moving day.</span>
            </p>

            
          </div>

          {/* RIGHT COLUMN: Contact Form */}
          <div className="relative">
            <ContactForm
              title="Get in Touch"
              subtitle="Inquiry about rooms in Plumstead."
              redirectUrl="/thank-you-rental-room-london"
            />
          </div>

        </div>
      </div>

      {/* Decorative Mobile Circle */}
      <div className="md:hidden absolute -right-20 -bottom-20 w-80 h-80 bg-[#FF6B350D] rounded-full pointer-events-none" />

    </section>
  );
};

export default HeroSection;