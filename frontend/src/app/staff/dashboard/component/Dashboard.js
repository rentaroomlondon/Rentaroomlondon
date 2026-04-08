"use client";
import { useStaffAuth } from "@/app/Context/StaffAuthContext";
import MaintenanceDashboard from "./MaintenanceDashboard";
// import ListingDashboard from "./ListingDashboard";
// import AttendanceDashboard from "./AttendanceDashboard";

export default function Dashboard() {
  const { staff, logoutStaff } = useStaffAuth();

  return (
    <div className="p-6 space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Welcome, {staff?.name} 👋
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {staff?.role === "maintenance"
              ? "Manage your assigned maintenance tasks"
              : "Dashboard"}
          </p>
        </div>

        <button
          onClick={logoutStaff}
          className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white font-medium px-5 py-3 rounded-xl shadow-md hover:shadow-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 active:scale-95"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 16l4-4m0 0l-4-4m4 4H9m4 4v1m0-10V3"
            />
          </svg>
          Logout
        </button>
      </div>

      {/* ROLE BASED */}
      {staff?.role === "maintenance" && <MaintenanceDashboard />}
      {/* {staff?.role === "listing" && <ListingDashboard />} */}

      {/* All Staff */}
      {/* <AttendanceDashboard /> */}
    </div>
  );
}