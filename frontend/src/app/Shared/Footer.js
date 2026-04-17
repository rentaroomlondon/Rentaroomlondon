import Link from "next/link";
import React from "react";

const tenantLinks = [
  { label: "Find a Room", href: "/find-a-room" },
  { label: "Report a Repair", href: "/report-a-repair" },
  { label: "Make a Payment", href: "/make-a-payment" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Why Choose Us", href: "/why-choose-us" },
  { label: "FAQs", href: "/faqs" },
  // { label: "Area Guides", href: "/area-guides" },
  // { label: "Testimonials", href: "/testimonials" },
  { label: "Register", href: "/register-with-us" },
];

const aboutLinks = [
  { label: "About Us", href: "/affordable-rental-room-uk" },
  // { label: "Work For Us", href: "/careers" },
  { label: "Raise a Complaint", href: "/raise-a-complain" },
  { label: "Privacy Policy", href: "/privacy-policy" },
];

const Footer = () => {
  return (
    <footer className="bg-white border-t border-[#E8E8E8]">
      <div
          className={`max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-[100px] pt-12 pb-8`}
        >

        {/* Grid Section */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-10 lg:grid-cols-4">

          {/* TENANTS */}
          <FooterColumn title="TENANTS" links={tenantLinks} />

          {/* ABOUT US */}
          <FooterColumn title="ABOUT US" links={aboutLinks} />

          {/* CONTACT */}
          <div>
            <div className="hidden md:block">
              <FooterTitle>CONTACT US</FooterTitle>
            </div>
            <div className="space-y-4">
              <p className="text-[#2C3E50] font-semibold text-sm">
                +44 20 7790 5577
              </p>
              <p className="text-[#888888] text-sm">
                info@rentaroomlondon.co.uk
              </p>
              <Link
                href="/contact-us"
                className="text-[#F47C3C] text-sm hover:underline"
              >
                More Info
              </Link>
            </div>
          </div>

          {/* SOCIAL */}
          <div className="hidden md:block">
            <FooterTitle>FOLLOW US</FooterTitle>
            <div className="flex gap-3">
              <SocialIcon>{facebookIcon}</SocialIcon>
              <SocialIcon>{xIcon}</SocialIcon>
              <SocialIcon>{youtubeIcon}</SocialIcon>
              <SocialIcon>{linkedinIcon}</SocialIcon>
            </div>
          </div>
        </div>
        <div className="md:hidden mt-6">
            <FooterTitle>FOLLOW US</FooterTitle>
            <div className="flex gap-3">
              <SocialIcon>{facebookIcon}</SocialIcon>
              <SocialIcon>{xIcon}</SocialIcon>
              <SocialIcon>{youtubeIcon}</SocialIcon>
              <SocialIcon>{linkedinIcon}</SocialIcon>
            </div>
          </div>

        {/* Bottom Line */}
        <div className="border-t border-gray-100 mt-10"></div>
      </div>
    </footer>
  );
};

/* ---------- Reusable Column ---------- */
const FooterColumn = ({ title, links }) => (
  <div>
    <FooterTitle>{title}</FooterTitle>
    <ul className="space-y-4">
      {links.map((link) => (
        <li key={link.label}>
          <Link
            href={link.href}
            className="text-[#888888] text-sm hover:text-gray-600 transition-colors"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

/* ---------- Reusable Title ---------- */
const FooterTitle = ({ children }) => (
  <h3 className="uppercase font-extrabold tracking-[0.5px] text-[15px] text-[#2C3E50] mb-6">
    {children}
  </h3>
);

/* ---------- Social Icon ---------- */
const SocialIcon = ({ children }) => (
  <div className="w-10 h-10 flex items-center justify-center text-[#2C3E50] hover:bg-gray-50 transition-colors cursor-pointer">
    {children}
  </div>
);

/* ---------- SVG Icons ---------- */

const facebookIcon = (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3l-.5 3H13v6.8c4.56-.93 8-4.96 8-9.8z" />
  </svg>
);

const xIcon = (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const youtubeIcon = (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
  </svg>
);

const linkedinIcon = (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

export default Footer;