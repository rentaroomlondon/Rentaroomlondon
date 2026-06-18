import React from "react";
import { GraduationCap, Train, MapPin, Clock } from "lucide-react";

const ConnectivitySection = () => {
  const universities = [
    { 
      name: "University of East London", 
      loc: "Water Lane, E15 4LZ", 
      dist: "~12 min", 
      time: "via Central line" 
    },
    { 
      name: "Queen Mary University of London", 
      loc: "Mile End Road, E1 4NS", 
      dist: "~18 min", 
      time: "via Central line" 
    },
    { 
      name: "London Metropolitan University", 
      loc: "Aldgate, E1 7NT", 
      dist: "~28 min", 
      time: "via Central line" 
    },
    { 
      name: "City, University of London", 
      loc: "Northampton Square, EC1V 0HB", 
      dist: "~30 min", 
      time: "via Central line" 
    },
    { 
      name: "Birkbeck, University of London", 
      loc: "Malet Street, WC1E 7HX", 
      dist: "~35 min", 
      time: "via Central line" 
    },
    { 
      name: "UCL (Bloomsbury)", 
      loc: "Gower Street, WC1E 6BT", 
      dist: "~38 min", 
      time: "via Central line" 
    },
  ];

  const transport = [
    { 
      title: "Leyton Underground", 
      detail: "Central line · Zone 3 — direct to Bank, St Paul's, Oxford Circus", 
      foot: "3-min walk", 
      highlight: true 
    },
    { 
      title: "Leyton Midland Road (Overground)", 
      detail: "Gospel Oak–Barking line · connections to Hackney & Barking", 
      foot: "0.4 mi away", 
      highlight: false 
    },
    { 
      title: "Stratford", 
      detail: "Elizabeth line · DLR · national rail · Eurostar · 1 stop on Central line", 
      foot: "1.0 mi away", 
      highlight: false 
    },
    { 
      title: "Leytonstone", 
      detail: "Central line · Zone 3 — connections to Hainault and Epping", 
      foot: "0.9 mi away", 
      highlight: false 
    },
    { 
      title: "Bus Routes 58 / 69 / 97 / W19", 
      detail: "To Walthamstow, Hackney, Stratford & Ilford", 
      foot: "Every 8–12 min", 
      highlight: false 
    },
  ];

  const nearby = [
    { place: "Leytonstone", post: "E11", dist: "0.9 mi" },
    { place: "Stratford", post: "E15", dist: "1.0 mi" },
    { place: "Walthamstow", post: "E17", dist: "1.3 mi" },
    { place: "Forest Gate", post: "E7", dist: "1.5 mi" },
    { place: "Hackney Wick", post: "E9", dist: "1.9 mi" },
  ];

  return (
    <section className="py-20 px-5 md:px-12 bg-[#1A2332] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Column 1: Universities */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-[#FF6B35] rounded-2xl">
                <GraduationCap size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-playfair font-bold">Academic Hub</h3>
                <p className="text-xs text-gray-400">Universities Near Leyton E10</p>
              </div>
            </div>
            
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
              {universities.map((uni, idx) => (
                <div key={idx} className="group p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                  <h4 className="font-bold text-[#FF6B35] mb-1">{uni.name}</h4>
                  <p className="text-xs text-gray-400 mb-3">{uni.loc}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1 text-gray-300"><Clock size={14}/> {uni.dist}</span>
                    <span className="flex items-center gap-1 text-white font-medium">{uni.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Transport Links */}
          <div className="bg-[#243044] rounded-[32px] p-8 border border-[#FF6B3533] relative flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-[#FF6B35] rounded-2xl shadow-lg shadow-[#FF6B354D]">
                  <Train size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-playfair font-bold">Transport Links</h3>
                  <p className="text-xs text-gray-400">Getting Around from Leyton E10</p>
                </div>
              </div>

              <div className="space-y-6">
                {transport.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-start border-b border-white/5 pb-4 last:border-0">
                    <div className="pr-4">
                      <h4 className={`font-bold ${item.highlight ? 'text-[#FF6B35]' : 'text-white'}`}>{item.title}</h4>
                      <p className="text-xs text-gray-400 mt-1">{item.detail}</p>
                    </div>
                    <span className="text-[11px] bg-white/10 px-2 py-1 rounded text-gray-300 whitespace-nowrap">
                      {item.foot}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Column 3: Nearby Locations */}
          <div className="space-y-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-[#FF6B35] rounded-2xl">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-playfair font-bold">Nearby Areas</h3>
                  <p className="text-xs text-gray-400">Neighbourhoods Near Leyton E10</p>
                </div>
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
            </div>
            
            <div className="mt-6 p-6 bg-[#FF6B351A] border border-[#FF6B3533] rounded-2xl">
               <p className="text-xs leading-relaxed text-gray-300 italic">
                 *Distances measured from Leyton High Road. Ideal for professionals commuting to the City or Canary Wharf, students at UEL or Queen Mary, and NHS staff at Whipps Cross or Newham University Hospital.
               </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ConnectivitySection;