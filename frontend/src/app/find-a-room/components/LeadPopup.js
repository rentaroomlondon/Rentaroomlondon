"use client";

import React, { useState, useEffect } from "react";

const LeadPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", location: "" });
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMsg({ type: "", text: "" });

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/leads/submit-lead`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setStatusMsg({ type: "success", text: "Thank you! We will find your room shortly." });
        
        // SMOOTH AUTO-CLOSE SEQUENCE
        setTimeout(() => {
          setIsOpen(false); // 1. Close the modal first after 2 seconds
          
          // 2. Clear out fields after it's hidden so the user doesn't see them flash blank
          setTimeout(() => {
            setFormData({ name: "", phone: "", location: "" });
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
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl border border-gray-100">
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
            Can't find the perfect room?
          </h3>
          <p className="mt-2 text-sm text-gray-600">
            Leave your requirements and our London accommodation experts will scout matching properties for you completely free!
          </p>

          {statusMsg.text && (
            <div className={`mt-4 rounded-lg p-3 text-xs font-semibold ${
              statusMsg.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
            }`}>
              {statusMsg.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
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
                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all disabled:bg-gray-50 disabled:text-gray-50"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500">WhatsApp / Phone Number</label>
              <input
                type="tel"
                name="phone"
                required
                disabled={loading || statusMsg.type === "success"}
                value={formData.phone}
                onChange={handleChange}
                placeholder="+44 7123 456789"
                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all disabled:bg-gray-50 disabled:text-gray-50"
              />
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
                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all disabled:bg-gray-50 disabled:text-gray-50"
              />
            </div>

            <button
              type="submit"
              disabled={loading || statusMsg.type === "success"}
              className="mt-2 w-full rounded-lg bg-slate-900 py-3 text-sm font-semibold text-white transition-all hover:bg-slate-800 focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 active:scale-[0.99] disabled:bg-gray-400"
            >
              {loading ? "Submitting Request..." : statusMsg.type === "success" ? "Submitted!" : "Find Me A Room"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LeadPopup;