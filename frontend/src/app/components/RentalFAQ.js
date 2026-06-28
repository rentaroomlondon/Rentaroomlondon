"use client"
import React, { useState } from "react";
import { Plus, Minus, HelpCircle, MapPin, GraduationCap, Zap, Eye, Globe, Train, FileCheck } from "lucide-react";
import Link from "next/link";

const RentalFAQ = () => {
  const [activeTab, setActiveTab] = useState(0);

  const faqs = [
    {
      question: "How can I find shared rental rooms in London and the UK?",
      answer: "Browse our listings by location, postcode, or city. We have prime spots in Cricklewood, Hendon, Greenwich, Brixton, and Birmingham.",
      icon: <MapPin size={20} />,
    },
    {
      question: "Are rental rooms suitable for students and professionals?",
      answer: "Absolutely. Our rooms are strategically located near major universities for students and city centers for working professionals.",
      icon: <GraduationCap size={20} />,
    },
    {
      question: "What is included in the rent?",
      answer: "Most listings include electricity, water, and Wi-Fi. All bills are almost always covered in the rent itself—check specific listings for details.",
      icon: <Zap size={20} />,
    },
    {
      question: "How do I book a viewing?",
      answer: "Simply contact us through the property listing page. Our team will arrange a convenient time for you to inspect the room.",
      icon: <Eye size={20} />,
    },
    {
      question: "How close are the properties to universities?",
      answer: "Many listings are within walking distance or a short commute to major UK universities, designed specifically with students in mind.",
      icon: <Globe size={20} />,
    },
    {
      question: "Do you have properties outside London?",
      answer: "Yes! We list rooms in other major UK cities like Birmingham, ensuring access to local amenities and transport hubs.",
      icon: <MapPin size={20} />,
    },
    {
      question: "Is public transport easily accessible?",
      answer: "Yes. Most rooms are situated near bus stops, train stations, or underground lines for rapid access to the city.",
      icon: <Train size={20} />,
    },
    {
      question: "How do I apply for a room?",
      answer: "Choose your preferred property and submit an inquiry. Our team will then guide you through the documents and application steps.",
      icon: <FileCheck size={20} />,
    },
  ];
  
    // FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How can we rent a room safely?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Find out from your landlord whether you have to pay rent in advance and how much the deposit is. Request a receipt for any initial payments. Find out the requirements for receiving your deposit refunded. When you move in, take pictures of the room for possible damage so you won't be charged for it later.",
        },
      },
      {
        "@type": "Question",
        name: "What knowledge is required for renting properties?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Always seek clarification from the owner regarding all leasing terms and conditions, such as access to the kitchen and other spaces, whether or not you may have guests, and the amount of notice needed to quit.",
        },
      },
      {
        "@type": "Question",
        name: "Why can't my entire family be in the same room?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Landlords in the UK rent out individual rooms to single people or sometimes couples. A family sharing a room is not permitted by law or culture.",
        },
      },
      {
        "@type": "Question",
        name: "What bills can I expect to pay?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Council Tax, utility bills including water, electricity, gas, internet, TV licence, and sometimes additional charges such as parking permits or cleaners.",
        },
      },
    ],
  };

  return (
    <>
     <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(faqSchema),
      }}
    />
    <section className="w-full bg-[#1A2332] py-20 px-4 md:px-10 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">
        
        {/* Left Side: Header (Occupies 35% of space) */}
        <div className="lg:w-[35%]">
          <div className="sticky top-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#FF6B35] rounded-lg flex items-center justify-center text-white">
                <HelpCircle size={24} />
              </div>
              <span className="text-[#FF6B35] font-bold text-xs uppercase tracking-[4px]">Knowledge Base</span>
            </div>
            <h2 className="text-white text-4xl md:text-5xl font-playfair font-bold leading-tight mb-6">
              Frequently Asked <br />
              <span className="text-[#FF6B35] italic">Questions.</span>
            </h2>
            <p className="text-gray-400 mb-8 max-w-sm">
              Everything you need to know about finding and securing your perfect shared room in the UK.
            </p>
            <Link
              href="/contact-us"
              className="bg-white text-[#1A2332] px-8 py-4 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-[#FF6B35] hover:text-white transition-all inline-block"
            >
              Contact Support
            </Link>
          </div>
        </div>

        {/* Right Side: Dense Grid (Occupies 65% of space) */}
        <div className="lg:w-[65%] grid grid-cols-1 md:grid-cols-2 gap-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              onClick={() => setActiveTab(activeTab === index ? -1 : index)}
              className={`p-6 rounded-2xl border transition-all duration-500 cursor-pointer flex flex-col justify-between h-full ${
                activeTab === index 
                ? "bg-[#FF6B35] border-[#FF6B35] shadow-xl shadow-[#FF6B3520]" 
                : "bg-white/5 border-white/10 hover:bg-white/10"
              }`}
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                    activeTab === index ? "bg-[#1A2332] text-white" : "bg-white/10 text-[#FF6B35]"
                  }`}>
                    {faq.icon}
                  </div>
                  {activeTab === index ? <Minus size={18} className="text-white" /> : <Plus size={18} className="text-gray-500" />}
                </div>
                
                <h4 className={`text-lg font-bold mb-3 leading-tight transition-colors ${
                  activeTab === index ? "text-[#1A2332]" : "text-white"
                }`}>
                  {faq.question}
                </h4>
              </div>

              <div className={`overflow-hidden transition-all duration-500 ${
                activeTab === index ? "max-h-40 opacity-100 mt-2" : "max-h-0 opacity-0"
              }`}>
                <p className={`text-sm leading-relaxed ${
                  activeTab === index ? "text-[#1A2332]/80" : "text-gray-400"
                }`}>
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
    </>
  );
};

export default RentalFAQ;