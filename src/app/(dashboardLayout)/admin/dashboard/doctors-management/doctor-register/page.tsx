import { DoctorRegisterForm } from "@/components/modules/admin/DoctorsManagement/DoctorRegisterForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DoctorRegisterPage() {
  return (
    <div className="max-h-screen bg-linear-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center md-p-4">
      <Card className="w-full max-w-xl shadow-xl shadow-cyan-100 border rounded-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-800">
            Doctor Registration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <DoctorRegisterForm />
        </CardContent>
      </Card>
    </div>
  );
}
