"use client"
import { ArrowRight } from "lucide-react";
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
        toast.success("Message sent successfully");

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
    <section className="relative w-full overflow-hidden">
      
      {/* BACKGROUND - Fixed to follow content flow */}
      <div className="absolute inset-0 -z-10">
        <div className="h-full w-full flex flex-col lg:flex-row">
          {/* Top on mobile, Left on Desktop */}
          <div className="h-[50%] lg:h-full lg:flex-1 bg-[#1a2332]" />
          {/* Bottom on mobile, Right on Desktop */}
          <div className="h-[50%] lg:h-full lg:flex-1 bg-[#fff9f3]" />
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-[1440px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2">
        
        {/* LEFT SECTION (Office Info) */}
        <div className="text-white px-6 py-12 md:px-12 md:py-16 flex flex-col gap-8">
          
          <h2 className="text-[28px] md:text-4xl font-serif font-medium">
            Stepney Green Office
          </h2>

          <div className="space-y-8">
            <div>
              <p className="text-[11px] uppercase tracking-widest text-white/50 mb-2 font-bold">
                Address
              </p>
              <p className="text-[15px] text-gray-300 leading-relaxed">
                First Floor, 3–5 Globe Road <br />
                London, E1 4DT
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8">
              <div>
                <p className="text-[11px] uppercase tracking-widest text-white/80 mb-2 font-bold">
                  Phone
                </p>
                <p className="text-[15px] text-[#FF6B35] font-semibold">
                  020 7790 5577
                </p>
              </div>

              <div>
                <p className="text-[11px] uppercase tracking-widest text-white/80 mb-2 font-bold">
                  Email
                </p>
                <p className="text-[15px] text-[#FF6B35]">info@rentaroomlondon.co.uk</p>
              </div>
            </div>

            <div>
              <p className="text-[11px] uppercase tracking-widest text-gray-400 mb-3 font-bold">
                Opening Hours
              </p>
              <div className="grid grid-cols-2 gap-y-2 text-[15px] text-gray-300 max-w-[280px]">
                <span>Mon–Fri:</span>
                <span>10:00 – 6:00</span>
                <span>Saturday:</span>
                <span>11:00 – 5:00</span>
                <span>Sunday:</span>
                <span className="text-gray-500">Closed</span>
              </div>
            </div>
          </div>

          {/* MAP */}
          <div className="mt-4">
            <div className="w-full h-[220px] md:h-[350px] rounded-xl overflow-hidden border border-white/10">
              <iframe
                title="Office Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.6377353916!2d-0.0465!3d51.52!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTHCsDMxJzEyLjAiTiAwwrAwMiczNy40Ilc!5e0!3m2!1sen!2suk!4v1620000000000"
                className="w-full h-full border-0 grayscale opacity-80"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* RIGHT SECTION (Form) */}
        <div className="px-6 py-12 md:px-12 md:py-16 bg-[#fff9f3] lg:bg-transparent">
          
          <div className="max-w-xl mx-auto lg:mx-0 w-full">
            <h2 className="text-[24px] md:text-[32px] font-serif font-bold text-[#1a2332] mb-3">
              Get in Touch with Us
            </h2>

            <p className="text-gray-500 mb-10 text-[15px]">
              Fill out the form and we'll get back to you as soon as possible.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <select 
                  name="contactMethod"
                  value={form.contactMethod}
                  onChange={handleChange}
                  className="w-full p-4 bg-white border border-gray-200 rounded-lg focus:ring-1 focus:ring-orange-500 outline-none appearance-none cursor-pointer"
                >
                  <option>Call me</option>
                  <option>Email me</option>
                </select>

                <select 
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  className="w-full p-4 bg-white border border-gray-200 rounded-lg focus:ring-1 focus:ring-orange-500 outline-none appearance-none cursor-pointer"
                >
                  <option>Mr</option>
                  <option>Mrs</option>
                  <option>Ms</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <input
                  type="text"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  placeholder="First Name *"
                  className="w-full p-4 bg-white border border-gray-200 rounded-lg focus:border-orange-500 outline-none"
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  placeholder="Surname *"
                  className="w-full p-4 bg-white border border-gray-200 rounded-lg focus:border-orange-500 outline-none"
                  required
                />
              </div>

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="E-mail Address *"
                className="w-full p-4 bg-white border border-gray-200 rounded-lg focus:border-orange-500 outline-none"
                required
              />

              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone No. *"
                className="w-full p-4 bg-white border border-gray-200 rounded-lg focus:border-orange-500 outline-none"
                required
              />

              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={4}
                placeholder="How can we help you"
                className="w-full p-4 bg-white border border-gray-200 rounded-lg focus:border-orange-500 outline-none resize-none"
              />

              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-[#ff7a45] hover:bg-[#e66a3a] text-white font-bold py-5 rounded-lg uppercase tracking-widest text-xs transition-all shadow-lg shadow-orange-200/50"
              >
                {loading ? (
                  "Sending..."
                ) : (
                  <>
                    Submit Message
                    <ArrowRight size={14} className="inline-block ml-2" />
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