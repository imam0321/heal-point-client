import SpecialtiesHeader from "@/components/modules/admin/SpecialtiesManagement/SpecialtiesHeader";
import SpecialtiesTable from "@/components/modules/admin/SpecialtiesManagement/SpecialtiesTable";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { getSpecialties } from "@/services/admin/specialtiesManagement";
import { Suspense } from "react";

export default async function SpecialtiesManagementPage() {
  const result = await getSpecialties();

  return (
    <div className="space-y-6">
      <SpecialtiesHeader />
      <Suspense fallback={<TableSkeleton columns={3} rows={10} />}>
        <SpecialtiesTable specialties={result.data} />
      </Suspense>
    </div>
  );
}
