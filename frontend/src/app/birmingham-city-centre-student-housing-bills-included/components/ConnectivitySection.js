import React from "react";
import { GraduationCap, Train, MapPin, Clock } from "lucide-react";

const ConnectivitySection = () => {
  const universities = [
    { 
      name: "Birmingham City University (City Centre Campus)", 
      loc: "Millennium Point, B4", 
      dist: "0.8 mi", 
      time: "~10 min walk or tram" 
    },
    { 
      name: "Aston University", 
      loc: "Aston Triangle, B4", 
      dist: "1.0 mi", 
      time: "~12 min walk" 
    },
    { 
      name: "University College Birmingham", 
      loc: "Summer Row, B3", 
      dist: "0.6 mi", 
      time: "~8 min walk" 
    },
    { 
      name: "University of Birmingham", 
      loc: "Edgbaston, B15", 
      dist: "3.2 mi", 
      time: "~18 min via train from New Street" 
    },
    { 
      name: "Newman University", 
      loc: "Genners Lane, B32", 
      dist: "5.5 mi", 
      time: "~28 min via bus" 
    },
  ];

  const transport = [
    { 
      title: "West Midlands Metro (tram)", 
      detail: "Birmingham New Street to Wolverhampton; stops throughout city centre", 
      foot: "2–8 min walk", 
      highlight: true 
    },
    { 
      title: "Birmingham New Street station", 
      detail: "National Rail to all UK cities; local services to University of Birmingham", 
      foot: "10 min walk", 
      highlight: false 
    },
    { 
      title: "Birmingham Moor Street station", 
      detail: "Chiltern Railways to London Marylebone; local services", 
      foot: "12 min walk", 
      highlight: false 
    },
    { 
      title: "Bus routes 1 / 45 / 50 / 61 / X8", 
      detail: "To Edgbaston, Selly Oak, Aston, Moseley", 
      foot: "Every 6–12 min", 
      highlight: false 
    },
  ];

  const nearby = [
    { place: "Jewellery Quarter", post: "B1", dist: "0.8 mi" },
    { place: "Digbeth", post: "B5", dist: "0.9 mi" },
    { place: "Edgbaston", post: "B15", dist: "2.5 mi" },
    { place: "Moseley", post: "B13", dist: "2.8 mi" },
    { place: "Selly Oak", post: "B29", dist: "3.5 mi" },
    { place: "Sutton Coldfield", post: "B73", dist: "7.0 mi" },
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
                <h4 className="font-bold text-[#FF6B35] mb-1 text-sm md:text-base leading-snug">{uni.name}</h4>
                <p className="text-xs text-gray-400 mb-3">{uni.loc}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-1 text-gray-300"><MapPin size={14}/> {uni.dist}</span>
                  <span className="flex items-center gap-1 text-white font-medium text-xs md:text-sm"><Clock size={14}/> {uni.time}</span>
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
                <div key={idx} className="flex justify-between items-start gap-4 border-b border-white/5 pb-4 last:border-0">
                  <div>
                    <h4 className={`font-bold leading-snug ${item.highlight ? 'text-[#FF6B35]' : 'text-white'}`}>{item.title}</h4>
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
                      <span className="font-bold block text-sm md:text-base">{area.place}</span>
                      <span className="text-[10px] text-gray-500 uppercase tracking-widest">{area.post}</span>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-[#FF6B35]">{area.dist}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-6 bg-[#FF6B351A] border border-[#FF6B3533] rounded-2xl">
               <p className="text-xs leading-relaxed text-gray-300 italic">
                 *Distances measured from city centre hub points. Ideal for students and professionals looking for city-wide connectivity and walking access to campuses.
               </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ConnectivitySection;