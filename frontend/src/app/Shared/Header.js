"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useAuth } from "../Context/AuthContext";

const navLinks = [
  {
    label: "FIND A ROOM",
    megaMenu: {
      columns: [
        {
          title: "North West London",
          links: [
            { label: "All NW London", href: "#" },
            { label: "Cricklewood", href: "#" },
            { label: "Harlesden", href: "#" },
            { label: "Kingsbury", href: "#" },
            { label: "West Hampstead", href: "#" },
            { label: "Hendon", href: "#" },
          ],
        },
        {
          title: "South East London",
          links: [
            { label: "All SE London", href: "#" },
            { label: "Plumstead", href: "#" },
            { label: "Eltham", href: "#" },
            { label: "Greenwich", href: "#" },
            { label: "Stockwell", href: "#" },
          ],
        },
        {
          title: "East London",
          links: [
            { label: "All East London", href: "#" },
            { label: "South Tottenham", href: "#" },
            { label: "Leyton", href: "#" },
            { label: "East Ham", href: "#" },
          ],
        },
        {
          title: "Out of London",
          links: [
            { label: "All out of London", href: "#" },
            { label: "Birmingham", href: "#" },
          ],
        },
      ],
    },
  },

  {
    label: "PROPERTY TYPE",
    dropdown: [
      { label: "Single occupancy room", href: "#" },
      { label: "Double room", href: "#" },
      { label: "Studio room", href: "#" },
      { label: "Flat share room", href: "#" },
    ],
  },

  {
    label: "STUDENT ACCOMMODATION",
    dropdown: [
      { label: "North West London", href: "#" },
      { label: "South East London", href: "#" },
      { label: "East London", href: "#" },
      { label: "Birmingham", href: "#" },
    ],
  },

  // KEEP YOUR OLD ONES
  {
    label: "TENANTS",
    dropdown: [
      { label: "How It Works", href: "/how-it-works" },
      { label: "Why Choose Us", href: "/why-choose-us" },
      { label: "FAQ's", href: "/faqs" },
      { label: "Report a Repair", href: "/report-a-repair" },
      { label: "Make a Payment", href: "/make-a-payment" },
      { label: "Out of Office Emergencies", href: "/out-of-office-emergencies" },
      { label: "Raise a Complaint", href: "/raise-a-complain" },
      { label: "Register with Us", href: "/register-with-us" }
    ],
  },
  {
    label: "ABOUT US",
    dropdown: [
      { label: "About Us", href: "/affordable-rental-room-uk" },
      { label: "Privacy Policy", href: "/privacy-policy" },
    ],
  },
  {
    label: "CONTACT",
    href: "/contact-us",
  },
  {
    label: "BOOK A ROOM",
    href: "/book-a-room",
  }
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { user, loadingUser, logout } = useAuth();

  // Helper for the small right arrow/chevron
  const ChevronRight = () => (
    <span className="text-[10px] opacity-30 font-light">›</span>
  );

  return (
    <header className="w-full">
      <nav
        className="flex items-center w-full h-[60px] bg-[#0F253B] shadow-[0px_2px_10px_0px_rgba(0,0,0,0.15)] font-sans"
      >
        {/* Left spacing */}
        <div className="w-4 md:w-5 h-full shrink-0" />

        {/* Brand */}
        <Link
          href="/"
          className="flex items-center h-full md:bg-[#F47C3C] md:px-6 shrink-0 cursor-pointer"
        >
          <div className="w-17 h-12 flex items-center justify-center mr-2 md:mr-3">
            <img
              src="/logos.png"
              alt="Logo"
              className="w-full h-full object-contain"
            />
          </div>

          <span className="text-white text-[12px] md:text-base font-semibold font-sans uppercase tracking-wider whitespace-nowrap">
            RentaRoomLondon
          </span>
        </Link>


        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-9 px-10 h-full">
          {navLinks.map((link) => (
            <div key={link.label} className="relative group">

              <a
                href={link.href || "#"}
                className="flex items-center text-white text-[13px] font-medium tracking-wider uppercase hover:text-orange-400"
              >
                {link.label}
                {(link.dropdown || link.megaMenu) && (
                  <span className="ml-1 text-[10px] opacity-80">▾</span>
                )}
              </a>

              {/* ✅ NORMAL DROPDOWN */}
              {link.dropdown && (
                <div className="absolute left-0 top-[40px] w-56 bg-white text-black rounded-b-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[60] border-t-2 border-orange-500">
                  {link.dropdown.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="block px-4 py-3 text-[13px] hover:bg-gray-100"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}

              {/* ✅ MEGA MENU */}
              {link.megaMenu && (
                <div className="absolute left-0 top-[40px] w-[900px] bg-white text-black shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[60] p-8 grid grid-cols-4 gap-8">

                  {link.megaMenu.columns.map((col) => (
                    <div key={col.title}>
                      <h3 className="font-bold text-[13px] uppercase mb-3">
                        {col.title}
                      </h3>

                      <div className="flex flex-col gap-2 text-[13px]">
                        {col.links.map((item) => (
                          <Link
                            key={item.label}
                            href={item.href}
                            className="hover:text-orange-500"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}

                </div>
              )}

            </div>
          ))}
        </div>

        {/* Spacer */}
        <div className="flex-grow" />

        {/* Desktop Right Side */}
        <div className="hidden lg:flex items-center h-full">
          <div className="px-6">
            <Link
              href="/saved"
              className="text-white text-[12px] font-medium font-sans tracking-wider uppercase hover:opacity-70 transition-opacity"
            >
              SAVED
            </Link>

          </div>

          {!loadingUser && (
            user ? (
              <div className="relative pr-6">

                {/* Profile Button */}
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold shadow-sm">
                    {user?.firstName?.charAt(0) || "U"}
                  </div>

                  <span className="text-white text-[12px] font-semibold uppercase">
                    {user.firstName}
                  </span>
                </button>

                {/* Dropdown */}
                {profileOpen && (
                  <div className="absolute right-0 top-[45px] bg-white text-black w-40 rounded-lg shadow-lg overflow-hidden z-50">

                    <Link
                      href="/dashboard"
                      className="block px-4 py-3 hover:bg-gray-100 text-sm"
                      onClick={() => setProfileOpen(false)}
                    >
                      Dashboard
                    </Link>

                    <button
                      onClick={() => {
                        logout();
                        setProfileOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 hover:bg-gray-100 text-sm"
                    >
                      Logout
                    </button>

                  </div>
                )}

              </div>
            ) : (
              <Link
                href="/login"
                className="h-full bg-[#F47C3C] px-8 flex items-center text-white font-medium text-[12px] tracking-wider uppercase hover:bg-[#e06d30] transition-colors shrink-0"
              >
                LOGIN
              </Link>
            )
          )}
        </div>

        {/* Mobile Buttons */}
        <div className="flex items-center  lg:hidden">

          {/* Heart Button */}
          <Link href="/saved" className="text-white text-2xl inline-flex">
            <svg
              width="24"
              height="26"
              viewBox="0 0 24 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 9.59961C12 9.59961 12 9.59961 11.24 8.59961C10.36 7.43961 9.06 6.59961 7.5 6.59961C5.01 6.59961 3 8.60961 3 11.0996C3 12.0296 3.28 12.8896 3.76 13.5996C4.57 14.8096 12 22.5996 12 22.5996 M12 9.59961C12 9.59961 12 9.59961 12.76 8.59961C13.64 7.43961 14.94 6.59961 16.5 6.59961C18.99 6.59961 21 8.60961 21 11.0996C21 12.0296 20.72 12.8896 20.24 13.5996C19.43 14.8096 12 22.5996 12 22.5996"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="px-5 text-white text-2xl"
          >
            <svg width="24" height="18" viewBox="0 0 24 18" fill="none">
              <rect width="24" height="2" rx="1" fill="white"/>
              <rect y="8" width="24" height="2" rx="1" fill="white"/>
              <rect y="16" width="24" height="2" rx="1" fill="white"/>
            </svg>
          </button>

        </div>
      </nav>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 lg:hidden" 
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-full bg-[#0F253B] text-white z-50 overflow-y-auto transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-4 h-[60px] ">

          {/* Logo */}
          <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center">
            <div className="w-12 h-10 flex items-center justify-center mr-2">
              <img src="/logos.png" alt="Logo" className="w-full h-full object-contain" />
            </div>
            <span className="text-white text-[12px] font-semibold uppercase tracking-wider">
              RentaRoomLondon
            </span>
          </Link>

          {/* Right Icons */}
          <div className="flex items-center gap-4">

            {/* Heart Button */}
            <Link
              href="/saved"
              onClick={() => setIsOpen(false)}
              className="text-white inline-flex"
            >
              <svg width="24" height="26" viewBox="0 0 24 26" fill="none">
                <path
                  d="M12 9.59961C12 9.59961 12 9.59961 11.24 8.59961C10.36 7.43961 9.06 6.59961 7.5 6.59961C5.01 6.59961 3 8.60961 3 11.0996C3 12.0296 3.28 12.8896 3.76 13.5996C4.57 14.8096 12 22.5996 12 22.5996 M12 9.59961C12 9.59961 12 9.59961 12.76 8.59961C13.64 7.43961 14.94 6.59961 16.5 6.59961C18.99 6.59961 21 8.60961 21 11.0996C21 12.0296 20.72 12.8896 20.24 13.5996C19.43 14.8096 12 22.5996 12 22.5996"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>


            {/* Close Button */}
            <button onClick={() => setIsOpen(false)} className="text-white">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

          </div>
        </div>

        {/* Menu Content */}
        <div className="pt-6 pb-10 px-6 flex flex-col">

          {/* MAIN */}
          <section className="mb-8">
            <p className="text-[10px] text-[#FFFFFF4D] font-sans font-bold tracking-[0.15em] mb-4">
              MAIN
            </p>
            <div className="flex items-center justify-between py-3 border-b border-white/5">
            <Link href="/find-a-room" onClick={() => setIsOpen(false)}>
              <span className="text-[14px] font-sans text-gray-200">🔍 Search Rooms</span>
              <ChevronRight />
            </Link>
            </div>
          </section>

          <section className="mb-8">
            <p className="text-[10px] text-[#FFFFFF4D] font-bold tracking-[0.15em] mb-4">
              FIND A ROOM
            </p>

            {navLinks.find((l) => l.label === "FIND A ROOM")?.megaMenu.columns.map((col) => (
              <div key={col.title} className="mb-4">
                <p className="text-orange-400 text-[12px] font-bold mb-2">
                  {col.title}
                </p>

                {col.links.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="block text-[13px] text-white/80 py-1"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            ))}
          </section>

          <section className="mb-8">
            <p className="text-[10px] text-[#FFFFFF4D] font-bold tracking-[0.15em] mb-4">
              PROPERTY TYPE
            </p>

            {navLinks.find((l) => l.label === "PROPERTY TYPE")?.dropdown.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between py-3 border-b border-white/5"
              >
                <span className="text-[14px] text-white/80">{item.label}</span>
                <ChevronRight />
              </Link>
            ))}
          </section>

          <section className="mb-8">
            <p className="text-[10px] text-[#FFFFFF4D] font-bold tracking-[0.15em] mb-4">
              STUDENT ACCOMMODATION
            </p>

            {navLinks.find((l) => l.label === "STUDENT ACCOMMODATION")?.dropdown.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between py-3 border-b border-white/5"
              >
                <span className="text-[14px] text-white/80">{item.label}</span>
                <ChevronRight />
              </Link>
            ))}
          </section>

          {/* TENANTS */}
          <section className="mb-8">
            <p className="text-[10px] text-[#FFFFFF4D] font-bold tracking-[0.15em] mb-4">
              TENANTS
            </p>

            {navLinks.find((l) => l.label === "TENANTS").dropdown.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between py-3 border-b border-white/5"
              >
                <span className="text-[14px] text-[#FFFFFFD9] font-medium">{item.label}</span>
                <ChevronRight />
              </Link>
            ))}
          </section>

          
          {/* ABOUT US */}
          <section className="mb-8">
            <p className="text-[10px] text-[#FFFFFF4D] font-bold tracking-[0.15em] mb-4">
              ABOUT US
            </p>

            {navLinks.find((l) => l.label === "ABOUT US").dropdown.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between py-3 border-b border-white/5"
              >
                <span className="text-[14px] text-[#FFFFFFD9] font-medium">{item.label}</span>
                <ChevronRight />
              </Link>
            ))}
          </section>

          {/* CONTACT */}
          <section className="mb-8">
            <p className="text-[10px] text-[#FFFFFF4D] font-bold tracking-[0.15em] mb-4">
              CONTACT
            </p>

            <div className="flex items-center justify-between py-3 border-b border-white/5">
              <Link href="/contact-us" onClick={() => setIsOpen(false)} >
                <span className="text-[14px] text-[#FFFFFFD9] font-medium">Get in Touch</span>
                <ChevronRight  />
              </Link>
            </div>

            <div className="flex items-center justify-between pt-3">
              <Link href="/out-of-office-emergencies" onClick={() => setIsOpen(false)}>
                <span className="text-[14px] text-[#F47C3C] font-bold ">
                  🚨 Emergency Line
                </span>
                <ChevronRight  />
              </Link>
            </div>
          </section>

          {/* USER PROFILE */}
          {!loadingUser && user && (
            <Link
              href="/dashboard"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 mb-8 border-b border-white/10 pb-6 cursor-pointer"
            >

              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold shadow-sm">
                {user?.firstName?.charAt(0) || "U"}
              </div>

              <div className="flex flex-col">
                <span className="text-white font-semibold text-[14px]">
                  {user.firstName} {user.lastName || ""}
                </span>

                <span className="text-white/60 text-[12px]">
                  {user.email}
                </span>
              </div>

            </Link>
          )}

          {/* LOGIN BUTTON */}
          {!loadingUser && (
            user ? (
              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="w-full bg-red-500 py-4 rounded-xl font-bold text-[13px] tracking-wider uppercase"
              >
                LOGOUT
              </button>
            ) : (
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="w-full bg-[#F47C3C] py-4 rounded-xl font-bold text-[13px] tracking-wider uppercase flex items-center justify-center gap-2"
              >
                LOGIN / REGISTER
                <span className="text-lg">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="ml-1"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                  </svg>
                </span>
              </Link>
            )
          )}

        </div>
      </div>
    </header>
  );
};

export default Header;