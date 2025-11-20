"use client";
import ManagementTable from "@/components/shared/ManagementTable";
import { ISpecialty } from "@/types/specialties.interface";
import { specialtiesColumns } from "./specialtiesColumns";
import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { deleteSpecialty } from "@/services/admin/specialtiesManagement";

interface SpecialtiesTableProps {
  specialties: ISpecialty[];
}

export default function SpecialtiesTable({
  specialties,
}: SpecialtiesTableProps) {
  const [deletingSpecialty, setDeletingSpecialty] = useState<ISpecialty | null>(
    null
  );
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  const [, startTransition] = useTransition();

  const handleDelete = (specialty: ISpecialty) => {
    setDeletingSpecialty(specialty);
  };

  const confirmDelete = async () => {
    if (!deletingSpecialty) {
      return;
    }

    setIsDeleting(true);
    const result = await deleteSpecialty(deletingSpecialty?.id);
    setIsDeleting(false);
    if (result.success) {
      toast.success(result.message);
      setDeletingSpecialty(null);
      startTransition(() => {
        router.refresh();
      });
    } else {
      toast.error(result.message);
    }
  };

  return (
    <>
      <ManagementTable
        data={specialties}
        columns={specialtiesColumns}
        onDelete={handleDelete}
        getRowKey={(specialty) => specialty.id}
      />
      <DeleteConfirmationDialog
        open={!!deletingSpecialty}
        onOpenChange={(open) => !open && setDeletingSpecialty(null)}
        onConfirm={confirmDelete}
        title="Delete Specialty"
        description={`Are you sure you want to delete ${deletingSpecialty?.title}. This action cannot be undone.`}
        isDeleting={isDeleting}
      />
    </>
  );
}
