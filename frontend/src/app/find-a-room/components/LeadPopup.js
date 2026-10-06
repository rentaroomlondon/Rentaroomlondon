"use client";

import React, { useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { isValidPhoneNumber, parsePhoneNumber } from "libphonenumber-js";

const LeadPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    location: "",
    email: "",
    roomType: "",
    monthlyBudget: "",
    website: "", // honeypot
  });
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState({ type: "", text: "" });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const setPhone = (phone) => {
    setFormData((prev) => ({ ...prev, phone }));
  };

  // ---------- Strong Name Validation ----------
  const isValidRealName = (name) => {
    if (!name || typeof name !== "string") return false;

    const cleaned = name.trim();

    // Basic checks
    if (cleaned.length < 2 || cleaned.length > 40) return false;
    if (!/^[a-zA-Z\s'-]+$/.test(cleaned)) return false;
    if (!/[a-zA-Z]/.test(cleaned)) return false;

    const lower = cleaned.toLowerCase();

    // Block spam / test / fake patterns
    const blockedPatterns = [
      // Test related (this was missing)
      "test", "testing", "tester", "testuser", "test1", "test2", "test3",
      "test87", "test123", "dummy", "fake", "sample", "example",

      // Keyboard spam
      "asdf", "qwer", "zxcv", "qwerty", "asdfgh", "zxcvbn",
      "qazwsx", "poiuyt", "hjkl", "uiop", "bnm","jksd","bfjhsd","dfghjkl","dfghjklm","dfghjklmn","dfghjklmno","dfghjklmnop","dfghjklmnopq","dfghjklmnopqr","dfghjklmnopqrs","dfghjklmnopqrst","dfghjklmnopqrstu","dfghjklmnopqrstuv","dfghjklmnopqrstuvw","dfghjklmnopqrstuvwx","dfghjklmnopqrstuvwxy","dfghjklmnopqrstuvwxyz",
      "jhdb", "hbds", "dsgh", "fghj", "cvbn", "tyui","ghh","thfd","bfgdi","dfghj","dfghjkl","dfghjklm","dfghjklmn","dfghjklmno","dfghjklmnop","dfghjklmnopq","dfghjklmnopqr","dfghjklmnopqrs","dfghjklmnopqrst","dfghjklmnopqrstu","dfghjklmnopqrstuv","dfghjklmnopqrstuvw","dfghjklmnopqrstuvwx","dfghjklmnopqrstuvwxy","dfghjklmnopqrstuvwxyz",
      "qwe", "asd", "zxc", "rty", "fgh", "vbn",

      // Generic fake
      "name", "fullname", "firstname", "lastname", "username", "user", "admin", "guest"
    ];

    if (blockedPatterns.some((pattern) => lower.includes(pattern))) {
      return false;
    }

    // Block pure repeated characters (aaaa, bbbb...)
    const lettersOnly = cleaned.replace(/[\s'-]/g, "");
    if (/^(.)\1+$/i.test(lettersOnly)) {
      return false;
    }

    // Block 5+ identical characters in a row
    if (/(.)\1{4,}/.test(cleaned)) {
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

  const validateForm = () => {
    // Honeypot check (bots fill this)
    if (formData.website) {
      return false; // silently fail
    }


    if (!isValidRealName(formData.name)) {
      setStatusMsg({ type: "error", text: "Please enter a valid full name" });
      return false;
    }

    if (isFakeOrInvalidPhone(formData.phone)) {
      setStatusMsg({ type: "error", text: "Please enter a complete and valid phone number" });
      return false;
    }

    if (!formData.location || formData.location.trim().length < 2) {
      setStatusMsg({ type: "error", text: "Please enter a preferred location" });
      return false;
    }

    const cleanEmail = formData.email.trim().toLowerCase();
    if (cleanEmail) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
      const localPart = cleanEmail.split("@")[0];
      const isSuspicious =
        localPart.length < 4 ||
        (localPart.match(/\./g) || []).length >= 2 ||
        localPart.includes("..") ||
        localPart.startsWith(".") ||
        localPart.endsWith(".") ||
        /^[0-9]+$/.test(localPart) ||
        /^(test|fake|dummy|sample|admin|user|guest|asdf|qwer)/.test(localPart);

      if (!emailRegex.test(cleanEmail) || isSuspicious) {
        setStatusMsg({ type: "error", text: "Please enter a valid email address" });
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMsg({ type: "", text: "" });

    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/leads/submit-lead`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          name: formData.name.trim(),
          location: formData.location.trim(),
          email: formData.email.trim().toLowerCase(),
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStatusMsg({ type: "success", text: "Thank you! We will find your room shortly." });

        setTimeout(() => {
          setIsOpen(false);

          setTimeout(() => {
            setFormData({ name: "", phone: "", location: "", email: "", roomType: "", monthlyBudget: "", website: "" });
            setStatusMsg({ type: "", text: "" });
          }, 300);
        }, 2000);
      } else {
        throw new Error(data.message || "Something went wrong");
      }
    } catch (error) {
      setStatusMsg({ type: "error", text: error.message || "Failed to submit. Try again." });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity animate-fadeIn">
      <div className="relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl border border-gray-100">
        <div className="h-2 bg-gradient-to-r from-blue-700 via-indigo-800 to-slate-900" />

        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-800 transition-colors"
          aria-label="Close modal"
        >
          ✕
        </button>

        <div className="p-6 sm:p-8">
          <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
            Search for your perfect room
          </h3>
          <p className="mt-2 text-sm text-gray-600">
            Leave your requirements and our London accommodation experts will scout matching properties for you completely free!
          </p>

          {statusMsg.text && (
            <div
              className={`mt-4 rounded-lg p-3 text-xs font-semibold ${
                statusMsg.type === "success"
                  ? "bg-green-50 text-green-700"
                  : "bg-red-50 text-red-700"
              }`}
            >
              {statusMsg.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-5 space-y-4" noValidate>
            {/* HONEYPOT - hidden from real users */}
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
                value={formData.website}
                onChange={handleChange}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                required
                disabled={loading || statusMsg.type === "success"}
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500">
                WhatsApp / Phone Number
              </label>
              <div className="mt-1 phone-input-wrapper-lead">
                <PhoneInput
                  country={"gb"}
                  value={formData.phone}
                  onChange={setPhone}
                  disabled={loading || statusMsg.type === "success"}
                  inputProps={{
                    name: "phone",
                    required: true,
                  }}
                  containerClass="w-full"
                  inputClass="!w-full !h-[42px] !pl-14 !pr-4 !rounded-lg !border !border-gray-300 !text-sm !text-gray-900 !outline-none focus:!border-indigo-600 focus:!ring-1 focus:!ring-indigo-600"
                  buttonClass="!bg-white !border !border-gray-300 !rounded-l-lg"
                  dropdownClass="!bg-white !border-gray-200 !text-black"
                  searchClass="!bg-gray-100 !text-black !border-gray-200"
                  enableSearch
                  disableSearchIcon
                  placeholder="+44 7123 456789"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500">
                Preferred Location / Zone
              </label>
              <input
                type="text"
                name="location"
                required
                disabled={loading || statusMsg.type === "success"}
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Camden, Canary Wharf, Zone 2"
                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500">
                Email (Optional)
              </label>
              <input
                type="email"
                name="email"
                autoComplete="email"
                disabled={loading || statusMsg.type === "success"}
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500">
                Room Type (Optional)
              </label>
              <select
                name="roomType"
                disabled={loading || statusMsg.type === "success"}
                value={formData.roomType}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all disabled:bg-gray-50 disabled:text-gray-500"
              >
                <option value="">Any room type</option>
                <option value="Single">Single</option>
                <option value="Double">Double</option>
                <option value="Ensuite">Ensuite</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500">
                Monthly Budget (Optional)
              </label>
              <select
                name="monthlyBudget"
                disabled={loading || statusMsg.type === "success"}
                value={formData.monthlyBudget}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all disabled:bg-gray-50 disabled:text-gray-500"
              >
                <option value="">Any budget</option>
                <option value="Under £600">Under £600</option>
                <option value="£600–£750">£600–£750</option>
                <option value="£750–£900">£750–£900</option>
                <option value="£900+">£900+</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading || statusMsg.type === "success"}
              className="mt-2 w-full rounded-lg bg-slate-900 py-3 text-sm font-semibold text-white transition-all hover:bg-slate-800 focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 active:scale-[0.99] disabled:bg-gray-400"
            >
              {loading
                ? "Submitting Request..."
                : statusMsg.type === "success"
                ? "Submitted!"
                : "Search for room"}
            </button>
          </form>
        </div>
      </div>

      <style jsx global>{`
        .phone-input-wrapper-lead .react-tel-input .form-control {
          width: 100% !important;
          height: 42px !important;
          border-radius: 0.5rem !important;
          border: 1px solid #d1d5db !important;
          font-size: 0.875rem !important;
          color: #111827 !important;
          padding-left: 52px !important;
          outline: none !important;
        }
        .phone-input-wrapper-lead .react-tel-input .form-control:focus {
          border-color: #4f46e5 !important;
          box-shadow: 0 0 0 1px #4f46e5 !important;
        }
        .phone-input-wrapper-lead .react-tel-input .flag-dropdown {
          background-color: white !important;
          border: 1px solid #d1d5db !important;
          border-radius: 0.5rem 0 0 0.5rem !important;
        }
        .phone-input-wrapper-lead .react-tel-input .flag-dropdown.open,
        .phone-input-wrapper-lead .react-tel-input .flag-dropdown:hover {
          background-color: #f9fafb !important;
        }
        .phone-input-wrapper-lead .react-tel-input .selected-flag {
          border-radius: 0.5rem 0 0 0.5rem !important;
        }
        .phone-input-wrapper-lead .react-tel-input .country-list {
          background-color: white !important;
          border: 1px solid #e5e7eb !important;
          color: black !important;
        }
        .phone-input-wrapper-lead .react-tel-input .country-list .country:hover,
        .phone-input-wrapper-lead .react-tel-input .country-list .country.highlight {
          background-color: #f3f4f6 !important;
        }
        .phone-input-wrapper-lead .react-tel-input .country-list .search {
          background-color: #f9fafb !important;
          color: black !important;
          border-color: #e5e7eb !important;
        }
      `}</style>
    </div>
  );
};

export default LeadPopup;
