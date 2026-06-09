import React from 'react';
import Head from 'next/head';

export default function RentalsPage() {
  return (
    <>
      <Head>
        <title>Find Your Perfect Room in London</title>
        <meta name="description" content="No brokers. No hidden fees. Just affordable rooms rented directly from trusted landlords." />
      </Head>

      <div className="bg-white font-sans text-slate-800 antialiased min-h-screen">
        
        {/* --- SECTION 1: HERO BANNER --- */}
        <header className="relative min-h-[85vh] flex items-center px-6 lg:px-16 py-12 border-b border-slate-100 bg-gradient-to-br from-white to-slate-50">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center w-full">
            
            {/* Left Column: Exact Content Copy */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-sky-50 text-sky-700 text-sm font-semibold rounded-full w-fit">
                🇬🇧 Direct Rental Platform
              </div>
              
              {/* H1 Content */}
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Find Your Perfect Room in <br />
                <span className="text-sky-600">London — Direct & Hassle-Free</span>
              </h1>
              
              {/* H2 Content */}
              <p className="text-lg md:text-xl text-slate-600 max-w-xl leading-relaxed">
                No brokers. No hidden fees. Just affordable rooms rented directly from trusted landlords.
              </p>
              
              {/* Rent a Room Button */}
              <div className="pt-4">
                <a 
                  href="#cta-section" 
                  className="inline-block bg-sky-600 hover:bg-sky-700 text-white font-bold text-lg px-8 py-4 rounded-xl shadow-md transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                >
                  Rent a Room
                </a>
              </div>
            </div>

            {/* Right Column: Visual Component Wrapper */}
            <div className="lg:col-span-5 relative hidden lg:block">
              <div className="absolute inset-0 bg-sky-100 rounded-3xl rotate-3 scale-105 opacity-40 blur-sm"></div>
              <div className="relative bg-slate-200 rounded-3xl h-[480px] w-full overflow-hidden shadow-xl border border-slate-100 flex items-center justify-center">
                <div className="text-slate-400 text-sm font-medium text-center p-6">
                  {/* Visual placeholder: Feel free to swap out background with your own assets */}
                  [ London Property Visual Dynamic Frame ]
                </div>
              </div>
            </div>

          </div>
        </header>

        {/* --- SECTION 2: TRUST & INTRODUCTION --- */}
        <section className="bg-slate-50 py-24 px-6 lg:px-16">
          <div className="max-w-6xl mx-auto">
            
            {/* H2 Section Title */}
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
                Your Trusted Partner for Room Rentals in London
              </h2>
              <div className="h-1 w-16 bg-sky-500 mx-auto mt-4 rounded-full"></div>
            </div>
            
            {/* Copy Split Layout */}
            <div className="grid md:grid-cols-12 gap-12 items-start">
              
              {/* Left Side: Body Text Paragraph Blocks */}
              <div className="md:col-span-7 space-y-6 text-slate-600 text-lg leading-relaxed">
                <p className="font-semibold text-xl text-slate-900">
                  Looking for a room in London without paying unnecessary agency commissions?
                </p>
                <p>
                  Our team helps you find quality rooms directly from landlords with transparent pricing. 
                  Tell us what you're looking for, and we'll match you with available rooms that fit 
                  your budget and location preferences.
                </p>
              </div>
              
              {/* Right Side: Structural Benefits Layout */}
              <div className="md:col-span-5 space-y-4">
                <div className="bg-white p-5 rounded-xl shadow-xs border border-slate-100 flex items-center gap-4 transition-all hover:shadow-md">
                  <span className="text-2xl" role="img" aria-label="handshake">🤝</span>
                  <span className="font-medium text-slate-800">Zero broker interference</span>
                </div>
                <div className="bg-white p-5 rounded-xl shadow-xs border border-slate-100 flex items-center gap-4 transition-all hover:shadow-md">
                  <span className="text-2xl" role="img" aria-label="money">💎</span>
                  <span className="font-medium text-slate-800">100% Transparent pricing</span>
                </div>
                <div className="bg-white p-5 rounded-xl shadow-xs border border-slate-100 flex items-center gap-4 transition-all hover:shadow-md">
                  <span className="text-2xl" role="img" aria-label="target">🎯</span>
                  <span className="font-medium text-slate-800">Tailored budget matchmaker</span>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* --- SECTION 3: BOTTOM CTA CONVERSION BANNER --- */}
        <section id="cta-section" className="bg-white py-20 px-6 text-center">
          <div className="max-w-4xl mx-auto bg-slate-900 text-white rounded-3xl py-14 px-8 shadow-xl relative overflow-hidden">
            
            {/* Ambient Background Graphic Layer */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-sky-600 rounded-full blur-3xl opacity-10 -translate-y-12 translate-x-12"></div>
            
            <div className="relative z-10 space-y-6">
              <h3 class="text-2xl md:text-3xl font-bold">Ready to skip the hidden costs?</h3>
              <p className="text-slate-400 max-w-md mx-auto text-sm md:text-base">
                Connect directly with landlords today without agency friction.
              </p>
              
              {/* Duplicate Target Button */}
              <div className="pt-2">
                <button 
                  onClick={() => alert('Form modal / registration action goes here')}
                  className="inline-block bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-lg px-10 py-4 rounded-xl shadow-md transition duration-200 cursor-pointer transform hover:scale-[1.02]"
                >
                  Rent a Room
                </button>
              </div>
            </div>
            
          </div>
        </section>

      </div>
    </>
  );
}