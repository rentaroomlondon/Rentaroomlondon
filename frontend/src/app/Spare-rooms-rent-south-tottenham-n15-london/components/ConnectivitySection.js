import React from "react";
import { GraduationCap, Train, MapPin, Clock } from "lucide-react";

const ConnectivitySection = () => {
  const universities = [
    { 
      name: "Middlesex University", 
      loc: "The Burroughs, NW4 4BT", 
      dist: "Overground link", 
      time: "~25 min via Overground" 
    },
    { 
      name: "UCL (Bloomsbury)", 
      loc: "Gower Street, WC1E 6BT", 
      dist: "Victoria Line", 
      time: "~22 min via Victoria line" 
    },
    { 
      name: "London Metropolitan University", 
      loc: "Holloway Road, N7 8DB", 
      dist: "Bus 253", 
      time: "~18 min via bus 253" 
    },
    { 
      name: "City, University of London", 
      loc: "Northampton Square, EC1V 0HB", 
      dist: "Victoria Line", 
      time: "~28 min via Victoria line" 
    },
    { 
      name: "University of the Arts London", 
      loc: "272 High Holborn, WC1V 7EY", 
      dist: "Victoria Line", 
      time: "~30 min via Victoria line" 
    },
    { 
      name: "King's College London", 
      loc: "Strand, WC2R 2LS", 
      dist: "Victoria + Walk", 
      time: "~35 min via Victoria + walk" 
    }
  ];

  const transport = [
    { 
      title: "Seven Sisters Underground & Overground", 
      detail: "Victoria line & Gospel Oak–Barking Overground · Zone 3", 
      foot: "2-min walk", 
      highlight: true 
    },
    { 
      title: "Tottenham Hale", 
      detail: "Victoria line · National Rail to Stansted · Zone 3", 
      foot: "0.7 mi away", 
      highlight: false 
    },
    { 
      title: "South Tottenham (Overground)", 
      detail: "Gospel Oak–Barking line · connections east and west", 
      foot: "0.3 mi away", 
      highlight: false 
    },
    { 
      title: "Bus Routes W4 / 76 / 243 / 253", 
      detail: "To Central London, Hackney & Walthamstow", 
      foot: "Every 8–12 min", 
      highlight: false 
    },
    { 
      title: "Stamford Hill (Bus interchange)", 
      detail: "Routes south to City & north to Enfield", 
      foot: "0.5 mi away", 
      highlight: false 
    }
  ];

  const nearby = [
    { place: "Seven Sisters", post: "N15", dist: "0.3 mi" },
    { place: "Tottenham", post: "N17", dist: "0.8 mi" },
    { place: "Stamford Hill", post: "N16", dist: "1.1 mi" },
    { place: "Wood Green", post: "N22", dist: "1.6 mi" },
    { place: "Haringey", post: "N8", dist: "1.8 mi" }
  ];

  return (
    <section className="py-20 px-5 md:px-12 bg-[#1A2332] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Column 1: Universities */}
          <div className="space-y-6 max-h-[750px] overflow-y-auto pr-2 custom-scrollbar">
            <div className="flex items-center gap-3 mb-8 sticky top-0 bg-[#1A2332] py-2 z-10">
              <div className="p-3 bg-[#FF6B35] rounded-2xl">
                <GraduationCap size={24} />
              </div>
              <h3 className="text-2xl font-playfair font-bold">Academic Hub</h3>
            </div>
            
            {universities.map((uni, idx) => (
              <div key={idx} className="group p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                <h4 className="font-bold text-[#FF6B35] mb-1">{uni.name}</h4>
                <p className="text-xs text-gray-400 mb-3">{uni.loc}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-1 text-gray-300"><MapPin size={14}/> {uni.dist}</span>
                  <span className="flex items-center gap-1 text-white font-medium"><Clock size={14}/> {uni.time}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Column 2: Transport Links */}
          <div className="bg-[#243044] rounded-[32px] p-8 border border-[#FF6B3533] relative h-fit">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-[#FF6B35] rounded-2xl shadow-lg shadow-[#FF6B354D]">
                <Train size={24} />
              </div>
              <h3 className="text-2xl font-playfair font-bold">Transport Links</h3>
            </div>

            <div className="space-y-6">
              {transport.map((item, idx) => (
                <div key={idx} className="flex justify-between items-start border-b border-white/5 pb-4 last:border-0">
                  <div>
                    <h4 className={`font-bold ${item.highlight ? 'text-[#FF6B35]' : 'text-white'}`}>{item.title}</h4>
                    <p className="text-xs text-gray-400 mt-1">{item.detail}</p>
                  </div>
                  <span className="text-[11px] bg-white/10 px-2 py-1 rounded text-gray-300 whitespace-nowrap ml-2">
                    {item.foot}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: Nearby Locations */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-[#FF6B35] rounded-2xl">
                <MapPin size={24} />
              </div>
              <h3 className="text-2xl font-playfair font-bold">Nearby Areas</h3>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {nearby.map((area, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:translate-x-2 transition-transform cursor-default group">
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#FF6B35] group-hover:scale-150 transition-transform"></span>
                    <div>
                      <span className="font-bold block">{area.place}</span>
                      <span className="text-[10px] text-gray-500 uppercase tracking-widest">{area.post}</span>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-[#FF6B35]">{area.dist}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-6 bg-[#FF6B351A] border border-[#FF6B3533] rounded-2xl">
               <p className="text-xs leading-relaxed text-gray-300 italic">
                 *Distances measured from South Tottenham High Road. Ideal for professionals commuting to Central London, NHS staff at North Middlesex Hospital, and students at Middlesex University or UCL.
               </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ConnectivitySection;