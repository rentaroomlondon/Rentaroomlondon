import React from "react";
import Image from "next/image";

const About = () => {
  const sections = [
    {
      badge: "HOW WE STARTED",
      title: "How we started",
      text: [
        "London is an incredible place to live. It is about energy, innovation, aiming high and having a fantastic time.",
        "I will never forget arriving in Whitechapel in 2002. My cool, new London loft turned out to be the width of a single bed and so dirty it took me four days to get it clean.",
        "My friends said, 'Go on Jason, do it – and we will move in.' And two properties came my way.",
      ],
      image: "/About.avif",
      reverse: false,
    },
    {
      badge: "OUR VALUES",
      title: "Why we genuinely care",
      text: [
        "It is very exciting to create something completely different and those first six months of Rentaroomlondon were some of the best of my life.",
        "I had met the amazing woman who became my wife and together we shaped Rentaroomlondon around values we believed in and wanted to live.",
        "We focused on trust, reliability, quality for money and being genuinely caring.",
        "By 2010 Rentaroomlondon was bigger than I could ever imagine. We invested again and we grew… and grew.",
      ],
      image: "/cleaner-window.avif",
      reverse: true,
    },
    {
      badge: "TODAY",
      title: "We're friendly and easy to deal with",
      text: [
        "Rentaroomlondon is a big, friendly office in the heart of London's cutting-edge property scene.",
        "When I look around me, I am incredibly proud to be surrounded by a dream team who care deeply about our tenants and landlords.",
        "We focused on trust, reliability, quality for money and being genuinely caring.",
        "By 2010 Rentaroomlondon was bigger than I could ever imagine. We invested again and we grew… and grew.",
      ],
      image: "/woman-sitting.avif",
      reverse: false,
    },
  ];

  return (
    <section className="py-12 md:py-20 px-5 md:px-12">
      <div className="max-w-7xl mx-auto space-y-20">
        {sections.map((section, index) => (
          <div
            key={index}
            className={`flex flex-col md:flex-row md:items-stretch gap-10 md:gap-20 
            border-b border-gray-200 pb-10 last:border-b-0 md:border-0 md:pb-0
            ${section.reverse ? "md:flex-row-reverse" : ""}`}
          >
            {/* Image */}
            <div className="w-full md:w-1/2 relative min-h-[320px]">
              <Image
                src={section.image}
                alt={section.title}
                fill
                className="object-cover rounded-[20px]"
              />
            </div>

            {/* Content */}
            <div className="w-full md:w-1/2 flex flex-col justify-center space-y-5">
              <span className="self-start inline-block text-[10px] md:text-[11px] tracking-widest uppercase bg-[#FFE7DE] text-[#FF7A45] px-3 py-1 rounded-full font-semibold">
                {section.badge}
              </span>

              <h2 className="text-[22px] md:text-[28px] font-semibold text-[#1A1A1A] font-playfair">
                {section.title}
              </h2>

              <div className="space-y-4">
                {section.text.map((p, i) => (
                  <p
                    key={i}
                    className="text-[#6B7280] text-[14px] md:text-[15px] leading-relaxed"
                  >
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default About;