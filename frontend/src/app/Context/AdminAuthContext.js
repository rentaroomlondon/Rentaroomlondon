"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
  const pathname = usePathname();
  const [admin, setAdmin] = useState(null);
  const [loadingAdmin, setLoadingAdmin] = useState(true);

  // 👑 Fetch current admin
  const fetchAdmin = async () => {
    setLoadingAdmin(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/me`,
        {
          credentials: "include",
        }
      );

      if (!res.ok) {
        setAdmin(null);
      } else {
        const data = await res.json();
        setAdmin(data.admin || null);
      }
    } catch (error) {
      console.error("Error fetching admin:", error);
      setAdmin(null);
    } finally {
      setLoadingAdmin(false);
    }
  };

  // 🔐 Admin logout
  const logoutAdmin = async () => {
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/logout`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      setAdmin(null);
      window.location.href = "/"; 
    } catch (error) {
      console.error("Admin logout error:", error);
    }
  };

  useEffect(() => {
    if (pathname === "/admin/login") {
      setLoadingAdmin(false);
      return;
    }
    fetchAdmin();
  }, [pathname]);

  return (
    <AdminAuthContext.Provider
      value={{
        admin,
        setAdmin,
        loadingAdmin,
        fetchAdmin,
        logoutAdmin,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => useContext(AdminAuthContext);
