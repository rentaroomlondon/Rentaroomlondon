import { 
  LayoutDashboard, BarChart3, Building2, Search, 
  Users, FileText, ClipboardList, Bell, Wrench, 
  CreditCard, Settings, BookImageIcon, LucideForm,
  MessageSquare, Mail, PhoneCall
} from 'lucide-react';
import { SidebarLink } from './SidebarLink';

export const Sidebar = ({ activeTab, setActiveTab }) => (
  <aside className="w-64 bg-[#0B1727] text-[#64748B] flex flex-col h-screen sticky top-0 font-sans">

    <div className="p-5 pb-2">
      <img src="/rental-room-uk.avif" className="w-18 h-auto mb-2" />
      <div className="inline-block px-3 py-0.5 rounded-full border border-[#F47C3C33] bg-[#F47C3C2E]">
        <span className="text-[10px] text-[#F9A370] font-bold tracking-widest uppercase">
          Admin Portal
        </span>
      </div>
    </div>

    <nav className="flex-1 px-3 mt-5 space-y-5 overflow-y-auto">

      {/* Overview */}
      <div>
        <p className="text-[10px] text-[#475569] font-bold mb-3 px-3">Overview</p>
        <SidebarLink icon={<LayoutDashboard size={20} />} label="Dashboard"
          active={activeTab === "dashboard"} onClick={() => setActiveTab("dashboard")} />
      </div>

      {/* Properties */}
      <div>
        <p className="text-[10px] text-[#475569] font-bold mb-3 px-3">Properties</p>
        <SidebarLink icon={<Building2 size={20} />} label="All Properties"
          active={activeTab === "properties"} onClick={() => setActiveTab("properties")} />
        <SidebarLink icon={<Search size={20} />} label="Listings"
          active={activeTab === "listings"} onClick={() => setActiveTab("listings")} />
        <SidebarLink icon={<BookImageIcon size={20} />} label="Viewing Requests"
          active={activeTab === "viewings"} onClick={() => setActiveTab("viewings")} />
      </div>

      {/* Tenants */}
      <div>
        <p className="text-[10px] text-[#475569] font-bold mb-3 px-3">Tenants</p>
        <SidebarLink icon={<Users size={20} />} label="All Tenants"
          active={activeTab === "tenants"} onClick={() => setActiveTab("tenants")} />
        <SidebarLink icon={<FileText size={20} />} label="Applications"
          active={activeTab === "applications"} onClick={() => setActiveTab("applications")} />
        <SidebarLink icon={<Bell size={20} />} label="Registrations"
          active={activeTab === "registrations"} onClick={() => setActiveTab("registrations")} />
      </div>

      {/* Leads */}
      <div>
        <p className="text-[10px] text-[#475569] font-bold mb-3 px-3">Leads</p>
        <SidebarLink icon={<PhoneCall size={20} />} label="Room Leads"
          active={activeTab === "leads"} onClick={() => setActiveTab("leads")} />
        <SidebarLink icon={<MessageSquare size={20} />} label="Enquiries"
          active={activeTab === "enquiries"} onClick={() => setActiveTab("enquiries")} />
        <SidebarLink icon={<Mail size={20} />} label="Contact Leads"
          active={activeTab === "contacts"} onClick={() => setActiveTab("contacts")} />
      </div>

      {/* Operations */}
      <div>
        <p className="text-[10px] text-[#475569] font-bold mb-3 px-3">Operations</p>
        <SidebarLink icon={<Wrench size={20} />} label="Maintenance"
          active={activeTab === "maintenance"} onClick={() => setActiveTab("maintenance")} />
        <SidebarLink icon={<CreditCard size={20} />} label="Payments"
          active={activeTab === "payments"} onClick={() => setActiveTab("payments")} />
        <SidebarLink icon={<LucideForm size={20} />} label="Blog"
          active={activeTab === "blog"} onClick={() => setActiveTab("blog")} />
      </div>

    </nav>
  </aside>
);