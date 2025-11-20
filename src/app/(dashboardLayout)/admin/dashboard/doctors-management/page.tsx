import DoctorHeader from "@/components/modules/admin/DoctorsManagement/DoctorHeader";
import DoctorsTable from "@/components/modules/admin/DoctorsManagement/DoctorsTable";
import RefreshButton from "@/components/shared/RefreshButton";
import SearchFilter from "@/components/shared/SearchFilter";
import SelectFilter from "@/components/shared/SelectFilter";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getDoctors } from "@/services/admin/doctorsManagement";
import { getSpecialties } from "@/services/admin/specialtiesManagement";
import { ISpecialty } from "@/types/specialties.interface";
import { Suspense } from "react";

export default async function DoctorManagementPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);
  const specialtiesResult = await getSpecialties();
  const doctorsResult = await getDoctors(queryString);

  return (
    <div className="space-y-6">
      <DoctorHeader />
      <div className="flex items-center gap-2">
        <SearchFilter paramName="searchTerm" placeholder="Search doctors..." />
        <SelectFilter
          paramName="specialty"
          options={specialtiesResult.data.map((specialty: ISpecialty) => ({
            label: specialty.title,
            value: specialty.title,
          }))}
          placeholder="Filter by specialty"
        />
        <RefreshButton />
      </div>
      <Suspense fallback={<TableSkeleton columns={3} rows={10} />}>
        <DoctorsTable doctors={doctorsResult.data} />
      </Suspense>
    </div>
  );
}
