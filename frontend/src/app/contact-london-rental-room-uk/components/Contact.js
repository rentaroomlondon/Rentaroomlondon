"use client";
import { ArrowRight, MessageSquare, PhoneCall } from "lucide-react";
import React, { useState } from "react";
import { toast } from "react-toastify";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { isValidPhoneNumber, parsePhoneNumber } from "libphonenumber-js";

const Contact = () => {
  const [form, setForm] = useState({
    contactMethod: "Call me",
    title: "Mr",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
    website: "", // honeypot
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const setDirectValue = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // ---------- Strong Name Validation ----------
  const isValidRealName = (name) => {
    if (!name || typeof name !== "string") return false;

    const cleaned = name.trim();

    // 1. Basic format (letters, space, ' and - only) + min 2 chars
    if (!/^[a-zA-Z\s'-]{2,40}$/.test(cleaned)) return false;

    // 2. Must contain at least one vowel
    if (!/[aeiouAEIOU]/.test(cleaned)) return false;

    // 3. Reject 4 or more consecutive consonants
    if (/[bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ]{4,}/.test(cleaned)) {
      return false;
    }

    // 4. Reject repeated characters (aaaa, bbbb, etc.)
    if (/(.)\1{3,}/.test(cleaned)) return false;

    // 5. Reject common keyboard smash / random patterns
    const fakePatterns = [
      "asdf", "qwer", "zxcv", "hjkl", "uiop", "bnm",
      "qwerty", "asdfgh", "zxcvbn", "qazwsx", "poiuyt",
      "jhdb", "hbds", "dsgh", "fghj", "cvbn", "tyui",
      "qwe", "asd", "zxc", "rty", "fgh", "vbn"
    ];

    const lowerName = cleaned.toLowerCase();
    if (fakePatterns.some((pattern) => lowerName.includes(pattern))) {
      return false;
    }

    return true;
  };

  // ---------- Strong Phone Validation ----------
  const isFakeOrInvalidPhone = (phone) => {
    if (!phone) return true;

    const fullPhone = phone.startsWith("+") ? phone : `+${phone.replace(/\D/g, "")}`;

    // 1. Must be valid according to country rules
    if (!isValidPhoneNumber(fullPhone)) {
      return true;
    }

    try {
      const parsed = parsePhoneNumber(fullPhone);
      const nationalNumber = parsed.nationalNumber;

      // 2. Block sequential numbers
      const isSequential = (num) => {
        const seq = "01234567890123456789";
        const revSeq = "98765432109876543210";
        return seq.includes(num) || revSeq.includes(num);
      };

      // 3. Block repeated digits
      const isRepeated = /^(\d)\1+$/.test(nationalNumber);

      // 4. Block common fake patterns
      const fakePatterns = [
        "123456789",
        "1234567890",
        "0123456789",
        "987654321",
        "9876543210",
        "111111111",
        "222222222",
        "999999999",
        "000000000",
        "555555555",
      ];

      if (
        isSequential(nationalNumber) ||
        isRepeated ||
        fakePatterns.some((fake) => nationalNumber.includes(fake))
      ) {
        return true;
      }

      return false;
    } catch (err) {
      return true;
    }
  };

  // ---------- Client-side validation ----------
  const validateForm = () => {
    const { firstName, lastName, email, phone, message } = form;

    // Name checks (Strong)
    if (!isValidRealName(firstName)) {
      toast.error("Please enter a valid first name");
      return false;
    }
    if (!isValidRealName(lastName)) {
      toast.error("Please enter a valid surname");
      return false;
    }

    // Email spam pattern
    const local = email.split("@")[0] || "";
    const dotCount = (local.match(/\./g) || []).length;
    if (
      dotCount >= 3 ||
      local.includes("..") ||
      local.startsWith(".") ||
      local.endsWith(".")
    ) {
      toast.error("Please enter a valid email address");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(email.trim())) {
      toast.error("Please enter a valid email address");
      return false;
    }

    // Strong Phone validation
    if (isFakeOrInvalidPhone(phone)) {
      toast.error("Please enter a complete and valid phone number");
      return false;
    }

    // Message spam
    if (
      message &&
      message.trim().length > 10 &&
      !/\s/.test(message.trim()) &&
      /^[a-zA-Z0-9]+$/.test(message.trim())
    ) {
      toast.error("Please enter a proper message");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

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
        toast.success("Message sent successfully ✨");

        setForm({
          contactMethod: "Call me",
          title: "Mr",
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          message: "",
          website: "",
        });

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
    <section className="relative w-full bg-[#0B111E] py-16 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#FF6B35]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative z-10 items-center">
        {/* LEFT SECTION */}
        <div className="lg:col-span-5 space-y-6 lg:pr-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FF6B35]/10 text-[#FF6B35] text-xs font-semibold uppercase tracking-wider rounded-full w-fit">
            🇬🇧 Direct Rental Platform
          </div>

          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            Your Trusted Partner for
            <span className="text-[#FF6B35]"> Room Rentals in London</span>
          </h2>

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

        {/* RIGHT SECTION - FORM */}
        <div className="lg:col-span-7 bg-[#111827]/30 border border-gray-800/80 backdrop-blur-sm rounded-[32px] p-8 md:p-12 shadow-xl">
          <div className="max-w-2xl mx-auto lg:mx-0 w-full">
            <h3 className="text-[#FF6B35] font-bold text-xs uppercase tracking-[3px] mb-2">
              Connect Instantly
            </h3>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4 tracking-tight">
              Get in Touch with Us
            </h2>
            <p className="text-gray-400 mb-10 text-[15px] leading-relaxed">
              Fill out the details below and an accommodation manager will review your submission shortly.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              {/* HONEYPOT */}
              <div
                style={{
                  position: "absolute",
                  left: "-9999px",
                  opacity: 0,
                  height: 0,
                  overflow: "hidden",
                }}
                aria-hidden="true"
              >
                <label htmlFor="website">Website</label>
                <input
                  type="text"
                  id="website"
                  name="website"
                  value={form.website}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {/* Contact Method + Title */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
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

              {/* Names */}
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
                    minLength={2}
                    maxLength={40}
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
                    minLength={2}
                    maxLength={40}
                  />
                </div>
              </div>

              {/* Email */}
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

              {/* Phone */}
              <div className="relative phone-input-wrapper">
                <PhoneInput
                  country={"gb"}
                  value={form.phone}
                  onChange={(phone) => setDirectValue("phone", phone)}
                  inputProps={{
                    name: "phone",
                    required: true,
                  }}
                  containerClass="w-full"
                  inputClass="!w-full !h-[58px] !pl-14 !pr-4 !bg-gray-900/50 !border !border-gray-800 !rounded-xl !text-white !placeholder-gray-500 focus:!border-[#FF6B35] focus:!ring-1 focus:!ring-[#FF6B35]/30 !outline-none !transition-all"
                  buttonClass="!bg-gray-900/50 !border !border-gray-800 !rounded-l-xl !hover:bg-gray-800"
                  dropdownClass="!bg-gray-900 !border-gray-700 !text-white"
                  searchClass="!bg-gray-800 !text-white !border-gray-700"
                  enableSearch
                  disableSearchIcon
                  placeholder="Phone Number *"
                />
              </div>

              {/* Message */}
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

              {/* Submit */}
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
                    <ArrowRight
                      size={14}
                      className="transform transition-transform group-hover:translate-x-1"
                    />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Custom styles */}
      <style jsx global>{`
        .phone-input-wrapper .react-tel-input .form-control {
          background-color: rgba(17, 24, 39, 0.5) !important;
          border: 1px solid #1f2937 !important;
          border-radius: 0.75rem !important;
          color: white !important;
          height: 58px !important;
          font-size: 16px !important;
          padding-left: 58px !important;
        }
        .phone-input-wrapper .react-tel-input .form-control:focus {
          border-color: #ff6b35 !important;
          box-shadow: 0 0 0 1px rgba(255, 107, 53, 0.3) !important;
          outline: none !important;
        }
        .phone-input-wrapper .react-tel-input .flag-dropdown {
          background-color: rgba(17, 24, 39, 0.5) !important;
          border: 1px solid #1f2937 !important;
          border-radius: 0.75rem 0 0 0.75rem !important;
        }
        .phone-input-wrapper .react-tel-input .flag-dropdown.open,
        .phone-input-wrapper .react-tel-input .flag-dropdown:hover {
          background-color: rgba(31, 41, 55, 0.8) !important;
        }
        .phone-input-wrapper .react-tel-input .selected-flag {
          border-radius: 0.75rem 0 0 0.75rem !important;
        }
        .phone-input-wrapper .react-tel-input .country-list {
          background-color: #111827 !important;
          border: 1px solid #374151 !important;
          color: white !important;
        }
        .phone-input-wrapper .react-tel-input .country-list .country:hover,
        .phone-input-wrapper .react-tel-input .country-list .country.highlight {
          background-color: #1f2937 !important;
        }
        .phone-input-wrapper .react-tel-input .country-list .search {
          background-color: #1f2937 !important;
          color: white !important;
          border-color: #374151 !important;
        }
      `}</style>
    </section>
  );
};

export default Contact;