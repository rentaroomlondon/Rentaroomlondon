import React from "react";
import { GraduationCap, Train, MapPin, Clock } from "lucide-react";

const ConnectivitySection = () => {
  const universities = [
    { 
      name: "King's College London (Waterloo)", 
      loc: "Waterloo Campus, SE1", 
      dist: "2.2 mi", 
      time: "~12 min via Victoria line" 
    },
    { 
      name: "London South Bank University", 
      loc: "Borough Road, SE1", 
      dist: "2.0 mi", 
      time: "~14 min via bus & tube" 
    },
    { 
      name: "University of the Arts London (Camberwell)", 
      loc: "Peckham Road, SE5", 
      dist: "2.5 mi", 
      time: "~18 min via bus" 
    },
    { 
      name: "London School of Economics", 
      loc: "Houghton Street, WC2A", 
      dist: "3.5 mi", 
      time: "~20 min via Victoria line to Holborn" 
    },
    { 
      name: "University College London", 
      loc: "Gower Street, WC1E", 
      dist: "4.2 mi", 
      time: "~22 min via Victoria line" 
    },
  ];

  const transport = [
    { 
      title: "Stockwell station (Victoria & Northern lines)", 
      detail: "Oxford Circus (12 min), Victoria (8 min), London Bridge (18 min via Northern)", 
      foot: "3 min walk", 
      highlight: true 
    },
    { 
      title: "Brixton station (Victoria line)", 
      detail: "Additional southbound services & Overground connections", 
      foot: "10 min walk", 
      highlight: false 
    },
    { 
      title: "Vauxhall station (Victoria line + National Rail)", 
      detail: "Direct services to Waterloo & beyond", 
      foot: "15 min bus", 
      highlight: false 
    },
    { 
      title: "Bus routes 2 / 88 / 155 / 196 / P5", 
      detail: "To Brixton, Clapham, Westminster, Elephant & Castle", 
      foot: "Every 6–10 min", 
      highlight: false 
    },
  ];

  const nearby = [
    { place: "Brixton", post: "SW2", dist: "0.8 mi" },
    { place: "Clapham North", post: "SW4", dist: "0.9 mi" },
    { place: "Vauxhall", post: "SE11", dist: "1.1 mi" },
    { place: "Kennington", post: "SE11", dist: "1.2 mi" },
    { place: "Oval", post: "SE11", dist: "1.3 mi" },
    { place: "Elephant & Castle", post: "SE1", dist: "2.0 mi" },
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
                  *Distances measured from Stockwell station. Ideal for professionals and creatives commuting to Central and East London.
               </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ConnectivitySection;