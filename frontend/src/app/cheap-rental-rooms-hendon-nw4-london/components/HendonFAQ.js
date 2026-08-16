'use client';

import React, { useState } from 'react';

export default function HendonFAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "What is a credit check?",
      answer:
        "As part of our standard referencing process, you will be referred to an external agency to verify your identity, confirm your legal Right to Rent in the UK, and assess your financial ability to meet monthly rental payments under the agreement."
    },
    {
      question: "What happens if I fail the credit check?",
      answer:
        "If you do not pass the credit check, you can provide a UK-based guarantor who agrees to cover rent if necessary. If a personal guarantor is not available, you may use an approved UK Rent Guarantor Scheme."
    },
    {
      question: "What documents do I need to rent a room in Hendon?",
      answer:
        "You will typically need:\n\n• Proof of ID (Valid Passport or Driving Licence)\n• Proof of Right to Rent in the UK (Visa, Share Code, or Passport)\n• Proof of Income or Student Status (recent payslips, employment contract, or university admission letter)\n• Bank statements from the last 3 months"
    },
    {
      question: "Are the rooms fully furnished?",
      answer:
        "Yes. All of our Hendon rooms are fully furnished and equipped with high-standard interior finishes. Amenities include modern shared or en-suite kitchens, brand-name appliances, double-glazed windows, gas central heating, energy-efficient LED lighting, bespoke wardrobes, and fully tiled bathrooms."
    },
    {
      question: "Are utility bills included in the rent?",
      answer:
        "Most of our rental rooms in Hendon NW4 include key bills such as High-Speed Wi-Fi, Water, Gas, Electricity, and Council Tax in the monthly price. Check the individual room listing for specific inclusions."
    },
    {
      question: "What is the deposit amount and how is it protected?",
      answer:
        "Deposits typically range from 2 to 5 weeks' rent depending on the room type. Your deposit is safely held in a government-approved Tenancy Deposit Scheme (TDS) for the duration of your tenancy."
    },
    {
      question: "Is Hendon (NW4) a good neighbourhood to live in London?",
      answer:
        "Yes. Hendon in North-West London (NW4) is popular among students, young professionals, and families. Residents value Hendon for its safety, tree-lined green spaces, convenient local shopping, peaceful residential feel, and fast public transport links into Central London."
    },
    {
      question: "Where is Hendon located?",
      answer:
        "Hendon is a North-West London neighbourhood in the London Borough of Barnet. It sits south-east of Colindale (NW9), north-east of Dollis Hill (NW2), and north of Golders Green (NW11)."
    },
    {
      question: "What transport links serve Hendon NW4?",
      answer:
        "• Northern Line (Tube): Hendon Central Station (Zone 3) connects directly to Kings Cross St. Pancras, Euston, and London Bridge.\n• Thameslink (National Rail): Hendon Railway Station offers fast connections to St Pancras International, Blackfriars, and Luton Airport.\n• Buses & Road: Excellent bus routes (including 24-hour routes to Central London) and direct access to the A41, A406 (North Circular), and M1 motorway."
    },
    {
      question: "What local amenities and attractions are close to Hendon?",
      answer:
        "Hendon offers access to:\n\n• Middlesex University: Hendon Campus is located right in NW4, making the area ideal for students.\n• Brent Cross Shopping Centre: London’s famous indoor shopping destination.\n• Parks & Nature: Sunny Hill Park, Hendon Park, and the Brent Reservoir (Welsh Harp).\n• Dining & Groceries: Brent Street and West Hendon Broadway feature international supermarkets, local cafés, and restaurants."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-widest mb-4">
            <span>⚡</span> NW4 Living Guide
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            Frequently Asked <span className="text-orange-500">Questions</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto">
            Everything you need to know about renting a room in Hendon NW4 — credit checks, deposits, bills, transport, and local amenities.
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`transition-all duration-300 rounded-2xl border ${
                  isOpen
                    ? 'bg-slate-800/90 border-orange-500/50 shadow-lg shadow-orange-500/5'
                    : 'bg-slate-800/40 border-slate-700/60 hover:border-slate-600'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left p-6 sm:p-7 flex justify-between items-center gap-4 focus:outline-none"
                >
                  <span className="font-semibold text-base sm:text-lg text-white tracking-wide">
                    {faq.question}
                  </span>

                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen
                        ? 'bg-orange-500 text-white rotate-45 shadow-md shadow-orange-500/20'
                        : 'bg-slate-700/70 text-slate-300'
                    }`}
                  >
                    <span className="text-xl font-bold leading-none">+</span>
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 sm:px-7 pb-7 pt-0 text-slate-300 text-sm sm:text-base leading-relaxed whitespace-pre-line border-t border-slate-700/50 mt-1 pt-5">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}