import React from "react";
import { Search, Heart, Eye, FileText, CheckCircle, Key, Home, ArrowRight } from "lucide-react";
import Link from "next/link";

const RentalProcess = () => {

  const steps = [
    {
      id: 1,
      title: "Browse Available Properties",
      desc: "Explore listings by postcode or city like Cricklewood, Hendon, or Birmingham.",
      action: "Search by Postcode",
      icon: <Search size={18} />,
    },
    {
      id: 2,
      title: "Shortlist Your Rooms",
      desc: "Compare locations based on proximity to universities or easy access to city centers.",
      action: "Compare Budget",
      icon: <Heart size={18} />,
    },
    {
      id: 3,
      title: "Book a Viewing",
      desc: "Contact us directly via the listing page to schedule a convenient time to visit.",
      action: "Schedule Visit",
      icon: <Eye size={18} />,
    },
    {
      id: 4,
      title: "Confirm Rental Terms",
      desc: "Review rent inclusions like utilities, Wi-Fi, and check deposit requirements.",
      action: "Review Inclusions",
      icon: <FileText size={18} />,
    },
    {
      id: 5,
      title: "Submit Application",
      desc: "Provide basic documents (ID, proof of income) and fill out the agreement form.",
      action: "Online Form",
      icon: <CheckCircle size={18} />,
    },
    {
      id: 6,
      title: "Secure Your Room",
      desc: "Pay the deposit and first month’s rent to receive your move-in details.",
      action: "Payment",
      icon: <Key size={18} />,
    },
    {
      id: 7,
      title: "Move In & Enjoy",
      desc: "Collect your keys and settle into your new flat. Benefit from community living.",
      action: "Collect Keys",
      icon: <Home size={18} />,
    },
  ];
  
  return (
    <section className="py-8 px-5 md:px-12 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto"> {/* Slightly tighter max-width */}
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h3 className="text-[#FF6B35] font-bold text-[10px] uppercase tracking-[3px] mb-1">How it Works</h3>
          <h2 className="text-[28px] md:text-[36px] font-semibold text-[#1A2332] font-playfair leading-tight">
            Renting a Flat – <span className="italic">Step by Step</span>
          </h2>
        </div>

        {/* Journey Path */}
        <div className="relative">
          
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-gray-100 md:-translate-x-1/2 z-0" />

          <div className="space-y-2"> {/* Minimal space between step rows */}
            {steps.map((step, idx) => {
              const isEven = idx % 2 !== 0;
              return (
                <div key={step.id} className={`relative flex flex-col md:flex-row items-start md:items-center w-full ${isEven ? 'md:flex-row-reverse' : ''}`}>
                  
                  {/* Content Card */}
                  <div className="w-full md:w-[46%] pl-12 md:pl-0">
                    <div className={`p-5 rounded-[20px] border border-gray-50 bg-white hover:shadow-lg hover:border-[#FF6B3533] transition-all duration-500 group ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                      <div className={`inline-flex items-center gap-2 px-2 py-0.5 rounded-full bg-[#FAF5F0] text-[#FF6B35] text-[9px] font-bold uppercase tracking-wider mb-2`}>
                        <span className="w-1 h-1 rounded-full bg-[#FF6B35]" />
                        {step.action}
                      </div>
                      <h4 className="text-base font-bold text-[#1A2332] mb-1">{step.id}. {step.title}</h4>
                      <p className="text-gray-500 text-xs leading-snug">{step.desc}</p>
                    </div>
                  </div>

                  {/* Icon Node */}
                  <div className="absolute left-0 md:left-1/2 top-5 md:top-auto md:-translate-x-1/2 z-10">
                    <div className="w-8 h-8 md:w-11 md:h-11 rounded-full bg-[#1A2332] border-2 border-white shadow-md flex items-center justify-center text-white group-hover:bg-[#FF6B35] transition-colors duration-300">
                      {step.icon}
                    </div>
                  </div>

                  <div className="hidden md:block md:w-[46%]" />
                </div>
              );
            })}
          </div>

          {/* Final CTA Button */}
          <div className="mt-10 flex justify-center">
            <Link
              href="/find-a-room"
              className="group relative flex items-center gap-3 bg-[#FF6B35] text-white px-7 py-3.5 rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-[#1A2332] transition-all duration-500"
            >
              Start Your Search
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};

export default RentalProcess;