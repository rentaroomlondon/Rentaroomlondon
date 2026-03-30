import React from "react";

const badges = [
  { icon: "✅", text: "Client Money Protect" },
  { icon: "🏦", text: "My Deposits" },
  { icon: "🏠", text: "Property Redress Scheme" },
  { icon: "⭐", text: "Trustpilot Rated" },
];

const TrustBadge = ({ icon, text }) => {
  return (
    <div className="flex items-center justify-center gap-3 px-[32px] py-[18px] bg-white border border-[#E8E8E8] rounded-xl shadow-[0px_2.83px_11.33px_0px_rgba(0,0,0,0.04)] flex-shrink-0 w-full sm:w-auto">
      <span className="text-xl">{icon}</span>
      <span className="text-sm font-bold font-sans text-[#2C3E50]">{text}</span>
    </div>
  );
};

export default function TrustBadges() {
  return (
    <section className="w-full bg-[#F5F6FA] py-12">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-6 lg:px-20">
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
          {badges.map((badge, index) => (
            <div
              key={index}
              className="w-full sm:w-[calc(50%-0.75rem)] lg:w-auto"
            >
              <TrustBadge {...badge} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}