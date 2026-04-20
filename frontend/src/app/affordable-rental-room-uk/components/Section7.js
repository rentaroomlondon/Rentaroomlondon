import React from "react";
import { HelpCircle, ShieldAlert, Users, Receipt } from "lucide-react";
import Link from "next/link";

const Section7 = () => {
  const faqData = [
    {
      id: 1,
      question: "How can we rent a room safely?",
      icon: <ShieldAlert className="text-[#FF6B35]" />,
      content: (
        <div className="space-y-3">
          <p className="font-bold text-[#1A2332]">Paying deposit money:</p>
          <ul className="list-disc pl-5 space-y-2 text-gray-600">
            <li>Find out from your landlord whether you have to pay rent in advance and how much the deposit is.</li>
            <li>Request a receipt for any initial payments.</li>
            <li>Find out the requirements for receiving your deposit refunded.</li>
            <li>When you move in, take pictures of the room for possible damage so you won't be charged for it later.</li>
          </ul>
        </div>
      ),
    },
    {
      id: 2,
      question: "What knowledge is required for renting properties?",
      icon: <HelpCircle className="text-[#FF6B35]" />,
      content: (
        <p className="text-gray-600 leading-relaxed">
          Always seek clarification from the owner regarding all leasing terms and conditions, 
          such as access to the kitchen and other spaces, whether or not you may have guests, 
          and the amount of notice needed to quit.
        </p>
      ),
    },
    {
      id: 3,
      question: "Why can't my entire family be in the same room?",
      icon: <Users className="text-[#FF6B35]" />,
      content: (
        <p className="text-gray-600 leading-relaxed">
          Landlords in the UK rent out individual rooms to single people or sometimes couples. 
          A family sharing a room is not permitted by law or culture.
        </p>
      ),
    },
    {
      id: 4,
      question: "What bills can I expect to pay?",
      icon: <Receipt className="text-[#FF6B35]" />,
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-xl">
            <span className="font-bold block text-[#1A2332]">Council Tax</span>
            <span className="text-sm text-gray-500">Monthly charge (Students are exempt).</span>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl">
            <span className="font-bold block text-[#1A2332]">Utility Bills</span>
            <span className="text-sm text-gray-500">Water, electricity, gas and/or oil.</span>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl">
            <span className="font-bold block text-[#1A2332]">Communications</span>
            <span className="text-sm text-gray-500">Telephone, internet and TV.</span>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl">
            <span className="font-bold block text-[#1A2332]">Other Charges</span>
            <span className="text-sm text-gray-500">Parking permits, gardeners, or cleaners.</span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section className="py-14 px-5 md:px-12 bg-[#FAF9F6]">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-[32px] md:text-[42px] font-semibold text-[#1A2332] font-playfair leading-tight">
            People Also Ask, <span className="italic">while Renting a Property in the UK</span>
          </h2>
          <div className="w-20 h-1 bg-[#FF6B35] mx-auto rounded-full"></div>
        </div>

        {/* Knowledge Flow */}
        <div className="space-y-6">
          {faqData.map((item) => (
            <div 
              key={item.id} 
              className="bg-white rounded-3xl border border-[#E8E4DF] overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <div className="p-6 md:p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-[#FF6B3514] rounded-2xl">
                    {item.icon}
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-[#1A2332] font-sans">
                    {item.question}
                  </h3>
                </div>
                
                <div className="pl-0 md:pl-16">
                  {item.content}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Final CTA Tip */}
        <div className="mt-12 text-center p-6 sm:p-8 bg-[#1A2332] rounded-[24px] sm:rounded-[32px] text-white">
          <p className="text-base sm:text-lg font-playfair italic mb-4 sm:mb-6">
            Still have questions about renting in London?
          </p>

          <Link
            href="/contact-us"
            className="
              inline-block
              bg-[#FF6B35]
              text-white
              px-5 sm:px-8 md:px-10
              py-3
              rounded-full
              font-bold
              uppercase
              tracking-wide sm:tracking-widest
              text-[12px] sm:text-sm
              hover:bg-[#e55a2a]
              hover:scale-[1.02]
              transition-all
              duration-300
              shadow-lg
              text-center
              leading-snug
            "
          >
            Contact Our Support Team
          </Link>
        </div>

      </div>
    </section>
  );
};

export default Section7;