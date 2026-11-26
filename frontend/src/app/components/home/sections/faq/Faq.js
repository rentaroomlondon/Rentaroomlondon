"use client";

import { useState } from "react";
import Link from "next/link";
import { FAQS } from "../../data/faqs";
import { ACCOUNT_LINKS } from "../../data/navigation";
import SectionHeading from "../../ui/SectionHeading";
import Icon from "../../ui/Icon";
import "../../styles/faq.css";

/** Accordion — one answer open at a time (click again to close). */
export default function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="rh-sheet rh-sheet--white">
      <div className="rh-section-head">
        <SectionHeading
          eyebrow="KNOWLEDGE BASE"
          title="Questions?"
          muted="We've got answers."
          text="Everything you need to know about finding and securing your perfect shared room in the UK."
          textWidth={560}
        />
      </div>

      <div className="faq__list">
        {FAQS.map((item, i) => {
          const isOpen = i === open;
          return (
            <div key={item.q} className={`faq-item${isOpen ? " faq-item--open" : ""}`}>
              <button
                type="button"
                className="faq-item__question"
                onClick={() => setOpen(isOpen ? -1 : i)}
                aria-expanded={isOpen ? "true" : "false"}
              >
                <span className="faq-item__icon">
                  <Icon name={item.icon} size={18} color={isOpen ? "#FFFFFF" : "#F26A36"} />
                </span>
                <span className="faq-item__text">{item.q}</span>
                <span className="faq-item__toggle">
                  <Icon name="plus" size={16} color={isOpen ? "#C2410C" : "#14213D"} strokeWidth={2.6} linejoin={null} />
                </span>
              </button>
              {isOpen && <p className="faq-a">{item.a}</p>}
            </div>
          );
        })}
      </div>

      <div className="faq__help">
        <div className="faq__help-box">
          <span className="faq__help-title">Still have a question?</span>
          <span className="faq__help-text">Our team is happy to help — call, email or WhatsApp us.</span>
          <Link href={ACCOUNT_LINKS.contact} className="faq__help-link">Contact support</Link>
        </div>
      </div>
    </section>
  );
}
