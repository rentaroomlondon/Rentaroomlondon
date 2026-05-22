import React from "react";
import { ShoppingBag, TreePine, Utensils, Moon, GraduationCap, MapPin, CheckCircle } from "lucide-react";

const AreaGuide = () => {
  const guideItems = [
    {
      id: "01",
      title: "Shopping",
      desc: "Kingsbury High Road has a full range of supermarkets, South Asian grocery stores, and independent retailers. Wembley and Brent Cross are a short drive or bus ride away.",
      icon: <ShoppingBag size={24} />,
      color: "bg-blue-50 text-blue-600"
    },
    {
      id: "02",
      title: "Parks",
      desc: "Fryent Country Park is just a 5-min walk — one of London's largest local nature reserves, perfect for walks, cycling, and unwinding.",
      icon: <TreePine size={24} />,
      color: "bg-green-50 text-green-600"
    },
    {
      id: "03",
      title: "Food & Eat Out",
      desc: "A rich culinary scene featuring Indian, Gujarati, East African, and Middle Eastern restaurants and takeaways lining the High Road.",
      icon: <Utensils size={24} />,
      color: "bg-orange-50 text-[#FF6B35]"
    },
    {
      id: "04",
      title: "Nightlife",
      desc: "A quieter residential atmosphere, with Wembley and Harrow nearby for larger entertainment, cinemas, and events.",
      icon: <Moon size={24} />,
      color: "bg-purple-50 text-purple-600"
    },
    {
      id: "05",
      title: "Student Life",
      desc: "Popular with Westminster and Middlesex students seeking spacious, affordable HMOs in a safe neighbourhood with good Jubilee line access.",
      icon: <GraduationCap size={24} />,
      color: "bg-indigo-50 text-indigo-600"
    },
    {
      id: "06",
      title: "Location",
      desc: "Zone 4 on the Jubilee line. Kingsbury station connects directly to London Bridge and Canary Wharf without changing trains.",
      icon: <MapPin size={24} />,
      color: "bg-red-50 text-red-600"
    }
  ];

  const amenities = [
    "High-speed Wi-Fi", "Fully Furnished Rooms", 
    "All Bills Included", "Secure Entry", "Modern Kitchens"
  ];

  return (
    <section className="py-24 px-5 md:px-12 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-16">
          <h3 className="text-[#FF6B35] font-bold text-sm uppercase tracking-[4px] mb-4">The Neighborhood</h3>
          <h2 className="text-[36px] md:text-[50px] font-semibold text-[#1A2332] font-playfair leading-tight">
            Area Guide Near <span className="italic">Kingsbury NW9</span>
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
                  Kingsbury High Road's supermarkets and Asian grocers offer some of the best-value fresh produce in North West London — a real bonus for budget-conscious students and professionals.
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