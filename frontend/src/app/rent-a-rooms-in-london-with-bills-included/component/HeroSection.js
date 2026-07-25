'use client';

import React from 'react';
import { 
  Star, 
  ShieldCheck, 
  PoundSterling, 
  Zap, 
  GraduationCap, 
  Clock, 
  MapPin, 
  ExternalLink, 
  Train,
  MessageCircle,
  Wifi,
  CheckCircle2,
  Images
} from 'lucide-react';

const GBP_LINK = "https://www.google.com/search?sca_esv=7653edd048582144&rlz=1C1CHZN_enKW1034KW1034&sxsrf=APpeQnuqDknmR_k5xlchENl18i8bPILKlA%3A1784893273111&q=RentaRoomLondon&stick=H4sIAAAAAAAAAONgU1I1qDCxMDczNEy2MDRMMk41NTW1MqgwS04xsLRIskxJtEgyMDYwWcTKH5SaV5IYlJ-f65Ofl5KfBwCThyX0OwAAAA&mat=Cc0ocppXRqjM&ved=2ahUKEwjQxoXMneuVAxWXT2wGHYLZEQkQrMcEegQIFBAF";

export default function HeroSection() {
  return (
    <section className="w-full bg-[#FAF8F5] text-slate-900 min-h-screen py-8 px-4 sm:px-6 lg:px-12 relative overflow-hidden font-sans">
      
      {/* Subtle Grid Background Pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.35]" 
        style={{
          backgroundImage: `linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(90deg, #e2e8f0 1px, transparent 1px)`,
          backgroundSize: '36px 36px'
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10 space-y-6">
        
        {/* Top Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm font-medium border-b border-slate-200/80 pb-4">
          <div className="flex items-center gap-2 bg-white/80 backdrop-blur px-3 py-1.5 rounded-full border border-slate-200 text-slate-700 shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-semibold text-slate-900">GB Direct Landlord Network</span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-600">Tenant Fees Act Compliant (£0 Admin Fees)</span>
          </div>

          <a 
            href={GBP_LINK}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 bg-white/80 backdrop-blur px-3 py-1.5 rounded-full border border-slate-200 text-slate-800 shadow-sm hover:border-amber-400 transition-all"
          >
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
              ))}
            </div>
            <span className="font-bold text-slate-900 ml-1">5.0 Star</span>
            <span className="text-slate-500 text-xs">(Verified GBP Account)</span>
          </a>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start pt-2">
          
          {/* Left Content Column */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* H2 Pill Badge */}
            <div className="inline-flex items-center gap-2 bg-orange-100/70 border border-orange-200 px-3.5 py-1.5 rounded-full text-orange-800 font-semibold text-xs sm:text-sm shadow-xs">
              <GraduationCap className="w-4 h-4 text-orange-600" />
              <span>Accommodation for Global Students in London</span>
            </div>

            {/* H1 Main Heading & Subtitle */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 tracking-tight leading-[1.1]">
                Rent a Room in London – <br />
                <span className="text-orange-600 inline-block relative">
                  Different Locations
                  <svg className="absolute -bottom-2 left-0 w-full h-2 text-orange-300 opacity-60" viewBox="0 0 100 20" preserveAspectRatio="none">
                    <path d="M0,15 Q50,5 100,15" stroke="currentColor" strokeWidth="6" fill="none" />
                  </svg>
                </span>
              </h1>
              <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed max-w-2xl">
                Find student accommodation near the best universities &amp; cities in London with zero booking hassle.
              </p>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              
              {/* Feature 1 */}
              <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs hover:shadow-md hover:border-orange-200 transition-all flex items-start gap-3">
                <div className="p-2 bg-orange-50 text-orange-600 rounded-xl shrink-0 border border-orange-100">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-slate-900 leading-snug">Verified Listings</h2>
                  <p className="text-xs text-slate-500 font-medium">100% Inspected Properties</p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs hover:shadow-md hover:border-orange-200 transition-all flex items-start gap-3">
                <div className="p-2 bg-orange-50 text-orange-600 rounded-xl shrink-0 border border-orange-100">
                  <PoundSterling className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-slate-900 leading-snug">No Hidden Cost (Direct Landlord)</h2>
                  <p className="text-xs text-slate-500 font-medium">Zero Agency Fees</p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs hover:shadow-md hover:border-orange-200 transition-all flex items-start gap-3">
                <div className="p-2 bg-orange-50 text-orange-600 rounded-xl shrink-0 border border-orange-100">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-slate-900 leading-snug">Rooms Rental With Bills Included</h2>
                  <p className="text-xs text-slate-500 font-medium">Gas, Water, Elec &amp; WiFi</p>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs hover:shadow-md hover:border-orange-200 transition-all flex items-start gap-3">
                <div className="p-2 bg-orange-50 text-orange-600 rounded-xl shrink-0 border border-orange-100">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-slate-900 leading-snug">Relocation Service For Global Students</h2>
                  <p className="text-xs text-slate-500 font-medium">Visa &amp; Arrival Support</p>
                </div>
              </div>

              {/* Feature 5 */}
              <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs hover:shadow-md hover:border-orange-200 transition-all flex items-start gap-3 sm:col-span-1">
                <div className="p-2 bg-orange-50 text-orange-600 rounded-xl shrink-0 border border-orange-100">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-slate-900 leading-snug">24×7 Assistance</h2>
                  <p className="text-xs text-slate-500 font-medium">Round-the-clock Help</p>
                </div>
              </div>

            </div>

            {/* Numbered Points + GBP Card */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
              
              {/* Point 1 */}
              <div className="flex items-start gap-3.5">
                <div className="w-7 h-7 bg-slate-950 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  1
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                  <strong className="text-slate-900 font-bold">Rooms available near top universities &amp; top transport links</strong> across the city (Zone 1, 2 &amp; 3).
                </p>
              </div>

              {/* Point 2 */}
              <div className="flex items-start gap-3.5 pt-1 border-t border-slate-100">
                <div className="w-7 h-7 bg-slate-950 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  2
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                  <strong className="text-slate-900 font-bold">Looking for a room in a specific area?</strong> We negotiate directly with the landlord on your behalf, and help international students secure housing easily.
                </p>
              </div>

              {/* Point 3 / GBP Review Card */}
              <div className="bg-slate-950 rounded-xl p-4 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-md mt-4">
                <div className="flex items-center gap-3">
                  {/* Google 'G' Icon Box */}
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-slate-900 font-black text-xl shrink-0 shadow-xs">
                    G
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white">GBP Account</span>
                      <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-500/30 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        VERIFIED
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-300 pt-0.5">
                      <span>5 Star Rating</span>
                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <a 
                  href={GBP_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-slate-950 font-bold text-xs px-4 py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 shrink-0 shadow-sm"
                >
                  <span>GBP Review</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <a 
                href={GBP_LINK}
                target="_blank"
                rel="noreferrer"
                className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-sm px-6 py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 group"
              >
                <MessageCircle className="w-4 h-4 fill-white text-orange-500" />
                <span>Enquire via WhatsApp</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </a>

              <a 
                href={GBP_LINK}
                target="_blank"
                rel="noreferrer"
                className="bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm px-5 py-3.5 rounded-xl border border-slate-300 transition-all shadow-2xs flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4 text-orange-600" />
                <span>Verify Google Profile</span>
              </a>
            </div>

          </div>

          {/* Right Image Column */}
          <div className="lg:col-span-5">
            <div className="bg-white border border-slate-200/90 rounded-3xl p-3 shadow-lg relative">
              
              {/* Outer Image Container Frame */}
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-slate-100 border border-slate-200">
                
                {/* Property Image */}
                <img 
                  src="/room-rental-location.webp" 
                  alt="Student Rooms in London" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1000&q=80";
                  }}
                />

                {/* Top Overlay Badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                  <div className="bg-slate-900/90 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-lg border border-white/20 flex items-center gap-1.5 shadow-sm">
                    <MapPin className="w-3.5 h-3.5 text-orange-400" />
                    <span>London Zone 1–3 Locations</span>
                  </div>

                  <div className="bg-emerald-500 text-slate-950 font-black text-[11px] px-2.5 py-1 rounded-lg uppercase tracking-wider shadow-sm">
                    DIRECT LANDLORD
                  </div>
                </div>

                {/* University Proximity Tags on Image */}
                <div className="absolute top-14 left-3 right-3 flex flex-wrap gap-1.5">
                  <span className="bg-white/95 backdrop-blur text-slate-900 text-[11px] font-bold px-2.5 py-1 rounded-md border border-slate-200/80 flex items-center gap-1 shadow-2xs">
                    <Train className="w-3 h-3 text-orange-600" />
                    UCL (8 mins walk)
                  </span>
                  <span className="bg-white/95 backdrop-blur text-slate-900 text-[11px] font-bold px-2.5 py-1 rounded-md border border-slate-200/80 flex items-center gap-1 shadow-2xs">
                    <Train className="w-3 h-3 text-orange-600" />
                    King's College (12 mins tube)
                  </span>
                  <span className="bg-white/95 backdrop-blur text-slate-900 text-[11px] font-bold px-2.5 py-1 rounded-md border border-slate-200/80 flex items-center gap-1 shadow-2xs">
                    <Train className="w-3 h-3 text-orange-600" />
                    LSE (10 mins tube)
                  </span>
                  <span className="bg-white/95 backdrop-blur text-slate-900 text-[11px] font-bold px-2.5 py-1 rounded-md border border-slate-200/80 flex items-center gap-1 shadow-2xs">
                    <Train className="w-3 h-3 text-orange-600" />
                    Imperial (15 mins tube)
                  </span>
                </div>

                {/* View Room Pics Button */}
                <div className="absolute bottom-32 left-3 right-3 flex justify-center">
                  <a
                    href={GBP_LINK}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-white/95 backdrop-blur-md hover:bg-white text-slate-900 text-xs font-bold px-4 py-2.5 rounded-xl border border-slate-200/80 shadow-md flex items-center gap-2 transition-all hover:shadow-lg hover:scale-[1.02]"
                  >
                    <Images className="w-4 h-4 text-orange-600" />
                    <span>View Room Pics</span>
                  </a>
                </div>

                {/* Bottom Card Inside Image Overlay */}
                <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md border border-white/80 rounded-xl p-3.5 shadow-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-sm font-bold text-slate-900">Student Rooms in London</h2>
                      <p className="text-[11px] text-slate-500 font-medium">Fully Furnished • Zero Booking Fee</p>
                    </div>
                    <span className="bg-orange-100 text-orange-800 text-[10px] font-bold px-2.5 py-1 rounded-md border border-orange-200">
                      Bills Included
                    </span>
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600 font-semibold">
                    <span className="flex items-center gap-1 text-orange-600">
                      <Zap className="w-3 h-3" />
                      Free High-Speed WiFi
                    </span>
                    <span className="flex items-center gap-1 text-emerald-600">
                      <ShieldCheck className="w-3 h-3" />
                      Verified Landlords
                    </span>
                  </div>
                </div>

              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-2 mt-3 text-center">
                <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-2.5">
                  <div className="text-xs font-extrabold text-slate-900">100%</div>
                  <div className="text-[10px] text-slate-500 font-medium">Verified</div>
                </div>
                <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-2.5">
                  <div className="text-xs font-extrabold text-slate-900">£0 Fee</div>
                  <div className="text-[10px] text-slate-500 font-medium">Direct Landlord</div>
                </div>
                <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-2.5">
                  <div className="text-xs font-extrabold text-slate-900">24/7</div>
                  <div className="text-[10px] text-slate-500 font-medium">Assistance</div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}