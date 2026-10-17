"use client";

import { useState } from "react";
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import DashboardHome from "./DashboardHome";
import Registrations from "./Registrations";
import Maintenance from "./Maintenance";
import PropertyManager from "./PropertyManager";
import Listings from "./Listings";
import ViewingRequests from "./ViewingRequests";
import Applications from "./Applications";
import Blog from "./Blog";
import RoomLeads from "./RoomLeads";       // ← new
import Enquiries from "./Enquiries";       // ← new
import ContactLeads from "./ContactLeads"; // ← new

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // 🔥 Header mapping
  const headerMap = {
    dashboard: { title: "Dashboard", breadcrumb: "Overview" },
    properties: { title: "Properties", breadcrumb: "All Properties" },
    listings: { title: "Listings", breadcrumb: "Search Listings" },
    viewings: { title: "Viewing Requests", breadcrumb: "All Requests" },
    tenants: { title: "Tenants", breadcrumb: "All Tenants" },
    applications: { title: "Applications", breadcrumb: "Tenant Applications" },
    registrations: { title: "Registrations", breadcrumb: "New Users" },
    maintenance: { title: "Maintenance", breadcrumb: "Requests" },
    payments: { title: "Payments", breadcrumb: "Transactions" },
    blog: { title: "Blog", breadcrumb: "Blog Posts" },
    leads: { title: "Room Leads", breadcrumb: "All Room Leads" },
    enquiries: { title: "Enquiries", breadcrumb: "All Enquiries" },
    contacts: { title: "Contact Leads", breadcrumb: "All Contact Messages" },
  };

  // 🔥 Component mapping
  const componentMap = {
    dashboard: <DashboardHome />,
    properties: <PropertyManager />,
    listings: <Listings />,
    viewings: <ViewingRequests />,
    tenants: <div className="bg-white p-6 rounded-xl">All Tenants</div>,
    applications: <Applications />,
    registrations: <Registrations />,
    maintenance: <Maintenance />,
    payments: <div className="bg-white p-6 rounded-xl">Payments</div>,
    blog: <Blog />,
    leads: <RoomLeads />,
    enquiries: <Enquiries />,
    contacts: <ContactLeads />,
  };

  return (
    <div className="min-h-screen bg-[#F8F9FB] font-sans text-gray-800 lg:flex">
      {mobileNavOpen && <button type="button" aria-label="Close navigation menu" onClick={() => setMobileNavOpen(false)} className="fixed inset-0 z-40 bg-slate-950/50 lg:hidden" />}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} mobileNavOpen={mobileNavOpen} onNavigate={() => setMobileNavOpen(false)} />

      <div className="min-w-0 flex-1">
        <Header {...headerMap[activeTab]} onMenuOpen={() => setMobileNavOpen(true)} />
        <main className="min-w-0 px-3 py-4 sm:px-5 lg:p-8">
          <div className="min-w-0">{componentMap[activeTab]}</div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
