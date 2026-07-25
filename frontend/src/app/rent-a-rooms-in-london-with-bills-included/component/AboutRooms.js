'use client';

import React from 'react';
import {
  MapPin,
  Users,
  Laptop,
  Home,
  Clock,
  ShieldCheck,
  Building2,
  CheckCircle2,
} from 'lucide-react';

const blocks = [
  {
    number: '01',
    icon: MapPin,
    title: 'Start your day close to everything',
    text: 'A quick coffee before lectures, an easy walk to the station, or a short cycle to campus. Every room in Cricklewood, Colindale, Greenwich and Eltham is chosen for how well it connects to the rest of London.',
    image:
      'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80', // London street / morning
  },
  {
    number: '02',
    icon: Users,
    title: 'Settle into a neighbourhood, not just a postcode',
    text: 'Moving to a new city is easier with people around you. Our team helps you discover nearest shops, transport links and the everyday spots that make an area feel like home.',
    image:
      'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=800&q=80', // London neighbourhood
  },
  {
    number: '03',
    icon: Laptop,
    title: 'A space that works as hard as you do',
    text: 'Furnished rooms designed for real student life — somewhere to focus hard during exam season and somewhere to properly switch off afterwards.',
    image:
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80', // Modern furnished room
  },
  {
    number: '04',
    icon: Home,
    title: 'Come home to your own space',
    text: 'After a busy day exploring London, come back to a furnished room that’s genuinely yours. No shared bedrooms. No compromises.',
    image:
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80', // Cosy private room
  },
];

export default function AboutRooms() {
  return (
    <section className="w-full bg-[#FAF8F5] text-slate-900 font-sans py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Hero intro with image ─────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16 sm:mb-20 items-center">
          {/* Left content */}
          <div className="lg:col-span-5 space-y-5 order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 text-xs font-bold px-3 py-1 rounded-full border border-orange-200">
              <Building2 className="w-3.5 h-3.5 text-orange-600" />
              Direct Landlord
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-[2.15rem] font-black text-slate-950 tracking-tight leading-tight">
              Book a Room For Rental in London With Direct Landlord
            </h2>

            <p className="text-slate-600 text-sm sm:text-[15px] leading-relaxed">
              The Morning Hours (UK) Ltd offers furnished rooms for rent across Greenwich,
              Colindale, Eltham, Cricklewood and other London locations — all close to
              transport links and universities.
            </p>

            <p className="text-slate-600 text-sm sm:text-[15px] leading-relaxed">
              Flexible terms of 1, 3 or 6 months with a fixed deposit. Continued support
              after you move in. Response within 24 hours. No hidden costs — you deal
              directly with the landlord.
            </p>

            {/* Trust chips */}
            <div className="flex flex-wrap gap-2.5 pt-1">
              {[
                { icon: Clock, label: '24h response' },
                { icon: ShieldCheck, label: 'Fixed deposit' },
                { icon: Home, label: '1–6 month terms' },
              ].map((item) => (
                <span
                  key={item.label}
                  className="inline-flex items-center gap-1.5 bg-white border border-slate-200 text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm"
                >
                  <item.icon className="w-3.5 h-3.5 text-orange-600" />
                  {item.label}
                </span>
              ))}
            </div>
          </div>

          {/* Right – large image + overlay card */}
          <div className="lg:col-span-7 order-1 lg:order-2 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-lg aspect-[4/3] sm:aspect-[16/10]">
              <img
                src="/About.jpg"
                alt="London student life"
                className="w-full h-full object-cover"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />

              {/* Floating info card */}
              <div className="absolute bottom-5 left-5 right-5 sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-sm bg-white/95 backdrop-blur-sm rounded-2xl p-5 shadow-xl border border-white/50">
                <p className="text-orange-600 font-bold text-xs uppercase tracking-wider mb-1.5">
                  Real student life
                </p>
                <h3 className="text-base sm:text-lg font-black text-slate-950 leading-snug mb-3">
                  Rooms built around how you actually live in London
                </h3>
                <div className="space-y-2">
                  {[
                    'Close to campuses & transport',
                    'Fully furnished & move-in ready',
                    'Zero agency fees',
                  ].map((point) => (
                    <div key={point} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0" />
                      <span className="text-slate-700 text-xs sm:text-sm font-medium">
                        {point}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── 4 Feature cards with images ───────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {blocks.map((block) => {
            const Icon = block.icon;
            return (
              <div
                key={block.number}
                className="group bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-sm hover:border-orange-200 hover:shadow-md transition-all duration-300 flex flex-col"
              >
                {/* Image */}
                <div className="relative h-40 sm:h-44 overflow-hidden">
                  <img
                    src={block.image}
                    alt={block.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="bg-white/95 backdrop-blur-sm text-slate-900 text-xs font-black px-2.5 py-1 rounded-lg shadow-sm">
                      {block.number}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-orange-50 border border-orange-100 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-orange-600" />
                    </div>
                    <h4 className="text-[14px] sm:text-[15px] font-bold text-slate-900 leading-snug">
                      {block.title}
                    </h4>
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed flex-1">
                    {block.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}