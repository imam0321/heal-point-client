"use client";
import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import { Plus } from "lucide-react";

export default function DoctorHeader() {
  return (
    <>
      <ManagementPageHeader
        title="Doctor Management"
        description="This is a Doctor Management"
        action={{
          type: "link",
          label: "Create Doctor",
          icon: Plus,
          href: "/admin/dashboard/doctors-management/doctor-register",
        }}
      />
    </>
  );
}
