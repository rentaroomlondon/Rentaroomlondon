import { 
  LayoutDashboard, Building2, Search,
  Users, FileText, Bell, Wrench,
  CreditCard, BookImageIcon, LucideForm,
  MessageSquare, Mail, PhoneCall, X
} from 'lucide-react';
import { SidebarLink } from './SidebarLink';

export const Sidebar = ({ activeTab, setActiveTab, mobileNavOpen = false, onNavigate = () => {} }) => (
  <aside className={`fixed inset-y-0 left-0 z-50 flex h-screen w-72 flex-col bg-[#0B1727] font-sans text-[#64748B] transition-transform duration-200 lg:sticky lg:top-0 lg:z-auto lg:h-screen lg:w-64 lg:translate-x-0 ${mobileNavOpen ? "translate-x-0" : "-translate-x-full"}`}>

    <div className="flex items-start justify-between p-5 pb-2">
      <div>
      <img src="/rental-room-uk.avif" className="mb-2 h-auto w-18 max-w-full" />
      <div className="inline-block px-3 py-0.5 rounded-full border border-[#F47C3C33] bg-[#F47C3C2E]">
        <span className="text-[10px] text-[#F9A370] font-bold tracking-widest uppercase">
          Admin Portal
        </span>
      </div>
      </div>
      <button type="button" onClick={onNavigate} aria-label="Close navigation" className="rounded-md p-2 text-slate-300 hover:bg-white/10 lg:hidden"><X size={20} /></button>
    </div>

    <nav className="flex-1 px-3 mt-5 space-y-5 overflow-y-auto">

      {/* Overview */}
      <div>
        <p className="text-[10px] text-[#475569] font-bold mb-3 px-3">Overview</p>
        <SidebarLink icon={<LayoutDashboard size={20} />} label="Dashboard"
          active={activeTab === "dashboard"} onClick={() => { setActiveTab("dashboard"); onNavigate(); }} />
      </div>

      {/* Properties */}
      <div>
        <p className="text-[10px] text-[#475569] font-bold mb-3 px-3">Properties</p>
        <SidebarLink icon={<Building2 size={20} />} label="All Properties"
          active={activeTab === "properties"} onClick={() => { setActiveTab("properties"); onNavigate(); }} />
        <SidebarLink icon={<Search size={20} />} label="Listings"
          active={activeTab === "listings"} onClick={() => { setActiveTab("listings"); onNavigate(); }} />
        <SidebarLink icon={<BookImageIcon size={20} />} label="Viewing Requests"
          active={activeTab === "viewings"} onClick={() => { setActiveTab("viewings"); onNavigate(); }} />
      </div>

      {/* Tenants */}
      <div>
        <p className="text-[10px] text-[#475569] font-bold mb-3 px-3">Tenants</p>
        <SidebarLink icon={<Users size={20} />} label="All Tenants"
          active={activeTab === "tenants"} onClick={() => { setActiveTab("tenants"); onNavigate(); }} />
        <SidebarLink icon={<FileText size={20} />} label="Applications"
          active={activeTab === "applications"} onClick={() => { setActiveTab("applications"); onNavigate(); }} />
        <SidebarLink icon={<Bell size={20} />} label="Registrations"
          active={activeTab === "registrations"} onClick={() => { setActiveTab("registrations"); onNavigate(); }} />
      </div>

      {/* Leads */}
      <div>
        <p className="text-[10px] text-[#475569] font-bold mb-3 px-3">Leads</p>
        <SidebarLink icon={<PhoneCall size={20} />} label="Room Leads"
          active={activeTab === "leads"} onClick={() => { setActiveTab("leads"); onNavigate(); }} />
        <SidebarLink icon={<MessageSquare size={20} />} label="Enquiries"
          active={activeTab === "enquiries"} onClick={() => { setActiveTab("enquiries"); onNavigate(); }} />
        <SidebarLink icon={<Mail size={20} />} label="Contact Leads"
          active={activeTab === "contacts"} onClick={() => { setActiveTab("contacts"); onNavigate(); }} />
      </div>

      {/* Operations */}
      <div>
        <p className="text-[10px] text-[#475569] font-bold mb-3 px-3">Operations</p>
        <SidebarLink icon={<Wrench size={20} />} label="Maintenance"
          active={activeTab === "maintenance"} onClick={() => { setActiveTab("maintenance"); onNavigate(); }} />
        <SidebarLink icon={<CreditCard size={20} />} label="Payments"
          active={activeTab === "payments"} onClick={() => { setActiveTab("payments"); onNavigate(); }} />
        <SidebarLink icon={<LucideForm size={20} />} label="Blog"
          active={activeTab === "blog"} onClick={() => { setActiveTab("blog"); onNavigate(); }} />
      </div>

    </nav>
  </aside>
);
