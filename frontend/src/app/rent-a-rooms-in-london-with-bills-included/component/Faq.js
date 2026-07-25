'use client';

import React, { useState } from 'react';
import { Plus, Minus, HelpCircle, MessageCircle } from 'lucide-react';

const WHATSAPP_URL =
  'https://wa.me/447419990126?text=' +
  encodeURIComponent('Hello! I am interested in booking a room.');

const faqs = [
  {
    question: 'Is there short-term and summer accommodation available in London?',
    answer:
      "If you're looking for London student accommodation during the summer or for just a term or two, get in touch with our property teams who will share you the room photos based on requirement.",
  },
  {
    question: 'Is it possible to get dual occupancy student accommodation from you?',
    answer:
      'Yes, it is. We offer dual occupancy for some of our studios in London, so you can rent and live as a couple or with your friend. You’ll also save some money on rent, compared with renting two separate rooms. Rooms are available in different location of lodon.',
  },
  {
    question: 'Do I need a UK guarantor?',
    answer:
      'Booking requirements can vary based on the property, agreement and length of stay. Contact our team and we will explain the available options based on your circumstances.',
  },
  {
    question: 'Can I arrange a viewing before renting a room?',
    answer:
      'If Possible, Definitely we can arrange an in-person or virtual viewing. Availability depends on the property and whether the room is currently occupied.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">

          {/* Left side – heading */}
          <div className="lg:col-span-4 space-y-5">
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 text-xs font-bold px-3 py-1 rounded-full border border-orange-200">
              <HelpCircle className="w-3.5 h-3.5 text-orange-600" />
              <span>FAQ</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight leading-tight">
              People Also Ask Common Questions
            </h2>

            <p className="text-slate-500 text-sm leading-relaxed">
              Quick answers to the questions students and professionals ask us most often
              before booking a room in London.
            </p>

            {/* WhatsApp CTA card */}
            <div className="mt-6 p-5 rounded-2xl bg-[#FAF8F5] border border-slate-200/80">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm">Still have a question?</p>
                  <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                    Message us on WhatsApp — we usually reply within a few hours.
                  </p>
                </div>
              </div>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm py-3 px-4 rounded-xl transition-colors shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Right side – accordion */}
          <div className="lg:col-span-8 space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={index}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? 'bg-[#FAF8F5] border-orange-200 shadow-sm'
                      : 'bg-white border-slate-200/80 hover:border-slate-300'
                  }`}
                >
                  <button
                    onClick={() => toggle(index)}
                    className="w-full flex items-start gap-4 p-5 sm:p-6 text-left"
                  >
                    <span
                      className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-sm font-bold transition-colors ${
                        isOpen
                          ? 'bg-orange-500 text-white'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    <span className="flex-1 font-bold text-slate-900 text-[15px] sm:text-base leading-snug pr-2">
                      {faq.question}
                    </span>

                    <span
                      className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-colors ${
                        isOpen
                          ? 'bg-orange-100 text-orange-600'
                          : 'bg-slate-100 text-slate-400'
                      }`}
                    >
                      {isOpen ? (
                        <Minus className="w-4 h-4" />
                      ) : (
                        <Plus className="w-4 h-4" />
                      )}
                    </span>
                  </button>

                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-5 sm:px-6 pb-5 sm:pb-6 pl-[3.75rem] sm:pl-[4.25rem]">
                        <p className="text-slate-600 text-sm leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}