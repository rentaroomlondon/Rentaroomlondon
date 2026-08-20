"use client"
import React, { useState, useEffect, useRef } from "react";

const FloatingActions = () => {
  const PHONE_NUMBER = "+447419990126";
  const WHATSAPP_MESSAGE = encodeURIComponent(
    "Hello! I am interested in booking a room."
  );

  const whatsappUrl = `https://wa.me/${PHONE_NUMBER}?text=${WHATSAPP_MESSAGE}`;
  const callUrl = `tel:${PHONE_NUMBER}`;

  const [isMobile, setIsMobile] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const modalRef = useRef(null);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        ) || window.innerWidth <= 768;

      setIsMobile(isMobileDevice);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Close modal when clicking outside
  useEffect(() => {
    if (!showModal) return;

    const handleClickOutside = (e) => {
      // Important: only close if click is outside the modal
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setShowModal(false);
      }
    };

    // Delay adding the listener so the opening click doesn't close it
    const timer = setTimeout(() => {
      document.addEventListener("mousedown", handleClickOutside);
    }, 10);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showModal]);

  const handleCallClick = (e) => {
    if (!isMobile) {
      e.preventDefault();
      e.stopPropagation(); // very important
      setShowModal(true);
    }
    // On mobile → normal tel: behavior
  };

  const copyNumber = () => {
    navigator.clipboard.writeText(PHONE_NUMBER).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <>
      {/* Floating Buttons */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3 items-center">
        
        {/* Call Button */}
        <a
          href={callUrl}
          onClick={handleCallClick}
          className="w-12 h-12 flex items-center justify-center bg-[#F47C3C] text-white rounded-full shadow-lg hover:bg-[#e06b2b] active:scale-95 transition-transform group"
          aria-label="Call Us"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 group-hover:scale-110 transition-transform"
          >
            <path d="M19.95 21a17.89 17.89 0 01-7.108-2.708 17.618 17.618 0 01-5.14-5.14A17.89 17.89 0 015 6.05 1.05 1.05 0 016.05 5h3.18a1 1 0 01.99.858c.148.895.421 1.764.814 2.585a1 1 0 01-.225 1.13l-1.63 1.63a13.916 13.916 0 005.14 5.14l1.63-1.63a1 1 0 011.13-.225c.82.393 1.69.666 2.585.814A1 1 0 0120 14.77v3.18a1.05 1.05 0 01-1.05 1.05z" />
          </svg>
        </a>

        {/* WhatsApp Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 flex items-center justify-center bg-[#25D366] text-white rounded-full shadow-lg hover:bg-[#20ba56] active:scale-95 transition-transform group"
          aria-label="Contact us on WhatsApp"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            fill="currentColor"
            className="w-7 h-7 group-hover:scale-110 transition-transform"
          >
            <path d="M19.11 17.205c-.372-.186-1.1-.543-1.27-.605-.17-.062-.294-.093-.418.093-.124.186-.48.605-.588.729-.108.124-.217.14-.403.047-.186-.093-.785-.289-1.495-.923-.552-.492-.923-1.1-1.03-1.286-.108-.186-.012-.287.081-.38.084-.083.186-.217.279-.326.093-.108.124-.186.186-.31.062-.124.031-.233-.015-.326-.046-.093-.418-1.008-.573-1.38-.149-.357-.3-.31-.418-.316l-.357-.006c-.124 0-.326.046-.496.233-.17.186-.65.636-.65 1.55 0 .915.666 1.798.76 1.922.093.124 1.31 2 3.176 2.805.444.192.79.306 1.06.392.445.142.85.122 1.17.074.357-.053 1.1-.45 1.255-.884.155-.434.155-.806.108-.884-.046-.077-.17-.124-.356-.217z" />
            <path d="M16.003 3C8.82 3 3 8.82 3 16c0 2.54.74 5.02 2.14 7.15L3 29l5.99-2.11A12.93 12.93 0 0 0 16.003 29C23.18 29 29 23.18 29 16S23.18 3 16.003 3zm0 23.67c-2.17 0-4.29-.58-6.15-1.69l-.44-.26-3.56 1.25 1.19-3.47-.29-.45A10.63 10.63 0 0 1 5.33 16c0-5.88 4.79-10.67 10.67-10.67S26.67 10.12 26.67 16 21.88 26.67 16.003 26.67z" />
          </svg>
        </a>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div
            ref={modalRef}
            className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full mx-4 relative"
          >
            {/* Close button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl leading-none"
            >
              ×
            </button>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#F47C3C]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#F47C3C"
                  className="w-8 h-8"
                >
                  <path d="M19.95 21a17.89 17.89 0 01-7.108-2.708 17.618 17.618 0 01-5.14-5.14A17.89 17.89 0 015 6.05 1.05 1.05 0 016.05 5h3.18a1 1 0 01.99.858c.148.895.421 1.764.814 2.585a1 1 0 01-.225 1.13l-1.63 1.63a13.916 13.916 0 005.14 5.14l1.63-1.63a1 1 0 011.13-.225c.82.393 1.69.666 2.585.814A1 1 0 0120 14.77v3.18a1.05 1.05 0 01-1.05 1.05z" />
                </svg>
              </div>

              <h3 className="text-xl font-semibold text-gray-800 mb-1">Call Us</h3>
              <p className="text-gray-500 text-sm mb-6">We are available 24/7</p>

              <div className="bg-gray-50 rounded-xl py-4 px-6 mb-6">
                <p className="text-2xl font-bold text-gray-800 tracking-wide select-all">
                  {PHONE_NUMBER}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={copyNumber}
                  className="flex-1 py-3 rounded-xl border border-gray-300 hover:bg-gray-50 font-medium transition"
                >
                  {copied ? "Copied!" : "Copy Number"}
                </button>

                <a
                  href={callUrl}
                  className="flex-1 py-3 rounded-xl bg-[#F47C3C] hover:bg-[#e06b2b] text-white font-medium text-center transition"
                >
                  Call Now
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingActions;