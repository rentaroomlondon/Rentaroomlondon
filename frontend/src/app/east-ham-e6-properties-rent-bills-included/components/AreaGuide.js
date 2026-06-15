import React from "react";
import { ShoppingBag, TreePine, Utensils, Moon, GraduationCap, MapPin, CheckCircle } from "lucide-react";

const AreaGuide = () => {
  const guideItems = [
    {
      id: "01",
      title: "Shopping",
      desc: "East Ham High Street is one of London's most concentrated retail strips — sari shops, Gujarati sweet houses, halal supermarkets, electronics stores, and mobile phone traders in one walkable stretch. Westfield Stratford City is under 20 minutes for major retail.",
      icon: <ShoppingBag size={24} />,
      color: "bg-blue-50 text-blue-600"
    },
    {
      id: "02",
      title: "Parks",
      desc: "Central Park E6 offers 37 acres including a boating lake, bowling green, and multi-sport pitches — one of East London's most underrated green spaces and a genuine asset for everyday tenant wellbeing.",
      icon: <TreePine size={24} />,
      color: "bg-green-50 text-green-600"
    },
    {
      id: "03",
      title: "Food & Eat Out",
      desc: "East Ham's High Street South is a nationally recognised South Asian food corridor — Gujarati thali, Kerala fish curry, Bangladeshi biryani, and Tamil street food sit side by side, all at prices that make most of London look expensive.",
      icon: <Utensils size={24} />,
      color: "bg-orange-50 text-[#FF6B35]"
    },
    {
      id: "04",
      title: "Nightlife",
      desc: "East Ham keeps a quieter local scene suited to working professionals and students with early starts. Stratford's bars and the Westfield circuit are under 20 minutes, and Hackney's venues are reachable via Overground for weekend plans.",
      icon: <Moon size={24} />,
      color: "bg-purple-50 text-purple-600"
    },
    {
      id: "05",
      title: "Student Life",
      desc: "A practical, community-oriented student base — popular with UEL and Newham College students who value walkable campus access and low daily costs. Newham's borough-wide investment in public libraries and sports infrastructure serves residents well.",
      icon: <GraduationCap size={24} />,
      color: "bg-indigo-50 text-indigo-600"
    },
    {
      id: "06",
      title: "Location",
      desc: "Zone 3–4 on the District line, with Forest Gate's Elizabeth line under a mile away. East Ham now sits within 16 minutes of Paddington and 35 minutes of Heathrow — a connectivity uplift that rents in E6 have not yet fully priced in.",
      icon: <MapPin size={24} />,
      color: "bg-red-50 text-red-600"
    }
  ];

  const amenities = [
    "High-speed Wi-Fi", "Fully Furnished Rooms", "Weekly Cleaning", 
    "All Bills Included", "Secure Entry", "Modern Kitchens"
  ];

  return (
    <section className="py-24 px-5 md:px-12 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-16">
          <h3 className="text-[#FF6B35] font-bold text-sm uppercase tracking-[4px] mb-4">The Neighborhood</h3>
          <h2 className="text-[36px] md:text-[50px] font-semibold text-[#1A2332] font-playfair leading-tight">
            Area Guide Near <span className="italic">East Ham E6, London</span>
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Left: Asymmetric Guide Cards */}
          <div className="w-full lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8">
            {guideItems.map((item) => (
              <div key={item.id} className="relative group p-8 rounded-[32px] border border-gray-100 hover:border-[#FF6B3533] hover:shadow-xl transition-all duration-500">
                <span className="absolute top-4 right-8 text-6xl font-bold text-gray-50 group-hover:text-[#FF6B350D] transition-colors">
                  {item.id}
                </span>
                <div className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center mb-6 relative z-10`}>
                  {item.icon}
                </div>
                <h4 className="text-xl font-bold text-[#1A2332] mb-3 relative z-10">{item.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed relative z-10">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Right: Sticky Amenities Sidebar */}
          <div className="w-full lg:w-1/3">
            <div className="sticky top-10 p-10 bg-[#1A2332] rounded-[40px] text-white">
              <h3 className="text-2xl font-playfair font-bold mb-4 italic text-[#FF6B35]">What's Included in Every Room</h3>
              <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-8">Included Amenities</p>
              
              <div className="space-y-5">
                {amenities.map((amenity, i) => (
                  <div key={i} className="flex items-center gap-4 group">
                    <div className="w-6 h-6 rounded-full border border-[#FF6B35] flex items-center justify-center group-hover:bg-[#FF6B35] transition-colors flex-shrink-0">
                      <CheckCircle size={14} className="text-[#FF6B35] group-hover:text-white" />
                    </div>
                    <span className="text-gray-300 font-medium group-hover:text-white transition-colors">
                      {amenity}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="mt-12 p-6 bg-white/5 rounded-2xl border border-white/10">
                <p className="text-xs text-gray-400 leading-relaxed uppercase tracking-widest font-bold mb-2">Pro Tip</p>
                <p className="text-sm text-gray-200">
                  East Ham High Street covers virtually every daily need within walking distance — from fresh groceries and international spices to banks, pharmacies, and mobile services — saving tenants significant time and money on everyday living costs.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AreaGuide;