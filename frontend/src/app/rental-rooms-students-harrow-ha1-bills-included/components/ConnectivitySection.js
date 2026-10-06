import React from "react";
import { GraduationCap, Train, MapPin, Clock } from "lucide-react";
const ConnectivitySection = () => {
  const universities = [
    { name: "University of Westminster (Harrow Campus)", loc: "Watford Road, Northwick Park, HA1 3TP", dist: "Approx. 1.2 mi", time: "Short Metropolitan line ride" },
    { name: "Harrow College", loc: "Harrow-on-the-Hill, HA1", dist: "Approx. 0.5–1 mi", time: "Walk or short bus ride" },
    { name: "Brunel University London", loc: "Uxbridge, UB8", dist: "Further afield", time: "Metropolitan line towards Uxbridge" },
  ];
  const transport = [
    { title: "West Harrow Station", detail: "Metropolitan line · Zone 5", foot: "Approx. 5 min walk", highlight: true },
    { title: "Harrow-on-the-Hill", detail: "Metropolitan line · Chiltern Railways", foot: "Approx. 10 min walk", highlight: false },
    { title: "Northwick Park Station", detail: "Metropolitan line · Zone 4", foot: "Two stops", highlight: false },
    { title: "Harrow & Wealdstone", detail: "Bakerloo · Overground · National Rail", foot: "Nearby", highlight: false },
  ];
  const nearby = [
    { place: "Harrow-on-the-Hill", post: "HA1", dist: "0.5 mi" }, { place: "North Harrow", post: "HA2", dist: "1.1 mi" }, { place: "Kenton", post: "HA3", dist: "1.5 mi" }, { place: "South Harrow", post: "HA2", dist: "1.5 mi" }, { place: "Wealdstone", post: "HA3", dist: "1.7 mi" },
  ];
  return <section className="py-20 px-5 md:px-12 bg-[#1A2332] text-white overflow-hidden"><div className="max-w-7xl mx-auto"><div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
    <div className="space-y-6"><div className="flex items-center gap-3 mb-8"><div className="p-3 bg-[#FF6B35] rounded-2xl"><GraduationCap size={24} /></div><h3 className="text-2xl font-playfair font-bold">Academic Hub</h3></div>{universities.map((uni, idx) => <div key={idx} className="group p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"><h4 className="font-bold text-[#FF6B35] mb-1">{uni.name}</h4><p className="text-xs text-gray-400 mb-3">{uni.loc}</p><div className="flex flex-col gap-2 text-sm"><span className="flex items-center gap-1 text-gray-300"><MapPin size={14}/> {uni.dist}</span><span className="flex items-center gap-1 text-white font-medium"><Clock size={14}/> {uni.time}</span></div></div>)}</div>
    <div className="bg-[#243044] rounded-[32px] p-8 border border-[#FF6B3533] relative"><div className="flex items-center gap-3 mb-8"><div className="p-3 bg-[#FF6B35] rounded-2xl shadow-lg shadow-[#FF6B354D]"><Train size={24} /></div><h3 className="text-2xl font-playfair font-bold">Transport Links</h3></div><div className="space-y-6">{transport.map((item, idx) => <div key={idx} className="flex justify-between items-start border-b border-white/5 pb-4 last:border-0"><div><h4 className={`font-bold ${item.highlight ? 'text-[#FF6B35]' : 'text-white'}`}>{item.title}</h4><p className="text-xs text-gray-400 mt-1">{item.detail}</p></div><span className="text-[11px] bg-white/10 px-2 py-1 rounded text-gray-300 whitespace-nowrap">{item.foot}</span></div>)}</div><p className="mt-6 text-xs leading-relaxed text-gray-300 italic">Metropolitan line services run from West Harrow towards Baker Street and Central London.</p></div>
    <div className="space-y-6"><div className="flex items-center gap-3 mb-8"><div className="p-3 bg-[#FF6B35] rounded-2xl"><MapPin size={24} /></div><h3 className="text-2xl font-playfair font-bold">Nearby Areas</h3></div><div className="grid grid-cols-1 gap-3">{nearby.map((area, idx) => <div key={idx} className="flex items-center justify-between p-4 bg-white/5 rounded-xl"><div><span className="font-bold block">{area.place}</span><span className="text-[10px] text-gray-500 uppercase tracking-widest">{area.post}</span></div><span className="text-sm font-medium text-[#FF6B35]">{area.dist}</span></div>)}</div><div className="mt-6 p-6 bg-[#FF6B351A] border border-[#FF6B3533] rounded-2xl"><p className="text-xs leading-relaxed text-gray-300 italic">Approximate distances measured from West Harrow (HA1 4ED).</p></div></div>
  </div></div></section>;
};
export default ConnectivitySection;
