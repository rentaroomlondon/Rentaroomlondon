'use client';
import React, { useRef, useState } from 'react';
import {
  Star,
  ShieldCheck,
  PoundSterling,
  Zap,
  GraduationCap,
  Clock,
  ExternalLink,
  CheckCircle2,
  Play,
  Pause,
} from 'lucide-react';

const GBP_LINK =
  'https://www.google.com/search?sca_esv=7653edd048582144&rlz=1C1CHZN_enKW1034KW1034&sxsrf=APpeQnuqDknmR_k5xlchENl18i8bPILKlA%3A1784893273111&q=RentaRoomLondon&stick=H4sIAAAAAAAAAONgU1I1qDCxMDczNEy2MDRMMk41NTW1MqgwS04xsLRIskxJtEgyMDYwWcTKH5SaV5IYlJ-f65Ofl5KfBwCThyX0OwAAAA&mat=Cc0ocppXRqjM&ved=2ahUKEwjQxoXMneuVAxWXT2wGHYLZEQkQrMcEegQIFBAF';

export default function HeroSection() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleTogglePlay = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <section className="w-full bg-[#FAF8F5] text-slate-900 min-h-screen py-8 px-4 sm:px-6 lg:px-12 relative overflow-hidden font-sans">
      {/* Subtle Grid Background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.35]"
        style={{
          backgroundImage: `linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(90deg, #e2e8f0 1px, transparent 1px)`,
          backgroundSize: '36px 36px',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10 space-y-6">
        {/* Top Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm font-medium border-b border-slate-200/80 pb-4">
          <div className="flex items-center gap-2 bg-white/80 backdrop-blur px-3 py-1.5 rounded-full border border-slate-200 text-slate-700 shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-semibold text-slate-900">
              GB Direct Landlord Network
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-600">
              Tenant Fees Act Compliant (£0 Admin Fees)
            </span>
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
          {/* Left Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-orange-100/70 border border-orange-200 px-3.5 py-1.5 rounded-full text-orange-800 font-semibold text-xs sm:text-sm">
              <GraduationCap className="w-4 h-4 text-orange-600" />
              <span>Accommodation for Global Students in London</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 tracking-tight leading-[1.1]">
                Rent a Room in London – <br />
                <span className="text-orange-600 inline-block relative">
                  Different Locations
                  <svg
                    className="absolute -bottom-2 left-0 w-full h-2 text-orange-300 opacity-60"
                    viewBox="0 0 100 20"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0,15 Q50,5 100,15"
                      stroke="currentColor"
                      strokeWidth="6"
                      fill="none"
                    />
                  </svg>
                </span>
              </h1>
              <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed max-w-2xl">
                Find student accommodation near the best universities &amp; cities
                in London with zero booking hassle.
              </p>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              {[
                {
                  icon: ShieldCheck,
                  title: 'Verified Listings',
                  desc: '100% Inspected Properties',
                },
                {
                  icon: PoundSterling,
                  title: 'No Hidden Cost (Direct Landlord)',
                  desc: 'Zero Agency Fees',
                },
                {
                  icon: Zap,
                  title: 'Rooms Rental With Bills Included',
                  desc: 'Gas, Water, Elec & WiFi',
                },
                {
                  icon: GraduationCap,
                  title: 'Relocation Service For Global Students',
                  desc: 'Visa & Arrival Support',
                },
                {
                  icon: Clock,
                  title: '24×7 Assistance',
                  desc: 'Round-the-clock Help',
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs hover:shadow-md hover:border-orange-200 transition-all flex items-start gap-3"
                >
                  <div className="p-2 bg-orange-50 text-orange-600 rounded-xl shrink-0 border border-orange-100">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-slate-900 leading-snug">
                      {item.title}
                    </h2>
                    <p className="text-xs text-slate-500 font-medium">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Numbered Points + GBP */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="w-7 h-7 bg-slate-950 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  1
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  <strong className="text-slate-900 font-bold">
                    Rooms available near top universities &amp; top transport links
                  </strong>{' '}
                  across the city (Zone 1, 2 &amp; 3).
                </p>
              </div>

              <div className="flex items-start gap-3.5 pt-1 border-t border-slate-100">
                <div className="w-7 h-7 bg-slate-950 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  2
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  <strong className="text-slate-900 font-bold">
                    Looking for a room in a specific area?
                  </strong>{' '}
                  We negotiate directly with the landlord on your behalf, and help
                  international students secure housing easily.
                </p>
              </div>

              <div className="bg-slate-950 rounded-xl p-4 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-md mt-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-slate-900 font-black text-xl shrink-0">
                    G
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold">GBP Account</span>
                      <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-500/30 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        VERIFIED
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-300 pt-0.5">
                      <span>5 Star Rating</span>
                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <a
                  href={GBP_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-slate-950 font-bold text-xs px-4 py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 shrink-0"
                >
                  <span>GBP Review</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* ========== ROOM VIDEO ========== */}
          <div className="lg:col-span-5">
            <div className="bg-white border border-slate-200/90 rounded-3xl overflow-hidden shadow-lg sticky top-6">
              {/* Video Container */}
              <div className="relative aspect-[4/5] sm:aspect-video lg:aspect-[4/5] bg-slate-100 group">
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  poster="/apartment-room-rental-service.webp"
                  aria-label="Live room tour of modern student accommodation in London"
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                >
                  <source src="/room-video.webm" type="video/webm" />
                  Your browser does not support the video tag.
                </video>

                {/* Play / Pause Overlay */}
                <button
                  onClick={handleTogglePlay}
                  className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-all duration-300 z-10"
                  aria-label={isPlaying ? 'Pause video' : 'Play video'}
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/95 hover:bg-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform duration-300">
                    {isPlaying ? (
                      <Pause className="w-7 h-7 sm:w-8 sm:h-8 text-slate-900 fill-slate-900" />
                    ) : (
                      <Play className="w-7 h-7 sm:w-8 sm:h-8 text-slate-900 fill-slate-900 ml-1" />
                    )}
                  </div>
                </button>

                {/* Optional dark gradient overlay at bottom */}
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
              </div>

              {/* Caption under video */}
              <div className="p-5 sm:p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Live Room Tour
                  </span>
                </div>
                <h3 className="text-lg font-black text-slate-950">
                  Modern Rooms Across London
                </h3>
                <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                  Fully furnished rooms with bills included. Direct from landlord – zero agency fees.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}