"use client";
import React, { useState } from 'react';

export const faqContent = {
  All: [
    { question: "How do I rent a room?", answer: "Browse our listings and click 'Book Now'." },
    { question: "When do I get my deposit back?", answer: "Usually within 10-14 days of move-out." },
    { question: "How do I rent a room?", answer: "Browse our listings and click 'Book Now'." },
    { question: "When do I get my deposit back?", answer: "Usually within 10-14 days of move-out." },
    { question: "How do I rent a room?", answer: "Browse our listings and click 'Book Now'." },
    { question: "When do I get my deposit back?", answer: "Usually within 10-14 days of move-out." },
    { question: "How do I rent a room?", answer: "Browse our listings and click 'Book Now'." },
    { question: "When do I get my deposit back?", answer: "Usually within 10-14 days of move-out." },
    { question: "How do I rent a room?", answer: "Browse our listings and click 'Book Now'." },
    { question: "When do I get my deposit back?", answer: "Usually within 10-14 days of move-out." }
  ],
  Booking: [
    { question: "Can I make a booking without viewing?", answer: "Yes, we provide high-quality virtual tours for all properties." },
    { question: "Are you going to conduct reference checks?", answer: "Yes, we require ID and proof of income for all bookings." },
    { question: "Can I make a booking without viewing?", answer: "Yes, we provide high-quality virtual tours for all properties." },
    { question: "Are you going to conduct reference checks?", answer: "Yes, we require ID and proof of income for all bookings." },
    { question: "Can I make a booking without viewing?", answer: "Yes, we provide high-quality virtual tours for all properties." },
    { question: "Are you going to conduct reference checks?", answer: "Yes, we require ID and proof of income for all bookings." },
    { question: "Can I make a booking without viewing?", answer: "Yes, we provide high-quality virtual tours for all properties." },
    { question: "Are you going to conduct reference checks?", answer: "Yes, we require ID and proof of income for all bookings." }
  ],
  "Moving In": [
    { question: "What time can I check in?", answer: "Check-in is typically available from 2:00 PM on your start date." },
    { question: "Do I need to bring my own bedding?", answer: "Most rooms come unfurnished with linens, but we offer bedding packs for purchase." },
    { question: "What time can I check in?", answer: "Check-in is typically available from 2:00 PM on your start date." },
    { question: "Do I need to bring my own bedding?", answer: "Most rooms come unfurnished with linens, but we offer bedding packs for purchase." },
    { question: "What time can I check in?", answer: "Check-in is typically available from 2:00 PM on your start date." },
    { question: "Do I need to bring my own bedding?", answer: "Most rooms come unfurnished with linens, but we offer bedding packs for purchase." },
    { question: "What time can I check in?", answer: "Check-in is typically available from 2:00 PM on your start date." },
    { question: "Do I need to bring my own bedding?", answer: "Most rooms come unfurnished with linens, but we offer bedding packs for purchase." }
  ],
  "During Stay": [
    { question: "How do I report a repair?", answer: "Log into the resident portal and submit a maintenance ticket." },
    { question: "Is there Wi-Fi?", answer: "Yes, high-speed Wi-Fi is included in your monthly rent." },
    { question: "How do I report a repair?", answer: "Log into the resident portal and submit a maintenance ticket." },
    { question: "Is there Wi-Fi?", answer: "Yes, high-speed Wi-Fi is included in your monthly rent." },
    { question: "How do I report a repair?", answer: "Log into the resident portal and submit a maintenance ticket." },
    { question: "Is there Wi-Fi?", answer: "Yes, high-speed Wi-Fi is included in your monthly rent." },
    { question: "How do I report a repair?", answer: "Log into the resident portal and submit a maintenance ticket." },
    { question: "Is there Wi-Fi?", answer: "Yes, high-speed Wi-Fi is included in your monthly rent." }
  ],
  "Moving Out": [
    { question: "When do I get my deposit back?", answer: "Deposits are returned after a room inspection, usually within 14 days." },
    { question: "When do I get my deposit back?", answer: "Deposits are returned after a room inspection, usually within 14 days." },
    { question: "When do I get my deposit back?", answer: "Deposits are returned after a room inspection, usually within 14 days." },
    { question: "When do I get my deposit back?", answer: "Deposits are returned after a room inspection, usually within 14 days." },
    { question: "When do I get my deposit back?", answer: "Deposits are returned after a room inspection, usually within 14 days." },
    { question: "When do I get my deposit back?", answer: "Deposits are returned after a room inspection, usually within 14 days." },
    { question: "When do I get my deposit back?", answer: "Deposits are returned after a room inspection, usually within 14 days." },
    { question: "When do I get my deposit back?", answer: "Deposits are returned after a room inspection, usually within 14 days." },
    { question: "When do I get my deposit back?", answer: "Deposits are returned after a room inspection, usually within 14 days." }
  ],
  Payments: [
    { question: "How can I pay my rent?", answer: "Payments can be made via credit card, bank transfer, or our mobile app." },
    { question: "Are there any costs other than rent?", answer: "Utilities are included, but late payment fees may apply." },
    { question: "How can I pay my rent?", answer: "Payments can be made via credit card, bank transfer, or our mobile app." },
    { question: "Are there any costs other than rent?", answer: "Utilities are included, but late payment fees may apply." },
    { question: "How can I pay my rent?", answer: "Payments can be made via credit card, bank transfer, or our mobile app." },
    { question: "Are there any costs other than rent?", answer: "Utilities are included, but late payment fees may apply." },
    { question: "How can I pay my rent?", answer: "Payments can be made via credit card, bank transfer, or our mobile app." },
    { question: "Are there any costs other than rent?", answer: "Utilities are included, but late payment fees may apply." }
  ]
};

const categories = ["All", "Booking", "Moving In", "During Stay", "Moving Out", "Payments"];

export default function DynamicFaq() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [openIndex, setOpenIndex] = useState(null);

  // Handle tab change & reset accordion
  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setOpenIndex(null);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 md:py-24 font-sans">
      {/* Category Navigation */}
      <div className="flex md:flex-wrap gap-3 mb-5 md:mb-10 overflow-x-auto no-scrollbar px-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className={`shrink-0 px-6 py-2 rounded-full border text-sm font-medium transition-all duration-200 ${
              activeCategory === cat
                ? "bg-[#FF6B35] border-[#FF6B35] text-white"
                : "bg-white border-[#E8E4DF] text-[#6B7280] hover:border-[#FF7A50] hover:text-[#FF7A50]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Accordion List */}
      <div className="space-y-1">
        {faqContent[activeCategory].map((item, index) => (
          <div key={`${activeCategory}-${index}`} className="border-b border-[#E8E4DF]">
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex justify-between items-center py-5 text-left group"
            >
              <span className={`text-[14px] md:text-[15px] transition-colors ${openIndex === index ? "text-black font-bold" : "text-[#1A2332] font-semibold"}`}>
                {item.question}
              </span>

              {/* Plus/Minus Icon */}
              <div className={`w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300 
                  ${openIndex === index ? 'bg-[#FFF8F3] text-[#6B7280] rotate-45' : 'bg-[#FFF8F3] text-[#6B7280]'}`}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M6 1V11M1 6H11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
            </button>

            <div 
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openIndex === index ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <p className="pb-5 text-gray-500 text-sm leading-relaxed">
                {item.answer}
              </p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}