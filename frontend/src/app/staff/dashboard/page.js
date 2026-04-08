"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Dashboard from "./component/Dashboard";
import { useStaffAuth } from "@/app/Context/StaffAuthContext";

const Page = () => {
  const { staff, loadingStaff } = useStaffAuth();
  const router = useRouter();

  useEffect(() => {
    if (loadingStaff) return;

    if (!staff) {
      router.replace("/staff/login");
    }
  }, [staff, loadingStaff]);

  if (loadingStaff) {
    return <p>Checking staff...</p>;
  }

  if (!staff) return null;

  return <Dashboard />;
};

export default Page;