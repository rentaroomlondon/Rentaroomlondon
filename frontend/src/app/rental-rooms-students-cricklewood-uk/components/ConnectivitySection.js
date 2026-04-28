import React from "react";
import { GraduationCap, Train, MapPin, Clock, ArrowRight } from "lucide-react";

const ConnectivitySection = () => {
  const universities = [
    { name: "Middlesex University", loc: "The Burroughs, NW4", dist: "1.5–1.8 mi", time: "~20–25 min bus" },
    { name: "University of Westminster", loc: "Harrow, HA1 3TP", dist: "4.2 mi", time: "~30 min bus" },
    { name: "Royal School of Speech & Drama", loc: "Embassy Theatre, NW3", dist: "2.1 mi", time: "~18 min bus" },
  ];

  const transport = [
    { title: "Cricklewood Railway", detail: "Thameslink · Zone 3", foot: "8 min walk", highlight: true },
    { title: "Bus 245 / 266", detail: "To Middlesex Uni", foot: "Every 10 min", highlight: false },
    { title: "Brent Cross Underground", detail: "Northern line · Zone 3", foot: "1.2 mi away", highlight: false },
    { title: "Kilburn High Road", detail: "Overground · Zone 2", foot: "1.0 mi away", highlight: false },
  ];

  const nearby = [
    { place: "Kilburn", post: "NW6", dist: "1.0 mi" },
    { place: "Hendon", post: "NW4", dist: "1.1 mi" },
    { place: "West Hampstead", post: "NW6", dist: "1.4 mi" },
    { place: "Willesden", post: "NW10", dist: "1.6 mi" },
    { place: "Colindale", post: "NW9", dist: "2.0 mi" },
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
                 *Distances measured from Cricklewood Broadway. Perfect for professionals commuting to Central London.
               </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ConnectivitySection;