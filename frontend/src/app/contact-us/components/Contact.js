"use client";
import { ArrowRight, MessageSquare, PhoneCall } from "lucide-react";
import React, { useState } from "react";
import { toast } from "react-toastify";

const Contact = () => {
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

  // ✅ Handle input change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ Custom handler for click-based selectors (Contact Method / Title)
  const setDirectValue = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      if (data.success) {
        toast.success("Message sent successfully ✨");

        // Reset form
        setForm({
          contactMethod: "Call me",
          title: "Mr",
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          message: "",
        });
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server error ❌");
    }

    setLoading(false);
  };

  return (
    <section className="relative w-full bg-[#0B111E] py-16 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Decorative Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#FF6B35]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative z-10 items-center">
        
        {/* REDESIGNED LEFT SECTION */}
        <div className="lg:col-span-5 space-y-6 lg:pr-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FF6B35]/10 text-[#FF6B35] text-xs font-semibold uppercase tracking-wider rounded-full w-fit">
            🇬🇧 Direct Rental Platform
          </div>
          
          {/* New Requested Heading */}
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            Your Trusted Partner for 
            <span className="text-[#FF6B35]"> Room Rentals in London</span>
          </h2>
          
          {/* New Requested Text Content */}
          <div className="space-y-4 text-base md:text-lg text-gray-400 leading-relaxed">
            <p className="font-semibold text-gray-200">
              Looking for a room in London without paying unnecessary agency commissions?
            </p>
            <p>
              Our team helps you find quality rooms directly from landlords with transparent pricing. 
              Tell us what you're looking for, and we'll match you with available rooms that fit 
              your budget and location preferences.
            </p>
          </div>
          
          {/* New Requested Call-to-Action Button */}
          <div className="pt-4">
            <a 
              href="#cta-section" 
              className="inline-flex items-center gap-2 bg-[#FF6B35] hover:bg-[#e05621] text-white font-bold text-base px-8 py-4 rounded-xl shadow-lg shadow-[#FF6B35]/15 transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:ring-offset-2 focus:ring-offset-[#0B111E]"
            >
              Rent a Room
              <ArrowRight size={16} />
            </a>
          </div>
        </div>

        {/* RIGHT SECTION (Modern Form Suite) */}
        <div className="lg:col-span-7 bg-[#111827]/30 border border-gray-800/80 backdrop-blur-sm rounded-[32px] p-8 md:p-12 shadow-xl">
          <div className="max-w-2xl mx-auto lg:mx-0 w-full">
            <h3 className="text-[#FF6B35] font-bold text-xs uppercase tracking-[3px] mb-2">Connect Instantly</h3>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4 tracking-tight">
              Get in Touch with Us
            </h2>
            <p className="text-gray-400 mb-10 text-[15px] leading-relaxed">
              Fill out the details below and an accommodation manager will review your submission shortly.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Interaction Row: Contact Method Tab Control & Title Selector */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                {/* Custom Tab Selector for Contact Method */}
                <div className="md:col-span-8 bg-gray-900/90 p-1.5 rounded-xl border border-gray-800 flex gap-1">
                  <button
                    type="button"
                    onClick={() => setDirectValue("contactMethod", "Call me")}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 text-xs font-bold uppercase tracking-wider rounded-lg transition-all duration-200 ${
                      form.contactMethod === "Call me"
                        ? "bg-[#FF6B35] text-white shadow-md shadow-[#FF6B35]/20"
                        : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                    }`}
                  >
                    <PhoneCall size={14} />
                    Call me
                  </button>
                  <button
                    type="button"
                    onClick={() => setDirectValue("contactMethod", "Email me")}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 text-xs font-bold uppercase tracking-wider rounded-lg transition-all duration-200 ${
                      form.contactMethod === "Email me"
                        ? "bg-[#FF6B35] text-white shadow-md shadow-[#FF6B35]/20"
                        : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                    }`}
                  >
                    <MessageSquare size={14} />
                    Email me
                  </button>
                </div>

                {/* Title Segment selector */}
                <div className="md:col-span-4 bg-gray-900/90 p-1.5 rounded-xl border border-gray-800 flex gap-1">
                  {["Mr", "Mrs", "Ms"].map((titleOption) => (
                    <button
                      key={titleOption}
                      type="button"
                      onClick={() => setDirectValue("title", titleOption)}
                      className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                        form.title === titleOption
                          ? "bg-gray-800 text-white border border-gray-700"
                          : "text-gray-500 hover:text-gray-300"
                      }`}
                    >
                      {titleOption}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="relative">
                  <input
                    type="text"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    placeholder="First Name *"
                    className="w-full p-4 bg-gray-900/50 border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35]/30 outline-none transition-all"
                    required
                  />
                </div>
                <div className="relative">
                  <input
                    type="text"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    placeholder="Surname *"
                    className="w-full p-4 bg-gray-900/50 border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35]/30 outline-none transition-all"
                    required
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="E-mail Address *"
                  className="w-full p-4 bg-gray-900/50 border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35]/30 outline-none transition-all"
                  required
                />
              </div>

              {/* Phone Field */}
              <div className="relative">
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Phone Number *"
                  className="w-full p-4 bg-gray-900/50 border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35]/30 outline-none transition-all"
                  required
                />
              </div>

              {/* Message Field */}
              <div className="relative">
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="How can we help you?"
                  className="w-full p-4 bg-gray-900/50 border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35]/30 outline-none resize-none transition-all"
                />
              </div>

              {/* Submit Action Block */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#FF6B35] hover:bg-[#e05621] disabled:bg-gray-800 text-white font-bold py-4.5 rounded-xl uppercase tracking-widest text-xs transition-all duration-300 flex items-center justify-center gap-2 group shadow-lg shadow-[#FF6B35]/15 cursor-pointer"
              >
                {loading ? (
                  <span className="inline-block animate-pulse">Sending Inquiries...</span>
                ) : (
                  <>
                    Submit Message
                    <ArrowRight size={14} className="transform transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Contact;