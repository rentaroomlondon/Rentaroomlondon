'use client';

import { MapPin, MessageCircle, Eye } from 'lucide-react';

export default function RoomCard({ loc, onEnquire, onView }) {
  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group">
      {/* Card Image Banner */}
      <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
        <img
          src={loc.image}
          alt={loc.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80';
          }}
        />

        {/* Zone Tag */}
        <div className="absolute top-3 left-3 bg-slate-950/90 backdrop-blur text-white text-[10px] font-extrabold px-2.5 py-1 rounded-md border border-white/20">
          {loc.zone}
        </div>

        {/* Price / Highlight Tag */}
        {/* <div className="absolute top-3 right-3 bg-orange-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-md shadow-2xs">
          {loc.priceTag}
        </div> */}

        {/* Postcode Tag */}
        <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur text-slate-900 text-[11px] font-bold px-2 py-0.5 rounded border border-slate-200/80 flex items-center gap-1">
          <MapPin className="w-3 h-3 text-orange-600" />
          <span>{loc.postcode}</span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
        <div>
          <h4 className="text-sm font-bold text-slate-900 leading-snug group-hover:text-orange-600 transition-colors">
            {loc.title}
          </h4>

          {/* Highlights List */}
          <ul className="mt-3 space-y-1.5 border-t border-slate-100 pt-3">
            {loc.features.map((feat, idx) => (
              <li key={idx} className="text-xs text-slate-600 flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0 mt-1.5" />
                <span className="leading-tight">{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Card Actions */}
        <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2">
          <button
            onClick={onEnquire}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-2xs"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-white text-orange-500" />
            <span>Enquire</span>
          </button>

          <button
            onClick={onView}
            className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5 text-slate-600" />
            <span>View</span>
          </button>
        </div>
      </div>
    </div>
  );
}