import React from "react";
import { GraduationCap, Train, MapPin, Clock, ArrowRight } from "lucide-react";

const ConnectivitySection = () => {
  const universities = [
    { name: "University of Westminster", loc: "Harrow, HA1 3TP", dist: "2.8 mi", time: "~18–22 min Bakerloo" },
    { name: "Middlesex University", loc: "The Burroughs, NW4", dist: "3.5 mi", time: "~30 min bus/tube" },
    { name: "University of West London", loc: "St Mary's Road, W5", dist: "4.0 mi", time: "~35 min Overground" },
  ];

  const transport = [
    { title: "Harlesden Station", detail: "Bakerloo & Overground · Zone 3", foot: "3 min walk", highlight: true },
    { title: "Stonebridge Park", detail: "Bakerloo Line · Zone 3", foot: "0.6 mi away", highlight: false },
    { title: "Bus Routes 18 / 206 / 224", detail: "To Central London & Wembley", foot: "Every 8–12 min", highlight: false },
    { title: "Kensal Green", detail: "Bakerloo & Overground · Zone 2", foot: "0.9 mi away", highlight: false },
  ];

  const nearby = [
    { place: "Kensal Green", post: "NW10", dist: "0.9 mi" },
    { place: "Willesden", post: "NW10", dist: "0.8 mi" },
    { place: "Wembley", post: "HA0", dist: "2.0 mi" },
    { place: "Cricklewood", post: "NW2", dist: "2.3 mi" },
    { place: "Stonebridge", post: "NW10", dist: "0.7 mi" },
  ];

  return (
    <section className="py-20 px-5 md:px-12 bg-[#1A2332] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Column 1: Universities */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-[#FF6B35] rounded-2xl">
                < GraduationCap size={24} />
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
                 *Distances measured from Harlesden High Street. Perfect for professionals commuting to Central London.
               </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ConnectivitySection;