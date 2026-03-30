import Link from "next/link";
import React from "react";

const RegisterCTA = () => {
  return (
    <section className="w-full bg-[#FFF8F3] py-6 md:py-8 px-6">
      <div className="max-w-[1440px] mx-auto flex justify-center">
        {/* w-full: takes full width on mobile 
            sm:w-auto: shrinks to content size on tablet/desktop
        */}
        <Link
          href="/register-with-us"
          className="w-full sm:w-auto bg-[#F47C3C] md:bg-[#FF6B35] hover:bg-[#e66a3a] text-white font-bold py-4 px-8 rounded-[10px] font-sans uppercase tracking-widest text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-orange-200/50 no-underline"
        >
          Register Now 
          <span className="text-lg">→</span>
        </Link>
      </div>
    </section>
  );
};

export default RegisterCTA;