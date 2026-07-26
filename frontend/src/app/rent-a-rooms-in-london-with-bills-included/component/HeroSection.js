'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Star,
  ShieldCheck,
  PoundSterling,
  Zap,
  GraduationCap,
  Clock,
  ExternalLink,
  MessageCircle,
  CheckCircle2,
  ChevronDown,
} from 'lucide-react';

const GBP_LINK =
  'https://www.google.com/search?sca_esv=7653edd048582144&rlz=1C1CHZN_enKW1034KW1034&sxsrf=APpeQnuqDknmR_k5xlchENl18i8bPILKlA%3A1784893273111&q=RentaRoomLondon&stick=H4sIAAAAAAAAAONgU1I1qDCxMDczNEy2MDRMMk41NTW1MqgwS04xsLRIskxJtEgyMDYwWcTKH5SaV5IYlJ-f65Ofl5KfBwCThyX0OwAAAA&mat=Cc0ocppXRqjM&ved=2ahUKEwjQxoXMneuVAxWXT2wGHYLZEQkQrMcEegQIFBAF';

export default function HeroSection() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openSection, setOpenSection] = useState(null); // which question is expanded

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    moveIn: '',
    area: '',
    lengthOfStay: '',
    budget: '',
  });

  const handleChange = (key) => (e) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const selectOption = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setOpenSection(null); // collapse after selection
  };

  const toggleSection = (section) => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/enquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        // alert('Enquiry submitted successfully!');
        setForm({
          name: '',
          email: '',
          phone: '',
          moveIn: '',
          area: '',
          lengthOfStay: '',
          budget: '',
        });

        // Redirect to thank-you page
        router.push('/thank-you-rental-room-london');
      } else {
        alert(data.message || 'Something went wrong');
      }
    } catch (err) {
      console.error(err);
      alert('Network error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper for compact selectable questions
  const CompactQuestion = ({
    id,
    label,
    value,
    options,
    required = true,
  }) => {
    const isOpen = openSection === id;

    return (
      <div className="border border-slate-200 rounded-xl overflow-hidden">
        <button
          type="button"
          onClick={() => toggleSection(id)}
          className="w-full flex items-center justify-between px-4 py-3.5 text-left bg-white hover:bg-slate-50 transition-colors"
        >
          <div>
            <p className="text-sm font-semibold text-slate-700">
              {label} {required && <span className="text-orange-500">*</span>}
            </p>
            <p className="text-sm text-slate-500 mt-0.5">
              {value || 'Select an option'}
            </p>
          </div>
          <ChevronDown
            className={`w-5 h-5 text-slate-400 transition-transform ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </button>

        {isOpen && (
          <div className="border-t border-slate-100 bg-slate-50/80 px-2 py-2 space-y-1">
            {options.map((opt) => {
              const optValue = typeof opt === 'string' ? opt : opt.value;
              const optLabel = typeof opt === 'string' ? opt : opt.label;
              const isSelected = value === optValue;

              return (
                <button
                  key={optValue}
                  type="button"
                  onClick={() => selectOption(id, optValue)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors ${
                    isSelected
                      ? 'bg-orange-100 text-orange-800 font-semibold'
                      : 'hover:bg-white text-slate-700'
                  }`}
                >
                  {optLabel}
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
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
                <span className="group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </a>

              <a
                href={GBP_LINK}
                target="_blank"
                rel="noreferrer"
                className="bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm px-5 py-3.5 rounded-xl border border-slate-300 transition-all flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4 text-orange-600" />
                <span>Verify Google Profile</span>
              </a>
            </div>
          </div>

          {/* ========== COMPACT FORM ========== */}
          <div className="lg:col-span-5">
            <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 shadow-lg sticky top-6">
              <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 text-xs font-bold px-3 py-1 rounded-full border border-orange-200 mb-4">
                <MessageCircle className="w-3.5 h-3.5 text-orange-600" />
                Enquiry Form
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight mb-1">
                Tell us what you&apos;re looking for
              </h2>
              <p className="text-sm text-slate-500 mb-6">
                Fill the form and we&apos;ll get back to you quickly.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                    Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange('name')}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400/40 focus:border-orange-300 transition"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange('email')}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400/40 focus:border-orange-300 transition"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={handleChange('phone')}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400/40 focus:border-orange-300 transition"
                  />
                </div>

                {/* Compact Questions */}
                <CompactQuestion
                  id="moveIn"
                  label="When are you looking to move?"
                  value={form.moveIn}
                  options={[
                    'Within 1 week',
                    'Within 1 month',
                    'Within 3 months',
                    'Within 6 months',
                  ]}
                />

                <CompactQuestion
                  id="area"
                  label="Which area interests you most?"
                  value={form.area}
                  options={[
                    'Cricklewood',
                    'Harlesden',
                    'Kingsbury',
                    'West Hampstead',
                    'Hendon',
                    'Plumstead',
                    'Eltham',
                    'Greenwich',
                    'Stockwell',
                    'South Tottenham',
                    'Leyton',
                    'East Ham',
                    'Birmingham',
                    'Other / Any London',
                  ]}
                />

                <CompactQuestion
                  id="lengthOfStay"
                  label="Length of Stay"
                  value={form.lengthOfStay}
                  options={[
                    'less than month',
                    '1-2 months',
                    '3-5 months',
                    '6-9 months',
                    '10-12 months',
                  ]}
                />

                <CompactQuestion
                  id="budget"
                  label="Monthly Budget"
                  value={
                    form.budget === '620-1500'
                      ? '£620 – £1,500'
                      : form.budget === '1500-2500'
                      ? '£1,500 – £2,500'
                      : form.budget === '2500-3500'
                      ? '£2,500 – £3,500'
                      : form.budget === '3500+'
                      ? '£3,500+'
                      : ''
                  }
                  options={[
                    { label: '£620 – £1,500', value: '620-1500' },
                    { label: '£1,500 – £2,500', value: '1500-2500' },
                    { label: '£2,500 – £3,500', value: '2500-3500' },
                    { label: '£3,500+', value: '3500+' },
                  ]}
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-colors shadow-sm mt-2"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Enquiry'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}