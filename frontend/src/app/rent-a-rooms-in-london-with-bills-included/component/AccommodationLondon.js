"use client";

import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { toast } from "react-toastify";
import {
  MapPin,
  Wifi,
  Zap,
  Headphones,
  Utensils,
  BedDouble,
  Star,
  ChevronDown,
  ChevronUp,
  Clock,
  Building2,
  ShieldCheck,
  Send,
  ArrowRight,
} from "lucide-react";

export default function StudentAccommodationLondon() {
  // --- Form State & Logic ---
  const [form, setForm] = useState({
    contactMethod: "Call me",
    title: "Mr",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Message sent successfully");
        setForm({
          contactMethod: "Call me",
          title: "Mr",
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          message: "",
        });

        // Redirect on success
        window.location.href = "/thank-you-rental-room-london";
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server error ❌");
    }
    setLoading(false);
  };

  // --- Location Filter & FAQ State ---
  const [activeFilter, setActiveFilter] = useState("All");
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const propertyListings = [
    {
      id: 1,
      title: "Rent a Room in Greenwich",
      postcode: "SE10 8LL",
      area: "Greenwich",
      zone: "ZONE 2",
      highlights: [
        "10–15 min bus or 20–25 min walk to Greenwich main campus",
        "5–8 min walk to Deptford Bridge DLR",
        "Short walk to Greenwich Rail Station",
      ],
    },
    {
      id: 2,
      title: "Rent a Room in Colindale",
      postcode: "NW9 9TU",
      area: "Colindale",
      zone: "ZONE 3–4",
      highlights: [
        "20–22 min to Westminster Harrow Campus via Northwick Park",
        "18–20 min tube to LSST Wembley Park",
        "8–10 min walk to Queensbury, 12–15 min to Kingsbury Station",
      ],
    },
    {
      id: 3,
      title: "Rent a Room in Eltham",
      postcode: "SE9 5NA",
      area: "Eltham",
      zone: "ZONE 4",
      highlights: [
        "Few minutes' walk to Pinnacle College UK Ltd",
        "5–10 min walk to Harris Academy Greenwich",
      ],
    },
    {
      id: 4,
      title: "Rent a Room in Cricklewood",
      postcode: "NW2 6UJ",
      area: "Cricklewood",
      zone: "ZONE 3",
      highlights: [
        "10–12 min walk to Willesden Green Station",
        "10 min walk to Cricklewood Station",
      ],
    },
    {
      id: 5,
      title: "Rent a Room on Cricklewood Broadway",
      postcode: "NW2 3EJ",
      area: "Cricklewood",
      zone: "ZONE 3",
      highlights: [
        "On Cricklewood Broadway — shops, buses and station on doorstep",
        "Easy reach of Willesden Green and Cricklewood stations",
      ],
    },
    {
      id: 6,
      title: "Budget Room on Cricklewood Broadway",
      postcode: "NW2 3EJ",
      area: "Cricklewood",
      zone: "ZONE 3",
      highlights: [
        "Most affordable room on the Broadway — great for budget-conscious tenants",
        "Same building and transport links as Room A",
      ],
    },
    {
      id: 7,
      title: "14 Hendale Avenue",
      postcode: "NW4 4LR",
      area: "Hendon",
      zone: "ZONE 3–4",
      highlights: [
        "8–10 minutes' walk to Middlesex University",
        "5–10 minutes' walk to Hendon Central Station",
      ],
    },
    {
      id: 8,
      title: "107b Melrose Avenue",
      postcode: "NW2 4LX",
      area: "Cricklewood",
      zone: "ZONE 3",
      highlights: [
        "Same Cricklewood transport links as our other rooms nearby",
        "Quiet residential street, close to local shops and buses",
      ],
    },
    {
      id: 9,
      title: "16 Hendale Avenue",
      postcode: "NW4 4LR",
      area: "Hendon",
      zone: "ZONE 3–4",
      highlights: [
        "Same street as our 14 Hendale Avenue room",
        "Walking distance to Middlesex University and Hendon Central",
      ],
    },
    {
      id: 10,
      title: "9 Kennylands Court, Hendon Way",
      postcode: "NW4 3LU",
      area: "Hendon",
      zone: "ZONE 3–4",
      highlights: [
        "On Hendon Way, close to local bus routes into central Hendon",
        "Short reach of Middlesex University",
      ],
    },
  ];

  const filteredProperties =
    activeFilter === "All"
      ? propertyListings
      : propertyListings.filter((item) => item.area === activeFilter);

  const faqData = [
    {
      question: "Is there short-term and summer accommodation available in London?",
      answer:
        "If you're looking for London student accommodation during the summer or for just a term or two, get in touch with our property teams who will share available room options and photos based on your exact timeframe.",
    },
    {
      question: "Is it possible to get dual occupancy student accommodation from you?",
      answer:
        "Yes, it is! We offer dual occupancy for select rooms and studios in London, so you can live with a partner or friend while sharing costs compared to renting two separate rooms.",
    },
    {
      question: "Do I need a UK guarantor?",
      answer:
        "Booking requirements vary depending on the property, lease length, and your profile. Contact our team, and we will explain all eligible options—including upfront payment plans if you do not have a UK guarantor.",
    },
    {
      question: "Can I arrange a viewing before renting a room?",
      answer:
        "Yes! We can arrange both in-person and live virtual video viewings, depending on current property occupancy and availability.",
    },
  ];

  return (
    <>
      <Head>
        <title>Rent Rooms in London With Bills Included | Student Accommodation</title>
        <meta
          name="description"
          content="Find your room in London close to transport, universities & city life. Rooms to rent in Cricklewood, Colindale, Greenwich & Eltham with bills included."
        />
      </Head>

      <div className="min-h-screen bg-[#0F1622] font-sans text-slate-100 antialiased">
        {/* Top Announcement Bar */}
        <div className="bg-[#FF6B35] text-white text-xs md:text-sm py-2 px-4 text-center font-medium tracking-wide">
          ✨ Verified Direct Landlord Listings | Zero Hidden Fees | All Bills Included
        </div>

        {/* --- Hero Section --- */}
        <section className="relative w-full min-h-[600px] flex items-center overflow-hidden px-5 py-12 lg:py-20 bg-[#1A2332] md:bg-[linear-gradient(102.2deg,#1A2332_0%,#243044_100%)]">
          {/* Decorative Background Element */}
          <div className="hidden lg:block absolute inset-0 z-0 pointer-events-none">
            <div className="absolute right-[-5vw] top-1/2 -translate-y-1/2 w-[45vw] h-[45vw] rounded-full bg-[#FF6B35]/5 blur-3xl" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              
              {/* LEFT COLUMN: Hero Text & Badges */}
              <div className="lg:col-span-7 space-y-6">
                <nav className="flex items-center space-x-2 text-[13px] md:text-[14px]">
                  <Link href="/" className="text-[#FFFFFFA6] hover:text-[#FF6B35] transition-colors">
                    Home
                  </Link>
                  <span className="text-[#FFFFFFA6]">/</span>
                  <span className="text-white font-medium">Student Accommodation London</span>
                </nav>

                <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-slate-300 text-xs font-semibold">
                  <Building2 className="w-4 h-4 text-[#FF6B35]" />
                  <span>The Morning Hours (UK) Ltd</span>
                </div>

                <h1 className="text-white font-playfair text-[36px] leading-[1.1] md:text-[56px] font-bold">
                  Rent a Room in London{" "}
                  <span className="text-[#FF6B35] italic font-playfair block mt-1">
                    With Bills Included
                  </span>
                </h1>

                <p className="text-[#FFFFFFA6] font-sans font-light text-[16px] leading-7 md:text-[18px]">
                  Find student accommodation near London's top universities and major transport hubs. Enjoy straightforward, single-lease living with zero stress and no hidden fees.
                </p>

                {/* Value Badges */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {[
                    "Verified Direct Landlord Listings",
                    "Zero Hidden Costs",
                    "All Utility Bills Included",
                    "Relocation Support for Global Students",
                    "24/7 Dedicated Assistance",
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-sm text-slate-300">
                      <ShieldCheck className="w-5 h-5 text-[#FF6B35] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {/* Google Reviews */}
                <div className="pt-2 flex items-center space-x-4">
                  <a
                    href="https://share.google/RaTRuyCq5TUUjmONw"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 p-3.5 rounded-2xl transition backdrop-blur-sm"
                  >
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">5.0 Star Rated on Google</div>
                      <div className="text-xs text-[#FFFFFFA6] underline">Read Direct Business Reviews</div>
                    </div>
                  </a>
                </div>
              </div>

              {/* RIGHT COLUMN: Updated Contact Form */}
              <div className="lg:col-span-5 relative">
                <div id="contact-form" className="bg-white/5 backdrop-blur-md border border-white/10 p-6 md:p-8 rounded-[32px] shadow-2xl">
                  <div className="mb-6">
                    <h2 className="text-white text-xl md:text-2xl font-playfair font-bold mb-1">
                      Get in Touch
                    </h2>
                    <p className="text-[#FFFFFFA6] text-sm">
                      Inquire about available rooms across London.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Preference Selects */}
                    <div className="grid grid-cols-2 gap-3">
                      <select
                        name="contactMethod"
                        value={form.contactMethod}
                        onChange={handleChange}
                        className="w-full p-3 bg-white/10 border border-white/10 rounded-xl text-white text-sm outline-none cursor-pointer focus:border-[#FF6B35] transition-all"
                      >
                        <option className="text-black">Call me</option>
                        <option className="text-black">Email me</option>
                      </select>

                      <select
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        className="w-full p-3 bg-white/10 border border-white/10 rounded-xl text-white text-sm outline-none cursor-pointer focus:border-[#FF6B35] transition-all"
                      >
                        <option className="text-black">Mr</option>
                        <option className="text-black">Mrs</option>
                        <option className="text-black">Ms</option>
                      </select>
                    </div>

                    {/* First & Last Name */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        name="firstName"
                        value={form.firstName}
                        onChange={handleChange}
                        placeholder="First Name *"
                        className="w-full p-3 bg-white border-0 rounded-xl text-slate-900 text-sm outline-none focus:ring-2 focus:ring-[#FF6B35]"
                        required
                      />
                      <input
                        type="text"
                        name="lastName"
                        value={form.lastName}
                        onChange={handleChange}
                        placeholder="Last Name *"
                        className="w-full p-3 bg-white border-0 rounded-xl text-slate-900 text-sm outline-none focus:ring-2 focus:ring-[#FF6B35]"
                        required
                      />
                    </div>

                    {/* Email & Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Email Address *"
                        className="w-full p-3 bg-white border-0 rounded-xl text-slate-900 text-sm outline-none focus:ring-2 focus:ring-[#FF6B35]"
                        required
                      />
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="Phone Number *"
                        className="w-full p-3 bg-white border-0 rounded-xl text-slate-900 text-sm outline-none focus:ring-2 focus:ring-[#FF6B35]"
                        required
                      />
                    </div>

                    {/* Message Area */}
                    <div>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        rows="3"
                        placeholder="Tell us your target location, budget, or university..."
                        className="w-full p-3 bg-white border-0 rounded-xl text-slate-900 text-sm outline-none focus:ring-2 focus:ring-[#FF6B35]"
                      ></textarea>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-[#FF6B35] hover:bg-[#e55a27] text-white font-bold py-3.5 rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-[#FF6B35]/20 disabled:opacity-50"
                    >
                      {loading ? (
                        "Sending..."
                      ) : (
                        <>
                          <span>Submit Request</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* --- Amenities Banner --- */}
        <section className="bg-[#121A28] py-12 border-y border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-playfair font-bold text-white">What’s Included in Our Rental Rooms</h3>
              <p className="text-slate-400 text-sm mt-1">Utility costs are 100% included in your single monthly rent payment.</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { icon: <Wifi className="w-6 h-6 text-[#FF6B35]" />, title: "High-Speed Wi-Fi" },
                { icon: <Zap className="w-6 h-6 text-[#FF6B35]" />, title: "All Utilities Included" },
                { icon: <Headphones className="w-6 h-6 text-[#FF6B35]" />, title: "24/7 Support" },
                { icon: <Utensils className="w-6 h-6 text-[#FF6B35]" />, title: "Equipped Kitchen" },
                { icon: <BedDouble className="w-6 h-6 text-[#FF6B35]" />, title: "Fully Furnished" },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center text-center p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition">
                  <div className="p-3 bg-white/5 rounded-full mb-3">{item.icon}</div>
                  <span className="font-semibold text-slate-200 text-sm">{item.title}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- Property Listings Directory --- */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-white mb-3">
              Available Student & Professional Housing
            </h2>
            <p className="text-slate-400">
              Browse rooms situated near major campuses and central transit routes.
            </p>

            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-2 mt-6">
              {["All", "Greenwich", "Colindale", "Cricklewood", "Hendon", "Eltham"].map((loc) => (
                <button
                  key={loc}
                  onClick={() => setActiveFilter(loc)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                    activeFilter === loc
                      ? "bg-[#FF6B35] text-white shadow-lg shadow-[#FF6B35]/20"
                      : "bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10"
                  }`}
                >
                  {loc}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((room) => (
              <div key={room.id} className="bg-[#1A2332] rounded-2xl border border-white/10 overflow-hidden shadow-lg hover:border-white/20 transition flex flex-col justify-between">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-xs font-bold bg-[#FF6B35]/10 text-[#FF6B35] border border-[#FF6B35]/20 px-3 py-1 rounded-full uppercase tracking-wider">
                      {room.zone}
                    </span>
                    <span className="text-xs font-mono text-slate-400">{room.postcode}</span>
                  </div>

                  <h3 className="text-xl font-playfair font-bold text-white mb-4">{room.title}</h3>

                  <ul className="space-y-2.5 mb-6">
                    {room.highlights.map((h, i) => (
                      <li key={i} className="text-xs md:text-sm text-slate-300 flex items-start gap-2.5">
                        <MapPin className="w-4 h-4 text-[#FF6B35] shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="px-6 pb-6 pt-0 border-t border-white/5 flex items-center gap-3">
                  <a
                    href="#contact-form"
                    className="flex-1 text-center bg-[#FF6B35] hover:bg-[#e55a27] text-white font-semibold py-2.5 rounded-xl text-sm transition"
                  >
                    Enquire Room
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- Student Life Value Props --- */}
        <section className="bg-[#121A28] py-16 border-y border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-playfair font-bold text-white mb-3">
                Rooms built around real student life
              </h2>
              <p className="text-slate-400">It's not just a room. It's how you live in London.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  num: "01",
                  title: "Start your day connected",
                  desc: "Quick walk to local stations or a short cycle to campus in Cricklewood, Colindale, Greenwich, or Eltham.",
                },
                {
                  num: "02",
                  title: "Settle in smoothly",
                  desc: "Moving to a new city is easier with local support. We help you find essential shops, routes, and community spots.",
                },
                {
                  num: "03",
                  title: "Space designed for focus",
                  desc: "Furnished private rooms made for study season, giving you peace and quiet when deadlines approach.",
                },
                {
                  num: "04",
                  title: "Your own private space",
                  desc: "Return to a room that’s genuinely yours after a long day — no shared bedrooms, no compromises.",
                },
              ].map((item) => (
                <div key={item.num} className="bg-[#1A2332] p-6 rounded-2xl border border-white/10">
                  <div className="text-[#FF6B35] font-mono text-2xl font-bold mb-3">{item.num}</div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- Direct Landlord Banner --- */}
        <section className="py-16 bg-[linear-gradient(102.2deg,#1A2332_0%,#243044_100%)]">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-playfair font-bold text-white mb-4">
              Book Direct with Landlords in London
            </h2>
            <p className="text-slate-300 leading-relaxed text-base md:text-lg mb-6 font-light">
              <strong className="text-white font-medium">The Morning Hours (UK) Ltd</strong> offers fully furnished rooms in Greenwich, Colindale, Eltham, Cricklewood, and Hendon. Enjoy flexible 1, 3, or 6-month leases with fixed deposits and direct landlord support.
            </p>
            <div className="inline-flex items-center gap-2 text-[#FF6B35] font-semibold bg-white/5 border border-white/10 px-4 py-2.5 rounded-xl shadow-sm">
              <Clock className="w-5 h-5 text-[#FF6B35]" />
              <span className="text-sm text-slate-200">Responses provided within 24 hours</span>
            </div>
          </div>
        </section>

        {/* --- FAQ Accordion Section --- */}
        <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-playfair font-bold text-white">Frequently Asked Questions</h2>
            <p className="text-slate-400 text-sm mt-1">Everything you need to know about renting with us</p>
          </div>

          <div className="space-y-4">
            {faqData.map((faq, idx) => (
              <div key={idx} className="bg-[#1A2332] rounded-2xl border border-white/10 overflow-hidden">
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left p-5 font-semibold text-slate-200 flex justify-between items-center gap-4 hover:bg-white/5 transition"
                >
                  <span>{faq.question}</span>
                  {openFaq === idx ? (
                    <ChevronUp className="w-5 h-5 text-[#FF6B35] shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                  )}
                </button>

                {openFaq === idx && (
                  <div className="px-5 pb-5 text-slate-400 text-sm leading-relaxed border-t border-white/5 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* --- Footer --- */}
        <footer className="bg-[#0A0F18] text-slate-400 py-12 border-t border-white/5 text-sm">
          <div className="max-w-7xl mx-auto px-4 text-center space-y-3">
            <p className="text-white font-semibold">The Morning Hours (UK) Ltd — Student Housing London</p>
            <p className="text-xs text-slate-400">Greenwich • Colindale • Eltham • Cricklewood • Hendon</p>
            <p className="text-xs text-slate-500">
              © {new Date().getFullYear()} All rights reserved. Direct Landlord Verified Accommodations.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}