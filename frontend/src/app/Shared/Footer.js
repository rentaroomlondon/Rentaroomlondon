import Link from "next/link";
import React from "react";

const tenantLinks = [
  { label: "Find a Room", href: "/find-a-room" },
  { label: "Report a Repair", href: "/report-a-repair" },
  { label: "Make a Payment", href: "/make-a-payment" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Why Choose Us", href: "/why-choose-us" },
  { label: "FAQs", href: "/faqs" },
  { label: "Register", href: "/register-with-us" },
  { label: "About Us", href: "/affordable-rental-room-uk" },
  { label: "Raise a Complaint", href: "/raise-a-complain" },
  { label: "Privacy Policy", href: "/privacy-policy" },
];

const locationLinks = [
  { label: "Rental Rooms in Cricklewood", href: "/rental-rooms-students-cricklewood-uk" },
  { label: "Rental Rooms in Harlesden", href: "/rooms-rent-harlesden-nw10-bills-included" },
  { label: "Rental Rooms in Kingsbury", href: "/shared-rental-rooms-kingsbury-london-nw9" },
  { label: "Rental Rooms in West Hampstead", href: "/rooms-rental-nw6-west-hampstead-london" },
  { label: "Rental Rooms in Hendon", href: "/cheap-rental-rooms-hendon-nw4-london" },
  { label: "Rental Rooms in Plumstead", href: "/affordable-rental-rooms-se18-plumstead-bills-included" },
  { label: "Rental Rooms in Eltham", href: "/rental-rooms-eltham-london-se9-bills-included" },
  { label: "Rental Rooms in Greenwich", href: "/best-rental-rooms-greenwich-university-se10-london" },
  { label: "Rental Rooms in Stockwell", href: "/stockwell-sw9-student-housing-bills-included" },
  { label: "Rental Rooms in South Tottenham", href: "/Spare-rooms-rent-south-tottenham-n15-london" },
  { label: "Rental Rooms in Leyton", href: "/rent-single-double-rooms-leyton-e10-london" },
  { label: "Rental Rooms in East Ham", href: "/east-ham-e6-properties-rent-bills-included" },
  { label: "Rental Rooms in Birmingham", href: "/birmingham-city-centre-student-housing-bills-included" },
];

const Footer = () => {
  return (
    <footer className="bg-white border-t border-[#E8E8E8]">
      {/* Main Grid Area */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-[100px] pt-16 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 items-start">
          
          {/* Column 1: Intro / Branding Text */}
          <div className="space-y-6">
            <h3 className="text-[#1A365D] font-bold text-[18px]">
              Rental Room London
            </h3>
            <div className="space-y-2 text-[#718096] text-sm leading-relaxed">
              <p className="font-semibold text-[#1A365D]">Book your perfect room with us today</p>
              <p>No hidden costs, no surprises.</p>
              <p>Affordable living with bills included.</p>
            </div>
            {/* Social Icons Stack */}
            <div className="pt-2">
              <div className="flex gap-3">
                <Link
                  href="https://www.facebook.com/people/Rent-a-Room/61583753398768/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Rent a Room Facebook"
                >
                  <SocialIcon>{facebookIcon}</SocialIcon>
                </Link>
                <SocialIcon>{xIcon}</SocialIcon>
                <SocialIcon>{youtubeIcon}</SocialIcon>
                <SocialIcon>{linkedinIcon}</SocialIcon>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <FooterTitle>QUICK LINKS</FooterTitle>
            <ul className="space-y-3.5">
              {tenantLinks.map((link) => (
                <li key={link.label} className="flex items-center gap-2">
                  <span className="text-[#F47C3C] text-xs opacity-70">»</span>
                  <Link
                    href={link.href}
                    className="text-[#718096] text-sm hover:text-[#1A365D] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Rental Locations */}
          <div>
            <FooterTitle>OUR LOCATIONS</FooterTitle>
            <ul className="space-y-3.5 max-h-[430px] overflow-y-auto pr-4 custom-scrollbar">
              {locationLinks.map((link) => (
                <li key={link.label} className="flex items-center gap-2">
                  <span className="text-[#F47C3C] text-xs opacity-70">»</span>
                  <Link
                    href={link.href}
                    className="text-[#718096] text-sm hover:text-[#1A365D] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Get In Touch */}
          <div>
            <FooterTitle>GET IN TOUCH</FooterTitle>
            <div className="space-y-6">
              {/* Phone Row */}
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full border border-[#E2E8F0] flex items-center justify-center text-[#1A365D] bg-gray-50/50 shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.387a12.035 12.035 0 01-7.108-7.108c-.145-.44.02-1.27.393-1.552l1.293-.97c.362-.272.528-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v1.25z" />
                  </svg>
                </div>
                <p className="text-[#1A365D] font-semibold text-sm" tel="+447419990126">
                  +44 7419 990 126
                </p>
              </div>

              {/* Email Row */}
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full border border-[#E2E8F0] flex items-center justify-center text-[#1A365D] bg-gray-50/50 shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0l-7.5-4.615a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <p className="text-[#718096] text-sm break-all">
                  info@rentaroomlondon.co.uk
                </p>
              </div>

              {/* Address Row */}
              {/* <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full border border-[#E2E8F0] flex items-center justify-center text-[#1A365D] bg-gray-50/50 shrink-0 mt-0.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
                <div className="text-[#718096] text-sm leading-relaxed pt-1.5">
                  <p>London Office,</p>
                  <p>Greater London, United Kingdom</p>
                </div>
              </div> */}
            </div>
          </div>

        </div>
      </div>

      {/* Full-width Copyright Bar */}
      <div className="bg-[#2D3748] py-4 px-6 sm:px-12 lg:px-[100px]">
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-white/90">
          <p>© Copyright 2026 Rental Room London. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

/* ---------- Reusable Title Component ---------- */
const FooterTitle = ({ children }) => (
  <h3 className="font-bold tracking-[0.5px] text-[15px] text-[#1A365D] mb-6">
    {children}
  </h3>
);

/* ---------- Social Icon Frame ---------- */
const SocialIcon = ({ children }) => (
  <div className="w-9 h-9 rounded-full border border-[#E2E8F0] flex items-center justify-center text-[#718096] hover:text-[#1A365D] hover:bg-gray-50 transition-all cursor-pointer">
    {children}
  </div>
);

/* ---------- SVG Icons Data ---------- */
const facebookIcon = (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3l-.5 3H13v6.8c4.56-.93 8-4.96 8-9.8z" />
  </svg>
);

const xIcon = (
  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const youtubeIcon = (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
  </svg>
);

const linkedinIcon = (
  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

export default Footer;