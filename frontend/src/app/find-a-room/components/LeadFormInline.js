"use client";

import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { isValidPhoneNumber, parsePhoneNumber } from "libphonenumber-js";

export default function LeadFormInline() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    location: "",
    website: "", // honeypot
  });
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState({ type: "", text: "" });

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
    if (cleaned.length < 2 || cleaned.length > 40) return false;
    if (!/^[a-zA-Z\s'-]+$/.test(cleaned)) return false;
    if (!/[a-zA-Z]/.test(cleaned)) return false;

    const lower = cleaned.toLowerCase();
    const blockedPatterns = [
      "test", "testing", "tester", "testuser", "test1", "test2", "test3",
      "test87", "test123", "dummy", "fake", "sample", "example",
      "asdf", "qwer", "zxcv", "qwerty", "asdfgh", "zxcvbn",
      "qazwsx", "poiuyt", "hjkl", "uiop", "bnm", "jksd", "bfjhsd",
      "dfghjkl", "qwe", "asd", "zxc", "rty", "fgh", "vbn",
      "name", "fullname", "firstname", "lastname", "username", "user", "admin", "guest"
    ];
    if (blockedPatterns.some((pattern) => lower.includes(pattern))) return false;

    const lettersOnly = cleaned.replace(/[\s'-]/g, "");
    if (/^(.)\1+$/i.test(lettersOnly)) return false;
    if (/(.)\1{4,}/.test(cleaned)) return false;

    return true;
  };

  // ---------- Strong Phone Validation ----------
  const isFakeOrInvalidPhone = (phone) => {
    if (!phone) return true;
    const fullPhone = phone.startsWith("+") ? phone : `+${phone.replace(/\D/g, "")}`;
    if (!isValidPhoneNumber(fullPhone)) return true;

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
        "123456789", "1234567890", "0123456789", "987654321", "9876543210",
        "111111111", "222222222", "999999999", "000000000", "555555555",
      ];

      if (isSequential(nationalNumber) || isRepeated || fakePatterns.some((fake) => nationalNumber.includes(fake))) {
        return true;
      }
      return false;
    } catch {
      return true;
    }
  };

  const validateForm = () => {
    if (formData.website) return false; // honeypot

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
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (data.success) {
        setStatusMsg({ type: "success", text: "Thank you! We will find your room shortly." });
        setTimeout(() => {
          setFormData({ name: "", phone: "", location: "", website: "" });
          setStatusMsg({ type: "", text: "" });
        }, 2500);
      } else {
        throw new Error(data.message || "Something went wrong");
      }
    } catch (error) {
      setStatusMsg({ type: "error", text: error.message || "Failed to submit. Try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 sm:p-8">
      {statusMsg.text && (
        <div
          className={`mb-5 rounded-lg p-3 text-sm font-medium ${
            statusMsg.type === "success"
              ? "bg-green-50 text-green-700"
              : "bg-red-50 text-red-700"
          }`}
        >
          {statusMsg.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {/* Honeypot */}
        <div style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0, overflow: "hidden" }} aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input type="text" id="website" name="website" value={formData.website} onChange={handleChange} tabIndex={-1} autoComplete="off" />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500">Full Name</label>
          <input
            type="text"
            name="name"
            required
            disabled={loading || statusMsg.type === "success"}
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-[#FF7A45] focus:ring-1 focus:ring-[#FF7A45] disabled:bg-gray-50"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500">WhatsApp / Phone Number</label>
          <div className="mt-1 phone-input-wrapper-lead">
            <PhoneInput
              country={"gb"}
              value={formData.phone}
              onChange={setPhone}
              disabled={loading || statusMsg.type === "success"}
              inputProps={{ name: "phone", required: true }}
              containerClass="w-full"
              inputClass="!w-full !h-[42px] !pl-14 !pr-4 !rounded-lg !border !border-gray-300 !text-sm !outline-none focus:!border-[#FF7A45] focus:!ring-1 focus:!ring-[#FF7A45]"
              buttonClass="!bg-white !border !border-gray-300 !rounded-l-lg"
              enableSearch
              disableSearchIcon
              placeholder="+44 7123 456789"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500">Preferred Location / Zone</label>
          <input
            type="text"
            name="location"
            required
            disabled={loading || statusMsg.type === "success"}
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g. Camden, Canary Wharf, Zone 2"
            className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-[#FF7A45] focus:ring-1 focus:ring-[#FF7A45] disabled:bg-gray-50"
          />
        </div>

        <button
          type="submit"
          disabled={loading || statusMsg.type === "success"}
          className="w-full rounded-lg bg-[#FF7A45] hover:bg-[#e66a35] py-3 text-sm font-semibold text-white transition disabled:bg-gray-400"
        >
          {loading ? "Submitting..." : statusMsg.type === "success" ? "Submitted!" : "Get room updates"}
        </button>
      </form>

      <style jsx global>{`
        .phone-input-wrapper-lead .react-tel-input .form-control {
          width: 100% !important;
          height: 42px !important;
          border-radius: 0.5rem !important;
          border: 1px solid #d1d5db !important;
          font-size: 0.875rem !important;
          padding-left: 52px !important;
        }
        .phone-input-wrapper-lead .react-tel-input .form-control:focus {
          border-color: #FF7A45 !important;
          box-shadow: 0 0 0 1px #FF7A45 !important;
        }
        .phone-input-wrapper-lead .react-tel-input .flag-dropdown {
          background-color: white !important;
          border: 1px solid #d1d5db !important;
          border-radius: 0.5rem 0 0 0.5rem !important;
        }
      `}</style>
    </div>
  );
} 