import React from "react";

const Section3 = () => {
  const tenants = [
    {
      title: "Students & Interns",
      desc: "Studying or interning near campus? We offer academic-year and short-term stays tailored for you.",
    },
    {
      title: "Working Professionals",
      desc: "New job, new city? Get a comfortable, well-located room near your office without the hassle.",
    },
    {
      title: "Relocating Tenants",
      desc: "Arriving from another city or country? We'll have a room set up before you land.",
    },
    {
      title: "Corporate & Long-Stay",
      desc: "Project-based stays or extended rentals — we handle teams and individuals alike.",
    },
  ];

  return (
    <section className="py-16 md:py-24 px-5 md:px-12 bg-[#FAF5F0]">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-16 border-l-4 border-[#FF6B35] pl-6">
          <h2 className="text-[32px] md:text-[42px] font-semibold text-[#1A2332] font-playfair leading-tight mb-2">
            Book your Perfect Room For Rental, UK
          </h2>
          <h3 className="text-[#FF6B35] font-bold text-[14px] md:text-[16px] uppercase tracking-[3px]">
            Who all are our Tenant
          </h3>
        </div>

        {/* Clean List Layout (Different from Section 2 Grid) */}
        <div className="grid grid-cols-1 gap-4">
          {tenants.map((item, index) => (
            <div 
              key={index} 
              className="group bg-white p-8 rounded-2xl flex flex-col md:flex-row md:items-center justify-between border border-transparent hover:border-[#FF6B35] transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <div className="flex items-center gap-6 md:w-1/3">
                <span className="text-[40px] font-playfair font-bold text-[#FF6B351A] group-hover:text-[#FF6B3533] transition-colors">
                  0{index + 1}
                </span>
                <h4 className="text-[20px] md:text-[22px] font-bold text-[#1A2332] font-sans">
                  {item.title}
                </h4>
              </div>
              
              <div className="mt-4 md:mt-0 md:w-2/3 md:pl-8 md:border-l border-gray-100">
                <p className="text-[#6B7280] text-[16px] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default Section3;