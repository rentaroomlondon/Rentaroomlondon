import React from "react";
import { GraduationCap, User, Users, Home, Building, Package, Clock, Calendar, CheckCircle2 } from "lucide-react";

const RoomTypeSection = () => {
  const roomTypes = [
    { title: "Student Accommodation", desc: "Affordable rooms minutes from campuses and libraries.", icon: <GraduationCap size={20} /> },
    { title: "Single Room Occupancy", desc: "Perfect for students and young professionals near top universities.", icon: <User size={20} /> },
    { title: "Double Room Occupancy", desc: "Spacious rooms for couples or those wanting extra comfort.", icon: <Users size={20} /> },
    { title: "Studio Room", desc: "Self-contained units offering privacy and independence.", icon: <Home size={20} /> },
    { title: "Shared Flat Room", desc: "Co-living spaces for professionals and students across the UK.", icon: <Building size={20} /> },
    { title: "Unfurnished Rental", desc: "Flexible spaces to make your own for long-term stays.", icon: <Package size={20} /> },
    { title: "Short Term Room", desc: "Ideal temporary accommodation for visiting tenants.", icon: <Clock size={20} /> },
    { title: "Long Term Room", desc: "Stability and comfort for student tenants near universities.", icon: <Calendar size={20} /> },
  ];

  return (
    <section className="py-24 px-5 md:px-12 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Left Column: The "Why Us" Hub */}
          <div className="w-full lg:w-2/5 flex flex-col justify-center">
            <div className="sticky top-10 space-y-8">
              <div className="space-y-4">
                <h3 className="text-[#FF6B35] font-bold text-sm uppercase tracking-[4px]">Room Categories</h3>
                <h2 className="text-[36px] md:text-[48px] font-semibold text-[#1A2332] font-playfair leading-tight">
                  Find Every Type of Room for Rent in London at Low Cost
                </h2>
              </div>
              
              <p className="text-gray-500 text-lg leading-relaxed">
                Hundreds of rooms available from studio rooms to house shares. Student tenants and young professionals trust us for affordable, bills included rooms that feel like home.
              </p>

              <div className="pt-6 border-t border-gray-100 space-y-4">
                <div className="flex items-center gap-3 text-[#1A2332] font-semibold">
                  <CheckCircle2 className="text-[#FF6B35]" size={20} />
                  <span>Bills Included Guaranteed</span>
                </div>
                <div className="flex items-center gap-3 text-[#1A2332] font-semibold">
                  <CheckCircle2 className="text-[#FF6B35]" size={20} />
                  <span>Near Top Universities</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: The Interactive Grid */}
          <div className="w-full lg:w-3/5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {roomTypes.map((room, idx) => (
                <div 
                  key={idx} 
                  className="group relative p-6 bg-[#FAF9F6] rounded-2xl border border-transparent hover:border-[#FF6B3533] hover:bg-white hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 flex-shrink-0 bg-white rounded-xl shadow-sm flex items-center justify-center text-[#FF6B35] group-hover:bg-[#FF6B35] group-hover:text-white transition-all duration-300">
                      {room.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-[#1A2332] mb-2 group-hover:text-[#FF6B35] transition-colors">
                        {room.title}
                      </h4>
                      <p className="text-sm text-gray-500 leading-relaxed">
                        {room.desc}
                      </p>
                    </div>
                  </div>
                  
                  {/* Decorative corner element */}
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B35]" />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default RoomTypeSection;