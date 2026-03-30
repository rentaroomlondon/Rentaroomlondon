import React from "react";

const LegalFooter = ({ items = [] }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="hidden md:block w-full bg-[#1A2332] py-8">
      <div className="max-w-7xl mx-auto px-4 text-center space-y-2">

        {/* Main Items */}
        {items.length > 0 && (
          <p className="text-[#FFFFFF4D] text-sm font-light tracking-wide flex items-center justify-center flex-wrap gap-2">
            {items.map((item, index) => (
              <React.Fragment key={index}>
                <span>{item.replace("{year}", currentYear)}</span>

                {index !== items.length - 1 && (
                  <span className="hidden md:inline text-[#FFFFFF4D]">|</span>
                )}
              </React.Fragment>
            ))}
          </p>
        )}
      </div>
    </footer>
  );
};

export default LegalFooter;