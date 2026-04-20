import React from "react";
import { 
  Bed, Shield, Utensils, CheckCircle2 
} from "lucide-react";
import Link from 'next/link';

const Section6 = () => {
  const categories = [
    {
      title: "Bedroom Comforts",
      items: ["Double Bed", "Desk & Chair", "Double Wardrobe", "Chest of Drawers", "Large Mirror"],
      icon: <Bed className="text-[#FF6B35]" size={20} />
    },
    {
      title: "Home Facilities",
      items: ["Full Modern Kitchen", "Dishwasher", "Washing Machine", "Dryer", "Elevator Access"],
      icon: <Utensils className="text-[#FF6B35]" size={20} />
    },
    {
      title: "Safety & Tech",
      items: ["24/7 CCTV Security", "Secure Front Door", "Bedroom Door Lock", "Superfast Wi-Fi", "55\" Smart TV"],
      icon: <Shield className="text-[#FF6B35]" size={20} />
    }
  ];

  return (
    <section className="py-14 px-5 md:px-12 bg-[#1A2332]">
      <div className="max-w-7xl mx-auto">
        
        {/* Header - White text to contrast dark background */}
        <div className="mb-16 space-y-4">
          <h3 className="text-[#FF6B35] font-bold text-sm uppercase tracking-[3px]">
            Amenities and Features
          </h3>
          <h2 className="text-[32px] md:text-[42px] font-semibold text-white font-playfair leading-tight">
            What's Amenities Included in our <span className="italic">accommodation, UK</span>
          </h2>
          <p className="text-gray-400 max-w-2xl font-light">
            We provide everything you need for a comfortable stay in London. 
            From high-end security to weekly professional cleaning, your comfort is our priority.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {categories.map((cat, idx) => (
            <div 
              key={idx} 
              className="bg-[#243044] rounded-[32px] p-8 border border-white/5 hover:border-[#FF6B3533] transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-[#FF6B351A] p-3 rounded-2xl">
                  {cat.icon}
                </div>
                <h4 className="text-xl font-bold text-white font-sans">{cat.title}</h4>
              </div>

              <div className="flex flex-wrap gap-3">
                {cat.items.map((item, i) => (
                  <div 
                    key={i} 
                    className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full hover:bg-[#FF6B35] group transition-all duration-300"
                  >
                    <CheckCircle2 size={14} className="text-[#FF6B35] group-hover:text-white" />
                    <span className="text-gray-300 group-hover:text-white text-sm font-medium">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Feature Highlight Strip */}
        <div className="mt-12 p-8 bg-gradient-to-r from-[#FF6B35] to-[#F47C3C] rounded-[32px] flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-white">
            <h4 className="text-xl font-bold">Weekly Communal Clean Included</h4>
            <p className="opacity-90 font-light">We keep the shared spaces sparkling so you don't have to.</p>
          </div>
          <Link href="#" className="bg-white text-[#FF6B35] px-8 py-3 rounded-full font-bold text-sm uppercase tracking-wider hover:bg-[#1A2332] hover:text-white transition-all">
            View All Features
          </Link>
        </div>

      </div>
    </section>
  );
};

export default Section6;