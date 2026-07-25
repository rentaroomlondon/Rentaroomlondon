import { BedDouble, Headphones, Utensils, Wifi, Zap } from 'lucide-react';
import React from 'react';

const Banner = () => {
  return (
    <section className="w-full bg-[#FAF8F5] text-slate-900 font-sans py-12 sm:py-16 border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-10 space-y-2">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 text-xs font-bold px-3 py-1 rounded-full border border-orange-200 mb-2">
            <Zap className="w-3.5 h-3.5 text-orange-600" />
            <span>All Inclusive</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            What’s Included in Our Rental Rooms
          </h3>
          <p className="text-slate-500 text-sm sm:text-base max-w-xl mx-auto">
            Utility costs are 100% included in your single monthly rent payment.
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 sm:gap-5">
          {[
            { icon: Wifi, title: 'High-Speed Wi-Fi' },
            { icon: Zap, title: 'All Utilities Included' },
            { icon: Headphones, title: '24/7 Support' },
            { icon: Utensils, title: 'Equipped Kitchen' },
            { icon: BedDouble, title: 'Fully Furnished' },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="flex flex-col items-center text-center p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-orange-200 hover:shadow-md transition-all"
              >
                <div className="p-3 bg-orange-50 rounded-full mb-3 border border-orange-100">
                  <Icon className="w-6 h-6 text-orange-600" />
                </div>
                <span className="font-bold text-slate-800 text-sm">
                  {item.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Banner;