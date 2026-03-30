import Link from 'next/link';
import React from 'react';

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: "Register with Us",
      description: "One of our Letting Consultants will match you with suitable rooms based on your budget, travel time and lifestyle.",
      borderColor: "border-[#14B8A6]",
      textColor: "text-[#14B8A6]",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200"
    },
    {
      id: 2,
      title: "Viewing",
      description: "View the rooms you're interested in before making a booking. A holding deposit secures your room after viewing.",
      borderColor: "border-[#E67E22]",
      textColor: "text-[#E67E22]",
      image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=200&h=200"
    },
    {
      id: 3,
      title: "Reference & Contract",
      description: "References within 3 days, tenancy agreement within 14 days. All compliance documents provided.",
      borderColor: "border-[#E91E8C]",
      textColor: "text-[#E91E8C]",
      image: "https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      id: 4,
      title: "Move In",
      description: "Our team prepares your room and carries out a thorough check-in inventory. Deposit protection info provided.",
      borderColor: "border-[#22C55E]",
      textColor: "text-[#22C55E]",
      image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=200&h=200"
    },
    {
      id: 5,
      title: "During Your Stay",
      description: "Pay rent easily, report repairs online, and enjoy your dedicated property manager throughout your tenancy.",
      borderColor: "border-[#9B59B6]",
      textColor: "text-[#9B59B6]",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200"
    },
    {
      id: 6,
      title: "Move Out",
      description: "We contact you 3 months before contract end. Deposit returned within 10 days of moving out.",
      borderColor: "border-[#F1C40F]",
      textColor: "text-[#F1C40F]",
      image: "https://images.pexels.com/photos/8293654/pexels-photo-8293654.jpeg?auto=compress&cs=tinysrgb&w=400"
    }
  ];

  return (
    <section className="py-20 px-4 bg-white font-sans text-[#1F2937]">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
          How It <span className="text-[#F97316]">Works</span>
        </h2>
        <p className="text-[#888888] text-base md:text-lg mb-16">
          Your step-by-step guide from searching to settling in
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-12">
          {steps.map(step => (
            <div key={step.id} className="flex flex-col items-center">
              <div className={`relative w-28 h-28 md:w-48 md:h-48 rounded-full border-4 ${step.borderColor} overflow-hidden transition-transform hover:scale-105 duration-300`}>
                <img 
                  src={step.image} 
                  alt={step.title}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div className={`mt-6 text-4xl font-black ${step.textColor}`}>
                {step.id}
              </div>
              <h3 className="mt-2 text-base font-bold text-[#2C3E50]">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#888888] px-4">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-20">
          <p className="text-gray-400 text-sm mb-8">
            Should you require any assistance please do not hesitate to contact us — 
            <a href="mailto:info@rentaroomlondon.co.uk" className="font-semibold text-gray-600 ml-1">info@rentaroomlondon.co.uk</a>
          </p>
          <Link
            href="/find-a-room"
            className="px-10 py-4 border-2 border-[#111827] text-[#111827] font-bold text-sm tracking-widest uppercase rounded hover:bg-[#111827] hover:text-white transition-colors duration-300 inline-block"
          >
            Search for your new room now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;