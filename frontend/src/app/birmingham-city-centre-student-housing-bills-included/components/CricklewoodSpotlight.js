import React from "react";
import { MapPin, Train, GraduationCap, Building2 } from "lucide-react";

const BirminghamSpotlight = () => {
  const highlights = [
    { icon: <GraduationCap size={20} />, text: "Walking distance to Aston University, BCU and University College Birmingham" },
    { icon: <Train size={20} />, text: "University of Birmingham reachable in under 20 minutes via New Street" },
    { icon: <Train size={20} />, text: "West Midlands Metro tram — city-wide connectivity from the front door" },
    { icon: <MapPin size={20} />, text: "Birmingham New Street and Moor Street — national rail connections across the UK" },
    { icon: <Building2 size={20} />, text: "Bullring, Grand Central, Mailbox and Brindleyplace shopping and dining" },
    { icon: <Building2 size={20} />, text: "Digbeth creative quarter, Cannon Hill Park and extensive leisure nearby" },
    { icon: <MapPin size={20} />, text: "Among the UK's most competitive city-centre rents — well below London and Manchester" },
  ];

  return (
    <section className="py-16 md:py-24 px-5 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="bg-[#1A2332] rounded-[40px] overflow-hidden shadow-2xl flex flex-col lg:flex-row">
          
          {/* Left: Text Content */}
          <div className="w-full lg:w-3/5 p-8 md:p-16 space-y-8">
            <div className="space-y-4">
              <h2 className="text-[32px] md:text-[40px] font-semibold text-white font-playfair leading-tight">
                Rent a Room in <span className="text-[#FF6B35] italic">Birmingham City Centre</span>
                <span className="block mt-2">Walk to Campus, Walk to Work</span>
              </h2>
              <div className="h-1 w-20 bg-[#FF6B35] rounded-full"></div>
            </div>

            <div className="space-y-6 text-[#FFFFFFA6] text-[16px] md:text-[18px] leading-relaxed font-light">
              <p>
                Birmingham city centre is one of the UK's most liveable and affordable urban addresses for renters who refuse to compromise. With Aston University, Birmingham City University, and University College Birmingham all within walking distance — and the University of Birmingham reachable in under 20 minutes by train from New Street — city-centre tenants here enjoy a commute that most students and professionals in London or Manchester can only envy. Add the West Midlands Metro tram running through the heart of the city, three major rail stations, and a comprehensive bus network, and daily life in Birmingham's B1–B5 postcodes becomes genuinely frictionless.
              </p>
              <p>
                The city itself has undergone a remarkable transformation. The Bullring and Grand Central deliver world-class retail; the Mailbox and Brindleyplace offer premium dining, canal-side leisure, and independent culture; Digbeth's creative quarter — home to Custard Factory markets, independent clubs, and street food — is a 15-minute walk for evenings out. Cannon Hill Park, Birmingham's most beloved green space, is accessible by tram or bus for weekend downtime. For renters who want city-centre energy, strong employment prospects, and a cost of living that genuinely stretches a salary or student loan further — Birmingham city centre remains one of the UK's standout rental destinations.
              </p>
            </div>
          </div>

          {/* Right: Feature Highlights */}
          <div className="w-full lg:w-2/5 bg-[#243044] p-8 md:p-16 flex flex-col justify-center">
            <div className="space-y-6">
              <h4 className="text-white font-bold text-xl mb-4 border-b border-white/10 pb-4">
                Location Benefits
              </h4>
              <div className="grid grid-cols-1 gap-4">
                {highlights.map((item, index) => (
                  <div key={index} className="flex items-start gap-4 group">
                    <div className="p-3 bg-[#FF6B351A] rounded-xl text-[#FF6B35] group-hover:bg-[#FF6B35] group-hover:text-white transition-all duration-300 flex-shrink-0">
                      {item.icon}
                    </div>
                    <span className="text-white/80 font-medium text-sm md:text-base pt-1">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="text-[#FF6B35] font-bold text-sm italic">
                  City-centre location. University on your doorstep. Unbeatable UK value.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default BirminghamSpotlight;