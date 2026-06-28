"use client"
import React, { useState } from "react";
import { ChevronUp, ChevronDown, Play } from "lucide-react";

const VideoExplorer = () => {
  const videoData = [
    { id: 1, title: "Rent a Room in London", src: "#", thumb: "https://res.cloudinary.com/dyfiv680c/image/upload/v1782311008/RENTAROOMLONDON/images/WhatsApp_Image_2024-10-23_at_5.35.54_PM_2_ncmoma.jpg" },
    { id: 2, title: "Cheap Rooms for Students", src: "#", thumb: "https://res.cloudinary.com/dyfiv680c/image/upload/v1781962639/RENTAROOMLONDON/images/IMG-20250919-WA0001_b5cm28_jj5rpe.jpg" },
    { id: 3, title: "Furnished Rooms Showcase", src: "#", thumb: "https://res.cloudinary.com/dyfiv680c/image/upload/v1781803183/RENTAROOMLONDON/images/WhatsApp_Image_2025-08-05_at_20.09.30_715b225e_ou8vp6_q6b2nj.jpg" },
    { id: 4, title: "En Suite Room Tour", src: "#", thumb: "https://res.cloudinary.com/dyfiv680c/image/upload/v1781961605/RENTAROOMLONDON/images/WhatsApp_Image_2024-08-19_at_9.25.27_PM_xpckfg_l5ahpp.jpg" },
    { id: 5, title: "Birmingham City Living", src: "#", thumb: "https://res.cloudinary.com/dyfiv680c/image/upload/v1781961829/RENTAROOMLONDON/images/width_1080_eb2400d0-8909-415b-b8f5-56b953a3dcaa_e7wzpi_arqx4j.jpg" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < videoData.length - 3) setCurrentIndex(prev => prev + 1);
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
  };

  return (
    <section className="w-full bg-[#1A2332] py-12 px-4 md:px-10 overflow-hidden">
      <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-6 h-[660px]">
        
        {/* Left Side: Video Carousel */}
        <div className="lg:w-[35%] flex flex-col relative">
          <div className="mb-4 flex justify-between items-end">
            <div>
              <h2 className="text-white text-2xl font-bold font-playfair">Room <span className="text-[#FF6B35]">Tours</span></h2>
              <p className="text-gray-500 text-xs">Hover to preview rooms</p>
            </div>
            
            {/* Nav Buttons */}
            <div className="flex gap-2">
              <button onClick={handlePrev} disabled={currentIndex === 0} className="p-2 bg-white/5 rounded-lg text-white disabled:opacity-20 hover:bg-[#FF6B35]">
                <ChevronUp size={18} />
              </button>
              <button onClick={handleNext} disabled={currentIndex >= videoData.length - 3} className="p-2 bg-white/5 rounded-lg text-white disabled:opacity-20 hover:bg-[#FF6B35]">
                <ChevronDown size={18} />
              </button>
            </div>
          </div>

          <div className="flex-1 relative overflow-hidden">
            <div 
              className="flex flex-col gap-3 transition-transform duration-500"
              style={{ transform: `translateY(-${currentIndex * 203}px)` }}
            >
              {videoData.map((video) => (
                <div key={video.id} className="relative h-[190px] w-full shrink-0 group rounded-xl overflow-hidden bg-black">
                  <video 
                    className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-opacity"
                    muted 
                    loop
                    preload="none" // CRITICAL: Stops auto-download
                    poster={video.thumb} // Show image first
                    onMouseEnter={e => e.target.play()}
                    onMouseLeave={e => { e.target.pause(); e.target.currentTime = 0; }}
                  >
                    <source src={video.src} type="video/mp4" />
                  </video>
                  
                  <div className="absolute bottom-0 p-4 w-full bg-gradient-to-t from-black to-transparent">
                    <h4 className="text-white font-bold text-sm leading-tight">{video.title}</h4>
                    <span className="text-[10px] text-[#FF6B35] font-bold uppercase mt-1 block tracking-widest">Video Tour</span>
                  </div>
                  
                  <div className="absolute top-4 right-4 text-white/30 group-hover:text-[#FF6B35] transition-colors">
                    <Play size={16} fill="currentColor" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Map */}
        <div className="lg:w-[65%] rounded-2xl overflow-hidden bg-[#161d29] border border-white/5 relative">
           <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d158858.14736669!2d-0.241681!3d51.5287718!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a00baf21de75%3A0x52963a5addd52a99!2sLondon!5e0!3m2!1sen!2suk!4v1715000000000!5m2!1sen!2suk" 
            className="w-full h-full grayscale invert opacity-70"
            style={{ border: 0 }}
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default VideoExplorer;