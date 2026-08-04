'use client';

import React, { useState } from 'react';

export default function CricklewoodFAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "How far are these rental rooms from Middlesex University?",
      answer: "Cricklewood is approximately 1.5–1.8 miles from Middlesex University (The Burroughs campus, Hendon). You can take direct 245 or 266 bus routes from Cricklewood Broadway, which arrive right at campus in 20 to 25 minutes."
    },
    {
      question: "Do international students need a UK guarantor to rent a room?",
      answer: "If you are an international student without a UK-based guarantor, you can either pay rent upfront (typically 3 to 6 months) or use an approved UK guarantor service (such as Housing Hand or Guarantid)."
    },
    {
      question: "Are single and double rooms available for individual students?",
      answer: "Yes, we offer single occupancy double rooms, single rooms, studios, and flat shares depending on your budget and preference."
    },
    {
      question: "Can I book a room online before moving to London?",
      answer: "Yes. We offer virtual video walkthroughs and online booking so international and out-of-town students can secure a room before arriving in London."
    },
    {
      question: "Is Cricklewood a safe area for international and university students?",
      answer: "Yes, Cricklewood is a popular, family-friendly residential area. Our properties feature secure entry systems, keycard locks, and CCTV in communal spaces. Well-lit main streets like Cricklewood Broadway provide safe, frequent bus routes operating 24/7."
    },
    {
      question: "How far is Brent Cross Shopping Centre from Cricklewood?",
      answer: "Brent Cross, one of North London's premier shopping destinations, is only 1.5 miles away (about a 10-minute bus ride), featuring over 120 retail stores, department stores, and dining spots."
    },
    {
      question: "How quick is the train commute from Cricklewood Station to Central London universities?",
      answer: "Cricklewood Station operates on the Thameslink line (Zone 3), providing exceptionally fast, direct connection times:\n• King’s Cross St Pancras / UCL: ~14 minutes\n• Farringdon (City / Bayes): ~17 minutes\n• Blackfriars / LSE / KCL: ~20 minutes"
    },
    {
      question: "What major universities are closest to Cricklewood?",
      answer: "Cricklewood is strategically located for several major London institutions:\n• Middlesex University (Hendon): 1.5–1.8 miles (20 mins via direct 245/266 buses)\n• ESCP Business School (West Hampstead): 1.1 miles (~15 mins)\n• University College London (UCL): Direct 14-min train to St Pancras\n• University of Westminster (Harrow Campus): ~30 mins via bus/train"
    },
    {
      question: "Where do students go for gym and fitness near Cricklewood Lane?",
      answer: "Residents have access to David Lloyd Cricklewood directly on Cricklewood Lane, as well as multiple budget-friendly gyms nearby including The Gym Group (Kilburn) and PureGym (Hendon)."
    },
    {
      question: "Where is the best place to study outdoors or relax near Cricklewood?",
      answer: "Gladstone Park is a 35-hectare green space featuring rose gardens, outdoor sports facilities, and panoramic views of the London skyline. For a quiet, closer green space, Cricklewood Millennium Green offers a serene spot for reading or relaxation."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Heading Area */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-widest mb-4">
            <span>⚡</span> NW2 Living Guide
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            Frequently Asked <span className="text-orange-500">Questions</span>
          </h1>
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto">
            Everything you need to know about renting a room, transport links, local universities, and neighborhood facilities in Cricklewood.
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
                  
                  {/* Orange Interactive Toggle Button */}
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 ${
                    isOpen ? 'bg-orange-500 text-white rotate-45 shadow-md shadow-orange-500/20' : 'bg-slate-700/70 text-slate-300'
                  }`}>
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