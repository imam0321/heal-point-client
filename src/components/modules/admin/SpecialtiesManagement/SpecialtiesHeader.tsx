"use client"
import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import { Plus } from "lucide-react";
import SpecialtyForm from "./SpecialtyForm";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

export default function SpecialtiesHeader() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();
  const [, startTransition] = useTransition();

  const handleSuccess = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <>
      <SpecialtyForm
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSuccess={handleSuccess}
      />
      <ManagementPageHeader
        title="Specialties Management"
        description="This is a Specialties Management"
        action={{
          label: "Add Specialty",
          icon: Plus,
          onClick: () => setIsDialogOpen(true),
        }}
      />
    </>
  );
}
