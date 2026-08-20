'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function SouthEastLondonFAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "Which areas do you cover here?",
      answer: "We currently list verified rooms in Plumstead, Eltham, Greenwich, and Stockwell."
    },
    {
      question: "Which area has the fastest commute into Central London?",
      answer: "Stockwell offers the fastest route, with direct Victoria and Northern line journeys of around 10–15 minutes into the West End."
    },
    {
      question: "Is Greenwich good for university students?",
      answer: "Yes — Greenwich is home to the University of Greenwich campus, with DLR and National Rail links into Central London and Canary Wharf."
    },
    {
      question: "Are Plumstead and Eltham cheaper than Greenwich or Stockwell?",
      answer: "Generally yes — Plumstead and Eltham tend to offer lower rents, reflecting their Zone 4 location and longer commute times compared to Greenwich and Stockwell."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#FAF9F6]">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Header Area */}
        <div className="text-center space-y-4">
          <div className="inline-block bg-[#F47C3C15] px-4 py-2 rounded-lg">
            <span className="text-[#FF6B35] font-bold text-xs uppercase tracking-widest">
              South East London Living Guide
            </span>
          </div>
          
          <h2 className="text-[32px] md:text-[44px] font-semibold text-[#1A2332] font-playfair leading-tight">
            FAQ’s on renting rooms near university for <span className="text-[#FF6B35] italic">student</span>
          </h2>
          
          <p className="text-[#6B7280] text-[17px] md:text-[18px] max-w-2xl mx-auto font-light">
            Everything you need to know about renting a room, transport links, and neighborhood highlights across our South East London locations.
          </p>
        </div>

        {/* FAQ Cards Container */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index}
                className={`transition-all duration-300 rounded-2xl border ${
                  isOpen 
                    ? 'bg-white border-[#FF6B35]/50 shadow-md' 
                    : 'bg-white/60 border-gray-200 hover:border-gray-300'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left p-6 sm:p-7 flex justify-between items-center gap-4 focus:outline-none"
                >
                  <span className="font-semibold text-base sm:text-lg text-[#1A2332] font-playfair tracking-wide">
                    {faq.question}
                  </span>
                  
                  {/* Orange Interactive Toggle Button */}
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 ${
                    isOpen ? 'bg-[#FF6B35] text-white rotate-45 shadow-sm' : 'bg-gray-100 text-[#1A2332]'
                  }`}>
                    <span className="text-xl font-bold leading-none">+</span>
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 sm:px-7 pb-7 pt-0 text-[#6B7280] text-sm sm:text-base leading-relaxed whitespace-pre-line border-t border-gray-100 mt-1 pt-5 font-light">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA Button Section */}
        <div className="pt-6 text-center">
          <Link
            href="/find-a-room?search=SE"
            className="inline-flex items-center gap-2 bg-[#FF6B35] text-white font-semibold px-8 py-4 rounded-2xl shadow-sm hover:bg-[#e05a2b] transition-all"
          >
            Browse All Rooms in This Area <ArrowRight size={18} />
          </Link>
        </div>

      </div>
    </section>
  );
}