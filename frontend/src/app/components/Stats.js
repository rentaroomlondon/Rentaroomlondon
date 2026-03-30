import React from "react";

const stats = [
  { value: "4,150", label: "Happy Tenants", color: "text-white" },
  { value: "2,490", label: "Rooms Available", color: "text-[#E67E22]" },
  { value: "83", label: "Areas Covered", color: "text-white" },
  { value: "332", label: "Properties Managed", color: "text-[#F47C3C]" },
];

const Stats = () => {
  return (
    <section className="w-full bg-[#0F253B] flex justify-center py-10 px-4 sm:px-6 lg:px-[80px]">
      
      <div className="flex justify-between items-center w-full max-w-7xl">
        
        {stats.map((stat, index) => (
          <div
            key={index}
            className="flex flex-col items-center flex-1"
          >
            <h2
              className={`${stat.color} font-black text-[22px] sm:text-[36px] lg:text-[56px] leading-[1.1] text-center`}
            >
              {stat.value}
            </h2>

            <p className="text-white uppercase text-[6px] sm:text-[12px] md:text-[13px] tracking-[1px] text-center mt-1 sm:mt-3">
              {stat.label}
            </p>
          </div>
        ))}

      </div>
    </section>
  );
};

export default Stats;