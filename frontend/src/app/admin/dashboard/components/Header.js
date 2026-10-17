import React, { useState } from 'react';
import { Search, Bell, Mail, LogOut, Menu } from 'lucide-react';
import { IconButton } from './IconButton';
import { useAdminAuth } from '@/app/Context/AdminAuthContext';

export const Header = ({ title = "Dashboard", breadcrumb = "Overview", onMenuOpen = () => {} }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { admin, loadingAdmin, logoutAdmin } = useAdminAuth();

  // 🔤 Get initials from admin name
  const getInitials = (name) => {
    if (!name) return "A";
    return name
      .split(" ")
      .map(word => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="mb-4 flex min-w-0 items-center justify-between gap-3 border-b border-gray-100 bg-white px-3 py-3 sm:mb-6 sm:px-5 sm:py-4 lg:px-8">
      
      {/* Dynamic Title & Breadcrumb */}
      <div className="flex min-w-0 items-center gap-2">
        <button type="button" onClick={onMenuOpen} aria-label="Open navigation menu" className="shrink-0 rounded-lg border border-gray-200 p-2 text-slate-600 hover:bg-slate-50 lg:hidden">
          <Menu size={19} />
        </button>
        <div className="min-w-0">
        <h1 className="truncate text-lg font-bold leading-tight text-[#1e293b] sm:text-[22px]">
          {title}
        </h1>
        <p className="mt-0.5 hidden truncate text-[11px] font-medium text-gray-400 sm:block">
          RENTAROOMLONDON <span className="mx-1">›</span>{" "}
          <span className="text-orange-500">{breadcrumb}</span>
        </p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2 sm:gap-3 lg:gap-6">
        
        {/* Search Bar */}
        <div className="relative hidden md:block">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search tenants, properties, refs..."
            className="w-48 rounded-xl border border-gray-200 bg-[#f8fafc] py-2.5 pl-11 pr-4 text-sm transition-all placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 lg:w-[300px]"
          />
        </div>

        <div className="flex items-center gap-1 sm:gap-3">
          <span className="hidden sm:inline-flex"><IconButton icon={<Bell size={20} className="text-gray-500" />} badge /></span>
          <span className="hidden md:inline-flex"><IconButton icon={<Mail size={20} className="text-gray-500" />} badge /></span>
          
          {/* User Profile & Logout Dropdown */}
          <div className="relative ml-1">
            <button 
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0F172A] text-sm font-bold text-white shadow-lg shadow-slate-200 transition-colors hover:bg-slate-800 sm:h-10 sm:w-10"
            >
              {loadingAdmin ? "..." : getInitials(admin?.name)}
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-3 w-48 bg-white border border-gray-100 rounded-xl shadow-xl z-50 py-2">
                
                <div className="px-4 py-2 border-b border-gray-50">
                  <p className="text-xs text-gray-400">Signed in as</p>
                  <p className="text-sm font-semibold text-slate-900">
                    {admin?.name || "Admin User"}
                  </p>
                </div>

                <button 
                  onClick={() => {
                    setShowDropdown(false);
                    logoutAdmin();
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors"
                >
                  <LogOut size={16} />
                  Logout
                </button>

              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
