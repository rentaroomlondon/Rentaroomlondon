"use client";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Gallery = ({ images = [], videos = [], available = false }) => {
  const [current, setCurrent] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // 🔥 MODAL STATE
  const [isOpen, setIsOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);

  const mediaItems = [
    ...images.map((url) => ({ type: "image", url })),
    ...videos.map((url) => ({ type: "video", url })),
  ];
  const displayMedia =
    mediaItems.length > 0
      ? mediaItems
      : [{ type: "image", url: "https://via.placeholder.com/800x600?text=No+Image" }];

  const renderMedia = (item, className, alt, controls = false) =>
    item.type === "video" ? (
      <video
        key={item.url}
        src={item.url}
        controls={controls}
        playsInline
        preload="metadata"
        aria-label={alt}
        className={className}
      />
    ) : (
      <img
        key={item.url}
        src={item.url}
        alt={alt}
        className={className}
      />
    );

  // ======================
  // 🔄 SLIDER (MOBILE)
  // ======================
  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? displayMedia.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrent((prev) =>
      prev === displayMedia.length - 1 ? 0 : prev + 1
    );
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) nextSlide();
    if (touchEnd - touchStart > 50) prevSlide();
  };

  // ======================
  // 🔥 MODAL LOGIC
  // ======================
  const openModal = (index) => {
    setModalIndex(index);
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  const nextModal = () => {
    setModalIndex((prev) =>
      prev === displayMedia.length - 1 ? 0 : prev + 1
    );
  };

  const prevModal = () => {
    setModalIndex((prev) =>
      prev === 0 ? displayMedia.length - 1 : prev - 1
    );
  };

  // 🔥 Keyboard support
  useEffect(() => {
    const handleKey = (e) => {
      if (!isOpen) return;
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowRight") nextModal();
      if (e.key === "ArrowLeft") prevModal();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen]);

  return (
    <div className="w-full md:px-4 md:py-10">

      {/* ================= MOBILE ================= */}
      <div
        className="relative block md:hidden w-full aspect-4/3 bg-black"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {renderMedia(displayMedia[current], "w-full h-full object-cover", "Property video or image", true)}

        {available && (
          <div className="absolute top-4 left-4 bg-[#1db978] text-white px-4 py-2 rounded-full text-[11px] font-semibold flex items-center gap-2">
            <span className="w-2 h-2 bg-white/80 rounded-full animate-pulse"></span>
            Available Now
          </div>
        )}

        {/* Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-white/50 flex items-center justify-center bg-black/10 text-white"
        >
          <ChevronLeft size={20} />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-white/50 flex items-center justify-center bg-black/10 text-white"
        >
          <ChevronRight size={20} />
        </button>

        {/* Counter */}
        <div className="absolute top-4 right-4 bg-black/40 text-white px-4 py-1.5 rounded-full text-xs">
          {current + 1} / {displayMedia.length}
        </div>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
          {displayMedia.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full ${
                index === current ? "w-8 bg-white" : "w-2 bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>

      {/* ================= DESKTOP ================= */}
      <div className="hidden md:grid grid-cols-4 grid-rows-2 gap-2 h-125 max-w-360 mx-auto">

        {/* Main Image */}
        <div
          onClick={() => openModal(0)}
          className="col-span-2 row-span-2 relative rounded-xl overflow-hidden cursor-pointer"
        >
          {renderMedia(displayMedia[0], "w-full h-full object-cover", "Main property media")}
          {displayMedia[0].type === "video" && (
            <span className="pointer-events-none absolute bottom-4 right-4 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white">
              Video
            </span>
          )}

          {available && (
            <div className="absolute top-6 left-6 bg-[#18B26A] text-white px-4 py-1.5 rounded-full text-sm flex items-center gap-2">
              <span className="w-2 h-2 bg-white rounded-full"></span>
              Available Now
            </div>
          )}
        </div>

        {/* Small Images */}
        {[1, 2, 3, 4].map((index) => (
          <div
            key={index}
            onClick={() => openModal(index)}
            className="relative overflow-hidden rounded-xl cursor-pointer"
          >
            {displayMedia[index] ? (
              renderMedia(displayMedia[index], "w-full h-full object-cover", `Property media ${index + 1}`)
            ) : (
              <img
                src="https://via.placeholder.com/400x300"
                className="w-full h-full object-cover"
                alt={`View ${index}`}
              />
            )}
            {displayMedia[index]?.type === "video" && (
              <span className="pointer-events-none absolute left-2 top-2 rounded bg-black/60 px-2 py-1 text-[10px] font-semibold text-white">
                Video
              </span>
            )}

            {index === 4 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  openModal(0);
                }}
                className="absolute bottom-4 right-4 bg-[#1e293b]/90 text-white px-4 py-2 rounded-lg text-xs"
              >
               🖼️ View all {displayMedia.length} photos & videos
              </button>
            )}
          </div>
        ))}
      </div>

      {/* ================= MODAL ================= */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={closeModal}
        >
          {/* Close */}
          <button
            onClick={closeModal}
            className="absolute top-6 right-6 text-white text-3xl"
          >
            ✕
          </button>

          {/* Prev */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevModal();
            }}
            className="absolute left-6 text-white text-4xl"
          >
            ‹
          </button>

          {/* Image */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex max-h-[90vh] max-w-[90vw] items-center justify-center"
          >
            {renderMedia(
              displayMedia[modalIndex],
              "max-h-[90vh] max-w-[90vw] object-contain",
              "Property media preview",
              true
            )}
          </div>

          {/* Next */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextModal();
            }}
            className="absolute right-6 text-white text-4xl"
          >
            ›
          </button>

          {/* Counter */}
          <div className="absolute bottom-6 text-white text-sm">
            {modalIndex + 1} / {displayMedia.length}
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;