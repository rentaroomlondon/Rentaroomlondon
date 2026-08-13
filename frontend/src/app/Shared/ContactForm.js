"use client";
import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { toast } from "react-toastify";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { isValidPhoneNumber, parsePhoneNumber } from "libphonenumber-js";

const ContactForm = ({
  title = "Get in Touch",
  subtitle = "Inquiry about rooms",
  redirectUrl = "/thank-you-rental-room-london",
  className = "",
}) => {
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

    if (!/^[a-zA-Z\s'-]{2,40}$/.test(cleaned)) return false;
    if (!/[aeiouAEIOU]/.test(cleaned)) return false;
    if (/[bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ]{4,}/.test(cleaned)) {
      return false;
    }
    if (/(.)\1{3,}/.test(cleaned)) return false;

    const fakePatterns = [
      "asdf", "qwer", "zxcv", "hjkl", "uiop", "bnm",
      "qwerty", "asdfgh", "zxcvbn", "qazwsx", "poiuyt",
      "jhdb", "hbds", "dsgh", "fghj", "cvbn", "tyui",
      "qwe", "asd", "zxc", "rty", "fgh", "vbn",
      "test", "testing", "tester", "testuser", "test1", "test2", "test3",
      "test87", "test123", "dummy", "fake", "sample", "example",
      "name", "fullname", "firstname", "lastname", "username", "user", "admin", "guest"
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

    if (!isValidPhoneNumber(fullPhone)) {
      return true;
    }

    try {
      const parsed = parsePhoneNumber(fullPhone);
      const nationalNumber = parsed.nationalNumber;

      const isSequential = (num) => {
        const seq = "01234567890123456789";
        const revSeq = "98765432109876543210";
        return seq.includes(num) || revSeq.includes(num);
      };

      const isRepeated = /^(\d)\1+$/.test(nationalNumber);

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

    if (!isValidRealName(firstName)) {
      toast.error("Please enter a valid first name");
      return false;
    }
    if (!isValidRealName(lastName)) {
      toast.error("Please enter a valid surname");
      return false;
    }

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

    if (isFakeOrInvalidPhone(phone)) {
      toast.error("Please enter a complete and valid phone number");
      return false;
    }

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
        toast.success("Message sent successfully");
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

        window.location.href = redirectUrl;
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
    <div className={`bg-white/5 backdrop-blur-sm border border-white/10 p-6 md:p-8 rounded-[32px] shadow-2xl ${className}`}>
      <div className="mb-6">
        <h2 className="text-white text-xl md:text-2xl font-playfair font-bold mb-2">
          {title}
        </h2>
        <p className="text-[#FFFFFFA6] text-sm">
          {subtitle}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
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
            minLength={2}
            maxLength={40}
          />
          <input
            type="text"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            placeholder="Surname *"
            className="w-full p-3 bg-white border-0 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#FF6B35]"
            required
            minLength={2}
            maxLength={40}
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

        {/* Phone with react-phone-input-2 */}
        <div className="relative phone-input-wrapper-hero">
          <PhoneInput
            country={"gb"}
            value={form.phone}
            onChange={(phone) => setDirectValue("phone", phone)}
            inputProps={{
              name: "phone",
              required: true,
            }}
            containerClass="w-full"
            inputClass="!w-full !h-[46px] !pl-14 !pr-4 !bg-white !border-0 !rounded-xl !text-sm !text-black !outline-none focus:!ring-2 focus:!ring-[#FF6B35]"
            buttonClass="!bg-white !border-0 !rounded-l-xl"
            dropdownClass="!bg-white !border-gray-200 !text-black"
            searchClass="!bg-gray-100 !text-black !border-gray-200"
            enableSearch
            disableSearchIcon
            placeholder="Phone No. *"
          />
        </div>

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
          {loading ? (
            "Sending..."
          ) : (
            <span className="flex items-center justify-center gap-2">
              Submit Inquiry <ArrowRight size={14} />
            </span>
          )}
        </button>
      </form>

      {/* Phone input styles */}
      <style jsx global>{`
        .phone-input-wrapper-hero .react-tel-input .form-control {
          background-color: white !important;
          border: 0 !important;
          border-radius: 0.75rem !important;
          color: black !important;
          height: 46px !important;
          font-size: 14px !important;
          padding-left: 52px !important;
        }
        .phone-input-wrapper-hero .react-tel-input .form-control:focus {
          box-shadow: 0 0 0 2px #ff6b35 !important;
          outline: none !important;
        }
        .phone-input-wrapper-hero .react-tel-input .flag-dropdown {
          background-color: white !important;
          border: 0 !important;
          border-radius: 0.75rem 0 0 0.75rem !important;
        }
        .phone-input-wrapper-hero .react-tel-input .flag-dropdown.open,
        .phone-input-wrapper-hero .react-tel-input .flag-dropdown:hover {
          background-color: #f3f4f6 !important;
        }
        .phone-input-wrapper-hero .react-tel-input .selected-flag {
          border-radius: 0.75rem 0 0 0.75rem !important;
        }
        .phone-input-wrapper-hero .react-tel-input .country-list {
          background-color: white !important;
          border: 1px solid #e5e7eb !important;
          color: black !important;
        }
        .phone-input-wrapper-hero .react-tel-input .country-list .country:hover,
        .phone-input-wrapper-hero .react-tel-input .country-list .country.highlight {
          background-color: #f3f4f6 !important;
        }
        .phone-input-wrapper-hero .react-tel-input .country-list .search {
          background-color: #f9fafb !important;
          color: black !important;
          border-color: #e5e7eb !important;
        }
      `}</style>
    </div>
  );
};

export default ContactForm;