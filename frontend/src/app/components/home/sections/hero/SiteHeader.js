"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ACCOUNT_LINKS, MAIN_NAV } from "../../data/navigation";
import ArrowCircle from "../../ui/ArrowCircle";
import Icon from "../../ui/Icon";

/**
 * Glass navigation bar inside the hero + the mobile menu it opens.
 * Once the page scrolls past it, the bar is pinned to the top of the screen.
 * (position: sticky cannot be used: the hero and page root have overflow: hidden.)
 */
export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [stuck, setStuck] = useState(false);
  const [slotHeight, setSlotHeight] = useState(0);
  const slotRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const slot = slotRef.current;
      const header = headerRef.current;
      if (!slot || !header) return;
      const shouldStick = slot.getBoundingClientRect().top < 0;
      if (shouldStick) {
        // Keep the header's original space so the content below does not jump up
        setSlotHeight((h) => h || header.offsetHeight + parseFloat(getComputedStyle(header).marginTop || "0"));
      } else {
        setSlotHeight(0);
      }
      setStuck(shouldStick);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div ref={slotRef} className="nav-slot" style={stuck ? { height: slotHeight } : undefined}>
      <div className={`nav-shell${stuck ? " nav-shell--stuck" : ""}`}>
        <header ref={headerRef} className="glass-nav">
          <div className="glass-nav__brand">
            <Link href="/" className="glass-nav__logo">
              <img src="/home/logo.webp" alt="Rental Room UK London" />
            </Link>
            <nav aria-label="Main" className="nav-links">
              {MAIN_NAV.map((item) => (
                <Link key={item.label} href={item.href} className="nav-links__link">
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="glass-nav__actions">
            <Link href={ACCOUNT_LINKS.saved} className="nav-hide glass-nav__saved">Saved</Link>
            <Link href={ACCOUNT_LINKS.login} className="nav-hide glass-nav__login">Log in</Link>
            <Link href={ACCOUNT_LINKS.bookViewing} className="nav-book">
              Book a viewing
              <ArrowCircle size={34} />
            </Link>
            <button
              type="button"
              className="nav-burger"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open ? "true" : "false"}
              aria-label="Menu"
            >
              <Icon name={open ? "close" : "menu"} size={20} strokeWidth={2.2} linejoin={null} />
            </button>
          </div>
        </header>

        {open && (
          <nav aria-label="Mobile" className="m-menu">
            {MAIN_NAV.map((item) => (
              <Link key={item.label} href={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            ))}
            <span className="m-menu__actions">
              <Link href={ACCOUNT_LINKS.saved} className="m-btn">Saved</Link>
              <Link href={ACCOUNT_LINKS.login} className="m-btn">Log in</Link>
            </span>
          </nav>
        )}
      </div>
    </div>
  );
}
