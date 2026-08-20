'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function EastLondonFAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "Which East London areas do you have rooms in?",
      answer: "We currently list verified rooms in South Tottenham, Leyton, and East Ham, with bills-included options across all three."
    },
    {
      question: "Which East London area has the fastest commute into Central London?",
      answer: "South Tottenham typically offers the fastest route into Central London, with a direct Victoria line journey of around 18–20 minutes from Seven Sisters."
    },
    {
      question: "Is East London cheaper than Hackney or Islington?",
      answer: "Yes, South Tottenham, Leyton, and East Ham all sit outside Zone 2's higher price bracket, offering meaningfully lower rents than Hackney or Islington while retaining strong transport links."
    },
    {
      question: "Are bills included in East London room rentals?",
      answer: "Bills-included options are available across our East London listings — check individual room listings for confirmed details."
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
              East London Living Guide
            </span>
          </div>
          
          <h2 className="text-[32px] md:text-[44px] font-semibold text-[#1A2332] font-playfair leading-tight">
            Frequently Asked <span className="text-[#FF6B35] italic">Questions</span>
          </h2>
          
          <p className="text-[#6B7280] text-[17px] md:text-[18px] max-w-2xl mx-auto font-light">
            Everything you need to know about renting a room, transport links, and neighborhood highlights across our East London locations.
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
            href="/find-a-room?search=E"
            className="inline-flex items-center gap-2 bg-[#FF6B35] text-white font-semibold px-8 py-4 rounded-2xl shadow-sm hover:bg-[#e05a2b] transition-all"
          >
            Browse All East London Rooms <ArrowRight size={18} />
          </Link>
        </div>

      </div>
    </section>
  );
}