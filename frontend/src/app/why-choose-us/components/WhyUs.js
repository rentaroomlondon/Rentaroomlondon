import React from "react";
import Image from "next/image";

const WhyUs = () => {
  const sections = [
    {
      icon: "👥",
      title: "Every detail of your move is carefully managed so you can ",
      highlight: "focus on having a good time",
      description:
        "We love London at Rentaroomlondon and we want you to love it too, which is why we make sure every detail of your move is carefully managed so you can focus on having a good time. Our friendly, multilingual team aren't just flatshare experts, they're here to look after you.",
      bullets: [
        "Personalised room matching based on your lifestyle and budget",
        "Multilingual team across 30+ languages",
        "2,000+ beautifully maintained properties across London",
        "Excellent transport links optimised for your commute",
      ],
      image: "/woman-sitting.avif",
      reverse: false,
    },
    {
      icon: "🔧",
      title: "Trusted maintenance engineers and cleaners on hand ",
      highlight: "24/7",
      description:
        "Because everyone is different, we have been super selective in sourcing a wide variety of rooms. We have our own trusted maintenance engineers and cleaners on hand 24/7 to keep your room looking and feeling great.",
      bullets: [
        "In-house maintenance team, not third-party contractor",
        "24/7 emergency response line for urgent repair",
        "Regular property inspections and upkeep",
        "Flexible move-in and move-out arrangement",
      ],
      image: "/cleaner-window.avif",
      reverse: true,
    },
  ];

  return (
    <section className="py-6 px-4 md:py-20 md:px-12">
      <div className="max-w-7xl mx-auto space-y-14 ">
        {sections.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col md:flex-row items-stretch gap-6 md:gap-16 pb-10 border-b border-[#E8E4DF] md:border-none ${
              index === sections.length - 1 ? "border-none pb-0" : ""
            } ${item.reverse ? "md:flex-row-reverse" : ""}`}
          >
            {/* Image */}
            <div className="w-full md:w-1/2">
              <div className="relative w-full h-[220px] md:h-full md:min-h-[350px] overflow-hidden rounded-[16px] md:rounded-[20px]">
                <Image
                  src={item.image}
                  alt="feature"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Content */}
            <div className="w-full md:w-1/2 space-y-4 md:space-y-6 md:py-8">
              {/* Icon */}
              <div className="w-10 h-10 md:w-14 md:h-14 flex items-center justify-center bg-[#FF6B351A] rounded-lg text-sm md:text-lg">
                {item.icon}
              </div>

              {/* Heading */}
              <h2 className="text-[22px] md:text-[30px] leading-[1.25] text-[#1A1A1A] font-playfair font-semibold">
                {item.title}
                <span className="text-[#FF7A45]">{item.highlight}</span>
              </h2>

              {/* Description */}
              <p className="text-[#6B7280] text-[14px] md:text-[15px] leading-relaxed font-sans">
                {item.description}
              </p>

              {/* Bullets */}
              <ul className="space-y-2 md:space-y-3">
                {item.bullets.map((bullet, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 md:gap-3 text-[#6B7280] text-[13px] md:text-[14px] font-sans"
                  >
                    <span className="text-[#FF7A45] mt-[2px]">✓</span>
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyUs;