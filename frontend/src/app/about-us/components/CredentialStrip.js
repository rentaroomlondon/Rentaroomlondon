import React from "react";

const CREDENTIALS = [
  {
    id: "cmp",
    label: "Client Money Protect",
    mobileLabel: "Client Money Protect",
    icon: "✓",
  },
  {
    id: "deposits",
    label: "My Deposits — Tenancy Deposit Protection",
    mobileLabel: "My Deposits",
    icon: "✓",
  },
  {
    id: "prs",
    label: "PRS — Property Redress Scheme",
    mobileLabel: "PRS Scheme",
    icon: "✓",
  },
  {
    id: "trustpilot",
    label: "Trustpilot Rated",
    mobileLabel: "Trustpilot",
    icon: "★",
  },
];

const CredentialCard = ({ label, mobileLabel, icon }) => (
  <li className="flex items-center bg-white border border-[#E8E4DF] rounded-lg px-4 py-3 whitespace-nowrap flex-shrink-0">
    <span aria-hidden="true" className="mr-2 font-bold text-[#1A2332]">
      {icon}
    </span>

    <span className="text-[13px] font-sans font-semibold text-[#1A2332]">
      <span className={mobileLabel ? "hidden md:inline" : ""}>{label}</span>
      {mobileLabel && <span className="md:hidden">{mobileLabel}</span>}
    </span>
  </li>
);

export default function CredentialStrip() {
  return (
    <section
      aria-label="Company credentials"
      className="bg-[#FAF5F0] py-10 border-b border-[#E8E4DF] md:mt-10"
    >
      {/* Container */}
      <div className="max-w-7xl mx-auto px-2 md:px-8">

        <div className="flex flex-col md:flex-row md:items-center gap-4">

          {/* Desktop Label */}
          <div className="hidden md:block text-xs font-bold font-sans uppercase tracking-widest text-[#6B7280] whitespace-nowrap">
            Our Credentials
          </div>

          {/* Credentials */}
          <ul className="flex items-center gap-3 overflow-x-auto no-scrollbar">
            {CREDENTIALS.map((item) => (
              <CredentialCard
                key={item.id}
                label={item.label}
                mobileLabel={item.mobileLabel}
                icon={item.icon}
              />
            ))}
          </ul>

        </div>

      </div>
    </section>
  );
}