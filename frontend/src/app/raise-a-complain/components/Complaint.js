import React from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

// Sidebar Step Item (Desktop)
const SidebarStep = ({ step, title, email, link, isLast }) => (
  <div className="hidden md:block mb-14">
    <h3 className="text-[#1A2332] font-bold text-[15px] mb-1">Step {step} — {title}</h3>
    {email ? (
      <p className="text-[14px] text-gray-500">
        Email: <a href={`mailto:${email}`} className="text-[#FF7A45] hover:underline">{email}</a>
      </p>
    ) : (
      <a href={link} target="_blank" rel="noreferrer" className="text-[#FF7A45] text-[14px] underline">
        {link.replace('https://', '')}
      </a>
    )}
  </div>
);

// Process Card (Mobile - Second Screenshot)
const ProcessCard = ({ step, title, email, detail, link }) => (
  <div className="md:hidden bg-[#FFF9F5] p-5 rounded-2xl mb-4 relative overflow-hidden">
    <div className="flex items-start gap-4">
      <div className="bg-[#FF7A45] text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">
        {step}
      </div>
      <div>
        <h3 className="font-bold text-[#1A2332] text-[16px]">{title}</h3>
        <p className="text-[13px] text-gray-600 mt-1 leading-relaxed">
          {email && (
            <>
              Email: <span className="text-[#FF7A45]">{email}</span> — {detail}
            </>
          )}
          {link && (
            <>
              Independent review at <span className="text-[#FF7A45] underline">{link}</span>
            </>
          )}
        </p>
      </div>
    </div>
  </div>
);

const Complaint = () => {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col md:flex-row w-full max-w-[1440px]">
        
        {/* SIDEBAR (Desktop Left / Mobile Top) */}
        <aside className="w-full md:basis-[28%] md:bg-[#FFF9F5] p-6 md:pt-16">
          
          {/* Mobile Badge Only */}
          <div className="md:hidden mb-6">
             <span className="bg-[#FFF1E9] text-[#FF7A45] px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider">
               3-Step Process
             </span>
          </div>

          {/* Desktop "Need to complain?" Card */}
          <div className="hidden md:block bg-[#FF6B35] text-white p-8 rounded-2xl mb-12 shadow-sm">
            <h2 className="text-[16px] font-bold mb-3">Need to complain?</h2>
            <p className="text-[13px] leading-relaxed opacity-90">
              We aim to resolve all complaints within 15 working days of receiving them.
            </p>
          </div>

          {/* Steps List - Desktop */}
        <div className="hidden md:block md:pl-6">
            <SidebarStep step="1" title="Manager" email="info@rentaroomlondon.co.uk" />
            <SidebarStep step="2" title="Managing Director" email="info@rentaroomlondon.co.uk" />
            <SidebarStep step="3" title="PRS" link="https://www.theprs.co.uk" />
        </div>

          {/* Steps List - Mobile (Cards from 2nd screenshot) */}
          <ProcessCard 
            step="1" 
            title="Write to the Manager" 
            email="info@rentaroomlondon.co.uk" 
            detail="Response within 15 working days." 
          />
          <ProcessCard 
            step="2" 
            title="Escalate to Managing Director" 
            email="info@rentaroomlondon.co.uk" 
            detail="or write to 1st Floor, 3-5 Globe Road, E1 4DT." 
          />
          <ProcessCard 
            step="3" 
            title="Refer to PRS" 
            link="www.theprs.co.uk" 
          />

          {/* Desktop Contact Button */}
          <Link
            href="/contact-us"
            className="hidden md:flex w-full bg-[#FF7A45] text-white py-4 rounded-xl font-bold text-[14px] items-center justify-center gap-2 hover:bg-[#e66a3a] transition-all mt-8 uppercase tracking-wide no-underline"
          >
            Contact Us
            <ArrowRight className="w-4 h-4" />
          </Link>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 p-6 md:p-16 lg:p-16">
          <h1 className="text-[28px] md:text-[32px] font-playfair font-bold text-[#1A2332] mb-8 leading-tight">
            Customer Complaint Procedure
          </h1>

          <div className="text-[#6B7280] font-sans text-[14px] md:text-[15px] space-y-6 leading-relaxed">
            <p>
              We value the opinions of our customers and clients and are committed to providing a professional service at all times. If something does not go as well as expected we want to hear about it. In line with PRS Code of Practice our complaint handling procedure is outlined below:
            </p>

            <div className="space-y-4 mt-4">
              <p>
                <span className="font-bold text-[#1A2332]">Step 1:</span> In the first instance you should write to the Manager of the office at <a href="mailto:info@rentaroomlondon.co.uk" className="text-[#FF7A45] underline">info@rentaroomlondon.co.uk</a>, giving full details of your complaint. Once your complaint has been received, we will acknowledge receipt within 3 working days. An investigation will then be undertaken and you will receive a response to your complaint within 15 working days.
              </p>

              <p>
                <span className="font-bold text-[#1A2332]">Step 2:</span> If you remain dissatisfied with our company's final viewpoint you can then refer your case to PRS for their independent review. Details of their complaints procedure can be found at <a href="https://www.theprs.co.uk" className="text-[#FF7A45] underline">https://www.theprs.co.uk/</a>.
              </p>
            </div>

            <p className="pt-2">
              You have 12 months from the date of our company final viewpoint to refer the matter to The Property Redress Scheme.
            </p>

            {/* Footer Info Box */}
            <div className="mt-10 p-8 bg-[#FFF9F5] border-l-[3px] border-[#FF7A45] rounded-r-2xl space-y-4">
              <p className="text-[#1A2332]">
                <span className="font-bold">Contact:</span> <a href="mailto:info@rentaroomlondon.co.uk" className="text-[#FF7A45] underline">info@rentaroomlondon.co.uk</a>
              </p>
              
              <div className="text-[14px] text-gray-500 space-y-1">
                <p>Rentaroomlondon</p>
                <p>office: 118 Cricklewood Broadway, NW2 3EJ</p>
              </div>
            </div>

            {/* Mobile Contact Button */}
            <div className="md:hidden ">
              <Link
                href="/contact-us"
                className="w-full bg-[#FF7A45] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#e66a3a] transition-colors no-underline"
              >
                CONTACT US
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </main>

      </div>
    </div>
  );
};

export default Complaint;