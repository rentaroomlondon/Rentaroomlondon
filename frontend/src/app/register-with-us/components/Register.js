"use client"
import React from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Card from './Card';

const RegisterPage = () => {

  const [formData, setFormData] = useState({
    title: "Mr",
    firstName: "",
    surname: "",
    email: "",
    phone: "",
    password: "",
    budgetFrom: "",
    budgetTo: "",
    occupants: 1,
    roomType: "Any",
    needFromDate: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Registration failed");
      } else {
        toast.success(data.message || "Registration successful. Please verify your email.");
        setFormData({
          title: "Mr",
          firstName: "",
          surname: "",
          email: "",
          phone: "",
          password: "",
          budgetFrom: "",
          budgetTo: "",
          occupants: 1,
          roomType: "Any",
          needFromDate: "",
          notes: "",
        });
        window.location.href = "/login";
      }
    } catch (err) {
      toast.error("Something went wrong. Try again.");
      setError("Something went wrong. Try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const benefits = [
    { icon: "🏠", title: "Personalised Matches", desc: "Rooms matched to your budget, location and lifestyle" },
    { icon: "🔔", title: "Instant Alerts", desc: "Be first to know when new rooms become available" },
    { icon: "🤝", title: "Dedicated Consultant", desc: "A personal letting consultant guides you through the process" },
    { icon: "✅", title: "No Fees", desc: "Registering is completely free for tenants" },
  ];

  return (
    <div className="flex flex-col lg:flex-row font-sans bg-[#FDF7F2]">
      {/* LEFT SECTION - UPDATED TO 50% */}
      <div className="w-full lg:w-1/2 bg-[#1A1F2C] p-6 md:p-12 text-white relative overflow-hidden flex flex-col">
        {/* Decorative Circle with Gradient */}
        <div 
          className="absolute top-[-10] right-[-10%] w-64 h-64 rounded-full"
          style={{
            background: "linear-gradient(234.79deg, rgba(244, 124, 60, 0.1) 34.72%, rgba(142, 72, 35, 0.1) 83.57%)"
          }}
        ></div>
        
        <div className="max-w-2xl mx-auto w-full">
          <h1 className="text-4xl lg:text-[40px] font-playfair font-bold mb-6">
            Find Your <span className="text-orange-500 font-serif italic">Perfect</span> Room in London
          </h1>
          <p className="text-[#FFFFFF99] mb-12 text-[15px] font-sans">
            Take a few moments to supply some information. This helps us match your requirements much closer and send you relevant rooms as they come available.
          </p>

          <div className="space-y-8 mb-16">
            {benefits.map((item, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="bg-[#F47C3C] p-2 rounded-lg h-fit">{item.icon}</div>
                <div>
                  <h4 className="font-bold text-[14px] font-sans leading-none mb-1">{item.title}</h4>
                  <p className="text-[#FFFFFF80] text-[13px]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Featured Rooms Grid */}
          <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
            <h5 className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-6">
              Featured Available Rooms
            </h5>

            <Card />
          </div>
        </div>
      </div>

      {/* RIGHT SECTION - UPDATED TO 50% */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
        <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl p-8 lg:p-12">
          <h2 className="text-[24px] font-bold text-[#1A2332] mb-2">Register with Us</h2>
          <p className="text-[#6B7280] text-sm mb-8">
            Items marked with * are required. <a href="tel:02077905577" className="text-orange-500 underline underline-offset-4">Call us on 020 7790 5577</a> if you need help.
          </p>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] lg:text-[12px] font-bold text-[#6B7280] font-sans uppercase">Title</label>
                <select 
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-50 border border-gray-100 lg:bg-white lg:border-[#E8E4DF] rounded-xl outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm"
                >
                  <option>Mr</option>
                  <option>Mrs</option>
                  <option>Ms</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] lg:text-[12px] font-bold text-[#6B7280] font-sans uppercase">First Name *</label>
                <input 
                  type="text" 
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-50 border border-gray-100 lg:bg-white lg:border-[#E8E4DF] rounded-xl outline-none focus:ring-2 focus:ring-orange-500/20 text-sm" 
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] lg:text-[12px] font-bold text-[#6B7280] font-sans uppercase">Surname *</label>
                <input 
                  type="text" 
                  name="surname"
                  value={formData.surname}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-50 border border-gray-100 lg:bg-white lg:border-[#E8E4DF] rounded-xl outline-none focus:ring-2 focus:ring-orange-500/20 text-sm" 
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] lg:text-[12px] font-bold text-[#6B7280] font-sans uppercase">E-mail Address *</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-50 border border-gray-100 lg:bg-white lg:border-[#E8E4DF] rounded-xl outline-none focus:ring-2 focus:ring-orange-500/20 text-sm" 
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] lg:text-[12px] font-bold text-[#6B7280] font-sans uppercase">Phone No. *</label>
              <input 
                type="tel" 
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-3 bg-gray-50 border border-gray-100 lg:bg-white lg:border-[#E8E4DF] rounded-xl outline-none focus:ring-2 focus:ring-orange-500/20 text-sm" 
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] lg:text-[12px] font-bold text-[#6B7280] font-sans uppercase">
              Password *
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 bg-gray-50 border border-gray-100 lg:bg-white lg:border-[#E8E4DF] rounded-xl outline-none focus:ring-2 focus:ring-orange-500/20 text-sm"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] lg:text-[12px] font-bold text-[#6B7280] font-sans uppercase">Budget From</label>
                <input 
                  type="number" 
                  placeholder="No Minimum" 
                  name="budgetFrom"
                  min={0}
                  value={formData.budgetFrom}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-50 border border-gray-100 lg:bg-white lg:border-[#E8E4DF] rounded-xl outline-none text-sm" 
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] lg:text-[12px] font-bold text-[#6B7280] font-sans uppercase">Budget To</label>
                <input 
                  type="number" 
                  placeholder="No Maximum" 
                  name="budgetTo"
                  min={0}
                  value={formData.budgetTo}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-50 border border-gray-100 lg:bg-white lg:border-[#E8E4DF] rounded-xl outline-none text-sm" 
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] lg:text-[12px] font-bold text-[#6B7280] font-sans uppercase">Number of Occupants</label>
                <input 
                  type="number" 
                  name="occupants"
                  value={formData.occupants}
                  min={1}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-50 border border-gray-100 lg:bg-white lg:border-[#E8E4DF] rounded-xl outline-none text-sm" 
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] lg:text-[12px] font-bold text-[#6B7280] font-sans uppercase">Type of Room</label>
                <select 
                  name="roomType"
                  value={formData.roomType}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-50 border border-gray-100 lg:bg-white lg:border-[#E8E4DF] rounded-xl outline-none text-sm"
                >
                  <option>Any</option>
                  <option>Studio</option>
                  <option>Single Room</option>
                  <option>Double Room</option>
                  <option>Ensuit Room</option>
                  <option>1 Bedroom</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] lg:text-[12px] font-bold text-[#6B7280] font-sans uppercase">Need From Date</label>
              <input 
                type="date" 
                name="needFromDate"
                value={formData.needFromDate}
                onChange={handleChange}
                className="w-full p-3 bg-gray-50 border border-gray-100 lg:bg-white lg:border-[#E8E4DF] rounded-xl outline-none text-gray-400 text-sm" 
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] lg:text-[12px] font-bold text-[#6B7280] font-sans uppercase">Additional Notes / Comments</label>
              <textarea 
                name="notes"
                rows="3"
                value={formData.notes}
                onChange={handleChange}
                className="w-full p-3 bg-gray-50 border border-gray-100 lg:bg-white lg:border-[#E8E4DF] rounded-xl outline-none text-sm"
              ></textarea>
            </div>

            <div className="text-center space-y-4 pt-2">
              <p className="text-[10px] lg:text-[12px] text-gray-400 leading-relaxed">
                Please read our <a href="/privacy-policy" className="text-orange-500 underline">Privacy Statement</a>.You only need to click once — a confirmation page will be shown when complete.
              </p>
              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-[#F27C4B] hover:bg-[#E06B3A] text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-orange-500/20 uppercase tracking-widest text-xs flex items-center justify-center gap-2 ${
                  loading ? "cursor-not-allowed opacity-70" : "group"
                }`}
              >
                {loading ? (
                  // Spinner inside the button
                  <div className="flex items-center justify-center gap-2">
                    <span>Submitting...</span>
                  </div>
                ) : (
                  <>
                    Submit
                    <span className="transition-transform group-hover:translate-x-1">
                      <svg 
                        width="14" 
                        height="14" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="3" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        className="ml-1"
                      >
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;