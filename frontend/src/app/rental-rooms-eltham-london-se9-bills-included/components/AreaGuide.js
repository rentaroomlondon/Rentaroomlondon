import React from "react";
import { ShoppingBag, TreePine, Utensils, Moon, GraduationCap, MapPin, CheckCircle } from "lucide-react";

const AreaGuide = () => {
  const guideItems = [
    {
      id: "01",
      title: "Shopping",
      desc: "Eltham High Street features supermarkets, independent shops, and everyday essentials. Lewisham shopping centre is also easily accessible in 20 minutes.",
      icon: <ShoppingBag size={24} />,
      color: "bg-blue-50 text-blue-600"
    },
    {
      id: "02",
      title: "Parks",
      desc: "Oxleas Woods (ancient woodland with panoramic city views), Avery Hill Park with its Victorian greenhouses, and Eltham Palace formal gardens are all within walking distance.",
      icon: <TreePine size={24} />,
      color: "bg-green-50 text-green-600"
    },
    {
      id: "03",
      title: "Food & Eat Out",
      desc: "Well Hall Road offers a growing café and restaurant scene, complemented by a mix of local pubs, independent eateries, and takeaways throughout the SE9 area.",
      icon: <Utensils size={24} />,
      color: "bg-orange-50 text-[#FF6B35]"
    },
    {
      id: "04",
      title: "Nightlife",
      desc: "Enjoy a relaxed local pub culture across Eltham. Nearby Woolwich and Greenwich are easily reached for a wider range of live music venues and evening entertainment.",
      icon: <Moon size={24} />,
      color: "bg-purple-50 text-purple-600"
    },
    {
      id: "05",
      title: "Student Life",
      desc: "Highly popular with University of Greenwich and Ravensbourne students. It offers a calm, study-friendly environment with fast, direct rail access to campus.",
      icon: <GraduationCap size={24} />,
      color: "bg-indigo-50 text-indigo-600"
    },
    {
      id: "06",
      title: "Location",
      desc: "Zone 4 with direct Southeastern services. It ranks among the greenest and most spacious south-east London options for renters seeking great value and high quality.",
      icon: <MapPin size={24} />,
      color: "bg-red-50 text-red-600"
    }
  ];

  const amenities = [
    "High-speed Wi-Fi", "Fully furnished rooms", "Weekly cleaning", 
    "All bills included", "Secure entry", "Modern kitchen"
  ];

  return (
    <section className="py-24 px-5 md:px-12 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-16">
          <h3 className="text-[#FF6B35] font-bold text-sm uppercase tracking-[4px] mb-4">The Neighborhood</h3>
          <h2 className="text-[36px] md:text-[50px] font-semibold text-[#1A2332] font-playfair leading-tight">
            Area Guide Near <span className="italic">Eltham SE9 Zone- 4, London</span>
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
              <h3 className="text-2xl font-playfair font-bold mb-8 italic text-[#FF6B35]">Included Amenities</h3>
              <div className="space-y-5">
                {amenities.map((amenity, i) => (
                  <div key={i} className="flex items-center gap-4 group">
                    <div className="w-6 h-6 rounded-full border border-[#FF6B35] flex items-center justify-center group-hover:bg-[#FF6B35] transition-colors">
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
                  Eltham High Street and nearby shopping areas are ideal for daily essentials, helping students in SE9 save both time and travel expenses while enjoying convenient local access.
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