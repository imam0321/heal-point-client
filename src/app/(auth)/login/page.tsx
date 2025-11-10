import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import Image from "next/image";
import LoginForm from "@/components/modules/auth/LoginForm";

export default async function LoginPage({
  searchParams,
}: {
  searchParams?: Promise<{ redirect?: string }>;
}) {
  const params = (await searchParams) || {};

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl shadow-cyan-100">
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
              Welcome Heal Point
            </CardTitle>
            <CardDescription className="text-gray-500">
              Login to your account
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <LoginForm redirectPath={params?.redirect} />
        </CardContent>
      </Card>
    </div>
  );
}
