import React from 'react';
import { ChevronRight, ShieldCheck } from 'lucide-react';

const EeatSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative flex flex-col md:flex-row items-center">
          
          {/* LEFT: IMAGE COLUMN (60% width) */}
          <div className="w-full md:w-[60%] z-0">
            <div className="relative group">
              <img
                src="https://images.unsplash.com/photo-1560185127-6ed189bf02f4?q=80&w=1200&auto=format&fit=crop" // Use your pool/exterior shot here
                alt="Premium Service Apartment Architecture"
                className="w-full h-[500px] object-cover rounded-sm shadow-xl transition-transform duration-700 group-hover:scale-105"
              />
              {/* Subtle overlay for image depth */}
              <div className="absolute inset-0 bg-black/5"></div>
            </div>
          </div>

          {/* RIGHT: CONTENT BOX (Overlapping) */}
          <div className="w-full md:w-[50%] md:-ml-24 z-10 mt-[-50px] md:mt-0">
            <div className="bg-[#1a365d] text-white p-8 md:p-12 shadow-2xl relative overflow-hidden">
              
              {/* Accent Line */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-orange-400">
                  Know About Our Accommodation
                </span>
                <div className="h-[1px] w-12 bg-orange-400"></div>
              </div>

              {/* Authority Heading */}
              <h2 className="text-3xl md:text-4xl font-serif italic mb-6 leading-tight">
                The Best Fully Furnished Service Apartments in <span className="text-orange-400">London</span>
              </h2>

              {/* Experience-Based Body Text */}
              <div className="space-y-4 text-gray-300 leading-relaxed text-sm md:text-base">
                <p>
                  With over <strong>15 years of operational excellence</strong>, we provide 
                  bespoke housing solutions for corporate travelers and relocating professionals. 
                  Our status as an accredited housing provider ensures every suite meets 
                  rigorous safety and luxury benchmarks.
                </p>
                <p>
                  From fully-fitted modern kitchens to 24/7 concierge support, we balance 
                  the comfort of a home with the reliability of a high-end hotel. 
                  Our apartments are strategically located in prime zones to minimize 
                  your commute and maximize your tranquility.
                </p>
              </div>

              {/* Internal Linking / CTA Grid */}
              <div className="mt-8 pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a href="/amenities" className="flex items-center gap-2 text-sm font-semibold hover:text-orange-400 transition-colors">
                  <ChevronRight size={16} className="text-orange-400" /> View All Amenities
                </a>
                <a href="/corporate-booking" className="flex items-center gap-2 text-sm font-semibold hover:text-orange-400 transition-colors">
                  <ChevronRight size={16} className="text-orange-400" /> Corporate Solutions
                </a>
              </div>

              {/* Trust Badges - Corner Accent */}
              <div className="absolute bottom-4 right-4 opacity-10">
                <ShieldCheck size={80} />
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default EeatSection;