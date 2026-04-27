import React from 'react';

const PrivacyPolicy = () => {
  const sections = [
    {
      id: "1. ",
      title: "About RENTAROOMLONDON",
      content: "RENTAROOMLONDON is a private limited company. We specialise in residential lettings in London and operate the Rentaroomlondon website at RENTAROOMLONDON.co.uk."
    },
    {
      id: "2. ",
      title: "Data Subjects",
      content: "We process personal data related to various individuals, including but not limited to clients, potential clients, tenants, prospective tenants, landlords, guarantors, referees, representatives of business partners, suppliers, contractors, and our employees."
    },
    {
      id: "3. ",
      title: "Purpose of Data Processing",
      content: "We process personal data for specific purposes, including:",
      list: [
        "Fulfilling requested services",
        "Establishing or negotiating agreements",
        "Promoting our goods and services",
        "Managing accounts and records",
        "Meeting data retention requirements",
        "Complying with legal obligations",
        "Responding to law enforcement requests"
      ]
    },
    {
      id: "4. ",
      title: "Types of Personal Data",
      content: "To provide our lettings services, we collect and process the following categories of personal data: Contact information (name, address, phone, email), contact details of others involved in lettings transactions, passport or national identity information, financial details, land registry property ownership information, and identifiable images captured by CCTV on our premises."
    },
    {
      id: "5. ",
      title: "Use of Personal Data",
      content: "We use your personal data to administer contracted lettings services, facilitate property viewing and fulfilment, process payment transactions, send non-marketing service updates, process job applications, resolve complaints and disputes, and send offers and promotions with your consent."
    }
  ];

  return (
    <div className="py-20 px-6 font-sans antialiased text-[#4A4A4A]">
      {/* 1440px centered container */}
      <div className="max-w-[1280px] mx-auto">
        
        {/* Introduction */}
        <header className="mb-16">
          <h2 className="text-[15px] font-bold text-gray-500 mb-6">Introduction</h2>
          <p className="text-[16px] leading-[1.8] text-gray-600">
            This Privacy Policy outlines how Rentaroomlondon handles the personal data 
            we collect and process in compliance with UK data protection laws and the General Data Protection 
            Regulation (GDPR).
          </p>
        </header>

        {/* Content Sections */}
        <div className="space-y-14">
          {sections.map((section, index) => (
            <section key={index}>
              <h3 className="text-[26px] font-serif font-bold text-[#1A1A1A] mb-5">
                {section.id}{section.title}
              </h3>
              
              <p className="text-[16px] leading-[1.8] text-gray-600 mb-4">
                {section.content}
              </p>

              {section.list && (
                <ul className="space-y-3 mt-4">
                  {section.list.map((item, idx) => (
                    <li key={idx} className="flex items-start text-[16px] text-gray-600">
                      <span className="mr-3 mt-1.5 h-1.5 w-1.5 rounded-full bg-gray-400 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        <footer className="mt-20">
          <div className="bg-[#FFF9F6] rounded-[24px] p-10 md:p-14">
            <h4 className="text-[18px] font-medium text-[#6B7280] mb-2">
              Managing Director of Rentaroomlondon
            </h4>
            <p className="text-[18px] text-[#6B7280]">
              118 Cricklewood Broadway, NW2 3EJ
            </p>
          </div>
        </footer>
        
      </div>
    </div>
  );
};

export default PrivacyPolicy;