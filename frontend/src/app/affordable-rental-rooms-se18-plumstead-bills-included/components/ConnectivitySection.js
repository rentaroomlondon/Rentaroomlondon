import React from "react";
import { GraduationCap, Train, MapPin, Clock } from "lucide-react";

const ConnectivitySection = () => {
  const universities = [
    { 
      name: "University of Greenwich", 
      loc: "Old Royal Naval College, SE10", 
      dist: "3.2 mi", 
      time: "~18 min via bus & train" 
    },
    { 
      name: "Ravensbourne University London", 
      loc: "Peninsula Square, SE10", 
      dist: "3.5 mi", 
      time: "~20 min via Southeastern" 
    },
    { 
      name: "London South Bank University", 
      loc: "Borough Road, SE1", 
      dist: "6.5 mi", 
      time: "~32 min via Elizabeth line" 
    },
    { 
      name: "Goldsmiths, University of London", 
      loc: "New Cross, SE14", 
      dist: "5.8 mi", 
      time: "~30 min via train" 
    },
    { 
      name: "University of East London (Docklands)", 
      loc: "University Way, E16", 
      dist: "5.0 mi", 
      time: "~22 min via Elizabeth line" 
    },
  ];

  const transport = [
    { 
      title: "Woolwich Elizabeth line", 
      detail: "Canary Wharf (14 min), Bond Street (28 min), Paddington (35 min)", 
      foot: "12 min walk / 5 min bus", 
      highlight: true 
    },
    { 
      title: "Plumstead station (Southeastern)", 
      detail: "Cannon Street & Charing Cross", 
      foot: "3 min walk", 
      highlight: false 
    },
    { 
      title: "Abbey Wood station (Elizabeth line)", 
      detail: "Alternative Elizabeth line access", 
      foot: "10 min bus", 
      highlight: false 
    },
    { 
      title: "Bus routes 96 / 99 / 472 / 244", 
      detail: "To Woolwich, Thamesmead & Bexleyheath", 
      foot: "Every 8–12 min", 
      highlight: false 
    },
  ];

  const nearby = [
    { place: "Woolwich", post: "SE18", dist: "0.8 mi" },
    { place: "Plumstead Common", post: "SE18", dist: "0.5 mi" },
    { place: "Thamesmead", post: "SE28", dist: "1.2 mi" },
    { place: "Eltham", post: "SE9", dist: "2.0 mi" },
    { place: "Greenwich", post: "SE10", dist: "3.2 mi" },
    { place: "Abbey Wood", post: "SE2", dist: "1.5 mi" },
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
          <div className="bg-[#243044] rounded-[32px] p-8 border border-[#FF6B3533] relative">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-[#FF6B35] rounded-2xl shadow-lg shadow-[#FF6B354D]">
                <Train size={24} />
              </div>
              <h3 className="text-2xl font-playfair font-bold">Transport Links</h3>
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
                 *Distances measured from Plumstead station. Ideal for professionals and creatives commuting to Central and East London.
               </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ConnectivitySection;