import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import Image from "next/image";
import LoginForm from "@/components/modules/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl shadow-cyan-100">
        <CardHeader className="space-y-4 text-center pb-2">
          <div className="mx-auto w-16 h-16 bg-linear-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
            <Image
              src="./heal-point-icon.svg"
              height={100}
              width={100}
              alt="logo"
            />
          </div>
          <div>
            <CardTitle className="md:text-2xl text-lg font-bold text-gray-800">
              Welcome to Heal Point
            </CardTitle>
            <CardDescription className="text-gray-500">
              Login to your account
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
}
