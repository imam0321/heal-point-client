import { Column } from "@/components/shared/ManagementTable";
import { IDoctor } from "@/types/doctor.interface";
import Image from "next/image";

export const doctorColumns: Column<IDoctor>[] = [
  {
    header: "Profile",
    accessor: (doctor) => (
      <Image
        src={doctor.profilePhoto ?? "/placeholder.png"}
        alt={doctor.name}
        width={40}
        height={40}
        className="rounded-full"
      />
    ),
  },
  {
    header: "Name",
    accessor: (doctor) => doctor.name,
  },
];
