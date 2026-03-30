import React from 'react';
import { AlertTriangle, ArrowRight } from 'lucide-react';

// Sidebar Item
const SidebarItem = ({ icon, label, phone, className }) => (
  <div className={`md:bg-white bg-[#FFF7F2] p-4 rounded-xl md:border md:border-gray-100 flex flex-col hover:shadow-md transition-shadow ${className}`}>
    <div className="flex items-center gap-2 text-[13px] font-bold text-[#1A2332]">
      {icon} {label}
    </div>
    <span className="text-[#FF6B35] text-[14px] font-bold mt-1">{phone}</span>
  </div>
);

const Emergency = () => {
  const sidebarItems = [
    { icon: "🔥", label: 'Fire', phone: '999' },
    { icon: "⛽", label: 'Gas Leak', phone: '0800 111 99' },
    { icon: "🚔", label: 'Crime', phone: '999 or 101' },
    { icon: "💧", label: 'No Water', phone: '0800 316 980' },
    { icon: "⚡", label: 'Power Cut', phone: '105' },
  ];

  return (
    <div className="bg-white flex justify-center">
      <div className="flex flex-col md:flex-row w-full max-w-[1440px]">
        {/* Sidebar */}
        <aside className="w-full md:basis-[30%] md:bg-[#FFF9F5] p-6 md:pt-16 space-y-6">
          {/* Emergency Card */}
          <div className="bg-[#FF7A45] text-white p-6 rounded-2xl text-center shadow-lg">
            <p className="text-xs font-sans font-bold uppercase tracking-widest mb-2 flex justify-center items-center gap-2">
              🚨 Emergency Line
            </p>
            <h2 className="text-[28px] font-playfair font-bold">020 4570 319</h2>
          </div>

          {/* Sidebar Items */}
          <div className="grid grid-cols-2 gap-3 md:block md:space-y-3">
            {sidebarItems.map((item, idx) => (
              <SidebarItem key={idx} {...item} />
            ))}

            {/* Duplicate Power Cut card only for mobile */}
            <SidebarItem
              icon="⚡"
              label="Power Cut"
              phone="105"
              className="block md:hidden"
            />
          </div>

          {/* Contact Button (hidden on mobile, we’ll show it below main content) */}
          <a
            href="/contact-us"
            className="hidden md:flex w-full bg-[#FF7A45] text-white py-4 rounded-xl font-bold text-[15px] items-center justify-center gap-2 hover:bg-[#e66a3a] transition-colors mt-4 no-underline"
          >
            CONTACT US
            <ArrowRight className="w-5 h-5" />
          </a>
        </aside>

        {/* Main Content */}
        <main className="flex-1 md:basis-[70%] p-5 md:p-16">
          <h1 className="text-[22px] md:text-3xl font-playfair font-bold text-[#1A2332] mb-6 ">
            Out of Office Hours Emergencies
          </h1>

          <div className="text-[#6B7280] font-sans text-[15px] space-y-4 md:space-y-6 leading-relaxed">
            <p>
              Our normal hours of service are: <span className="font-bold text-gray-800">Monday to Friday from 10 am to 5 pm and Saturdays from 10 am to 3 pm.</span>
            </p>

            <p>In the unfortunate event of an emergency maintenance issue arising outside these times then please note:</p>

            <ol className="list-decimal pl-5 space-y-4 md:space-y-6">
              <li>
                The fastest and most effective way to report an issue is to <a href="#" className="text-[#FF7A45] underline font-medium">click here</a>; providing as much detail as you can and where possible,
including as many pictures as you can too. In the case of an emergency, you will be contacted within 30 minutes of logging your issue
by text or phone by a member of our team with further instructions and advice.</li>
              <li>
                If you are unable to use this link for any reason, then please call our dedicated property management line and our team will be able to assist you with the process. Please be aware that our new dedicated Property Management Number is: <span className="text-[#FF7A45] font-bold">020 4570 3191</span>.
              </li>
            </ol>

            <div className="pt-2">
              <p className="mb-2 md:mb-4">For guidance, some examples of what we might define as 'emergency' are:</p>
              <ul className="list-disc pl-5 space-y-1 md:space-y-2 text-[#FF7A45]">
                <li><span className="text-gray-600">Water Leaks</span></li>
                <li><span className="text-gray-600">Boiler breakdowns</span></li>
                <li><span className="text-gray-600">Malfunctioning locks</span></li>
                <li><span className="text-gray-600">No electricity</span></li>
                <li><span className="text-gray-600">Lack of heating or hot water</span></li>
              </ul>
            </div>

            {/* Warning Note */}
            <div className="mt-6 md:mt-10 p-4 md:p-6 bg-[#FFF4F0] border-l-4 border-[#FF7A45] rounded-r-xl">
              <p className="text-[#1A2332] font-sans text-[13px] md:text-[15px] leading-relaxed">
                ⚠️ <span className="font-bold">Important Note:</span> You may be liable for costs or may not be refunded for expenses incurred if you engage services that are not
authorised and/or not be considered an emergency.
              </p>
            </div>

            {/* Contact Button for mobile only */}
            <div className="md:hidden mt-6">
              <a
                href="/contact-us"
                className="w-full bg-[#FF7A45] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#e66a3a] transition-colors no-underline"
              >
                CONTACT US
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Emergency;