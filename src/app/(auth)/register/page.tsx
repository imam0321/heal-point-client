import Image from "next/image";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import RegisterForm from "@/components/modules/auth/PatientRegisterForm";

export default function PatientRegisterPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg shadow-xl shadow-cyan-100">
        <CardHeader className="space-y-4 text-center">
          <div className="flex justify-center">
            <Image
              src="/heal-point-icon.svg"
              alt="logo"
              width={60}
              height={60}
              className="rounded-lg shadow-md"
            />
          </div>
          <div>
            <CardTitle className="md:text-2xl text-lg font-bold text-gray-800">
              Join HealPoint
            </CardTitle>
            <CardDescription className="text-gray-500">
              Create your account to get started
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <RegisterForm />
        </CardContent>
      </Card>
    </div>
  );
}
