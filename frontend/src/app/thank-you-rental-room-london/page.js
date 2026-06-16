import React from "react";
import { CheckCircle2 } from "lucide-react";

// SEO Mapping Reference:
// URL: thank-you-rental-room-london
// Title: Thank You for Your Rental Room Inquiry

const ThankYouRentalRoom = () => {
  return (
    <section className="min-h-screen py-20 px-5 md:px-12 bg-[#1A2332] text-white flex items-center justify-center overflow-hidden">
      <div className="max-w-2xl w-full mx-auto text-center">
        
        {/* Core Design Container */}
        <div className="bg-[#243044] rounded-[32px] p-8 md:p-12 border border-[#FF6B3533] shadow-2xl shadow-black/20 space-y-6">
          
          {/* Main Visual Success Badge */}
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#FF6B35] text-white rounded-2xl shadow-lg shadow-[#FF6B354D]">
            <CheckCircle2 size={32} />
          </div>

          {/* H1 Header */}
          <h1 className="text-3xl md:text-4xl font-playfair font-bold text-white tracking-tight">
            Thank You for Contacting Us
          </h1>

          {/* Description Block */}
          <p className="text-sm md:text-base text-gray-300 max-w-lg mx-auto leading-relaxed">
            We have received your rental accommodation request. Our team will contact you shortly with available room options that match your location, budget, and preferences.
          </p>

        </div>
        
      </div>
    </section>
  );
};

export default ThankYouRentalRoom;