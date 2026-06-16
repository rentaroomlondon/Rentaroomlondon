"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { toast } from "react-toastify";

const HeroSection = () => {
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

  // ✅ Handle submit logic
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

        // Native browser redirect
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

  return (
    <section className="relative w-full min-h-[600px] flex items-center overflow-hidden px-5 py-16 lg:py-24 bg-[#1A2332] md:bg-[linear-gradient(102.2deg,#1A2332_0%,#243044_100%)]">
      
      {/* Decorative Background Elements */}
      <div className="hidden lg:block absolute inset-0 z-0 pointer-events-none">
        <div className="absolute right-[-5vw] top-1/2 -translate-y-1/2 w-[45vw] h-[45vw] rounded-full bg-[#FF6B350D]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* LEFT COLUMN: Hero Content */}
          <div className="max-w-2xl">
            <nav className="flex items-center space-x-2 mb-6 text-[13px] md:text-[14px] font-sans">
              <Link href="/" className="text-[#FFFFFFA6] hover:text-[#FF6B35] transition-colors">
                Home
              </Link>
              <span className="text-[#FFFFFFA6]">/</span>
              <span className="text-white font-medium">Rental Rooms in West Hampstead</span>
            </nav>
            

            <h1 className="text-white mb-6 font-playfair text-[36px] leading-[1.1] md:text-[60px] font-bold">
              Rental an Affordable Rooms in{" "}
              <span className="text-[#FF6B35] italic font-playfair">
                West Hampstead, London
              </span>{" "}
            </h1>

            <p className="text-[#FFFFFFA6] font-sans font-light text-[16px] leading-7 md:text-[18px] mb-8">
              Whether you're searching for student accommodation near campus or you're a landlord looking to fill vacant rooms with trusted tenants, we make the rental process simple, fast, and reliable — helping people find the right property in West Hampstead 
              <span className="text-white font-medium"> with ease.</span>
            </p>

            
          </div>

          {/* RIGHT COLUMN: Contact Form */}
          <div className="relative">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 md:p-8 rounded-[32px] shadow-2xl">
              <div className="mb-6">
                <h2 className="text-white text-xl md:text-2xl font-playfair font-bold mb-2">
                  Get in Touch
                </h2>
                <p className="text-[#FFFFFFA6] text-sm">
                  Inquiry about rooms in West Hampstead
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    placeholder="First Name *"
                    className="w-full p-3 bg-white border-0 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#FF6B35]"
                    required
                  />
                  <input
                    type="text"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    placeholder="Surname *"
                    className="w-full p-3 bg-white border-0 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#FF6B35]"
                    required
                  />
                </div>

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="E-mail Address *"
                  className="w-full p-3 bg-white border-0 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#FF6B35]"
                  required
                />

                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Phone No. *"
                  className="w-full p-3 bg-white border-0 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#FF6B35]"
                  required
                />

                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={3}
                  placeholder="How can we help you?"
                  className="w-full p-3 bg-white border-0 rounded-xl text-sm outline-none resize-none focus:ring-2 focus:ring-[#FF6B35]"
                />

                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#FF6B35] hover:bg-[#e65a25] text-white font-bold py-4 rounded-xl uppercase tracking-widest text-[11px] transition-all shadow-lg shadow-[#FF6B3533]"
                >
                  {loading ? "Sending..." : (
                    <span className="flex items-center justify-center gap-2">
                      Submit Inquiry <ArrowRight size={14} />
                    </span>
                  )}
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>

      {/* Decorative Mobile Circle */}
      <div className="md:hidden absolute -right-20 -bottom-20 w-80 h-80 bg-[#FF6B350D] rounded-full pointer-events-none" />
    </section>
  );
};

export default HeroSection;