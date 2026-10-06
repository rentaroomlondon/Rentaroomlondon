import React from "react";
import { Bus, Wallet, Map, TreePine } from "lucide-react";
const StudentAccommodation = () => {
  const stats = [
    { label: "Commute", value: "About 10 mins", desc: "Metropolitan line to Northwick Park", icon: <Bus size={20} /> },
    { label: "Affordability", value: "HA1 value", desc: "Outer-zone rents, bills included", icon: <Wallet size={20} /> },
    { label: "Connectivity", value: "Zone 5", desc: "Metropolitan line to Baker Street", icon: <Map size={20} /> },
    { label: "Parks", value: "Local green space", desc: "Harrow Recreation Ground nearby", icon: <TreePine size={20} /> },
  ];
  return <section className="py-20 px-5 md:px-12 bg-white overflow-hidden"><div className="max-w-7xl mx-auto"><div className="flex flex-col lg:flex-row gap-12 items-center">
    <div className="w-full lg:w-3/5 space-y-8"><div className="inline-block bg-[#F47C3C15] px-4 py-2 rounded-lg"><span className="text-[#FF6B35] font-bold text-xs uppercase tracking-widest">University Life</span></div><h2 className="text-[32px] md:text-[44px] font-semibold text-[#1A2332] font-playfair leading-tight">Student Accommodation in Harrow, HA1 <span className="text-[#FF6B35] italic">With Bills Included</span></h2><div className="space-y-6 text-[#6B7280] text-[17px] md:text-[18px] leading-relaxed"><p>For students at the University of Westminster’s Harrow campus, West Harrow offers a convenient base. The campus is at Northwick Park, a short Metropolitan line journey from West Harrow station.</p><p className="bg-[#FAF5F0] p-6 rounded-2xl border-l-4 border-[#FF6B35] italic text-[#1A2332] font-medium">“A short campus commute, a calmer neighbourhood and easy connections to Central London make West Harrow a practical place to live.”</p></div></div>
    <div className="w-full lg:w-2/5"><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">{stats.map((stat, idx) => <div key={idx} className="flex items-center gap-5 p-5 bg-white rounded-2xl shadow-lg border border-gray-100"><div className="p-3 bg-[#FF6B351A] rounded-xl text-[#FF6B35]">{stat.icon}</div><div><p className="text-xs text-gray-500 uppercase tracking-wider">{stat.label}</p><p className="font-bold text-[#1A2332]">{stat.value}</p><p className="text-sm text-gray-500">{stat.desc}</p></div></div>)}</div></div>
  </div></div></section>;
};
export default StudentAccommodation;
