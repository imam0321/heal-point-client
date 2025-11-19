import DoctorHeader from "@/components/modules/admin/DoctorsManagement/DoctorHeader";
import RefreshButton from "@/components/shared/RefreshButton";
import SearchFilter from "@/components/shared/SearchFilter";
import SelectFilter from "@/components/shared/SelectFilter";
import { getSpecialties } from "@/services/admin/specialtiesManagement";
import { ISpecialty } from "@/types/specialties.interface";

export default async function DoctorManagementPage() {
  const specialtiesResult = await getSpecialties();
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
        />
        <RefreshButton />
      </div>
      {/* <Suspense fallback={<TableSkeleton columns={3} rows={10} />}>
            <SpecialtiesTable specialties={result.data} />
          </Suspense> */}
    </div>
  );
}
