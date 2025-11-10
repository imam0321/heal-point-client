/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useActionState, useState } from "react";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { loginUser } from "@/services/auth/loginUser";

export default function LoginForm({ redirectPath }: { redirectPath?: string }) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [state, formAction, isPending] = useActionState(loginUser, null);

  return (
    <form action={formAction} className="space-y-4">
      {redirectPath && (
        <Input type="hidden" name="redirectPath" value={redirectPath} />
      )}
      <Field>
        <FieldLabel>Email Address</FieldLabel>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            className="pl-10"
          />
        </div>
      </Field>

      <Field>
        <FieldLabel>Password</FieldLabel>

        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="pl-10 pr-10"
          />

          <button
            type="button"
            className="absolute right-3 top-3 text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
      </Field>

      <div className="flex justify-end">
        <Button
          type="button"
          variant="link"
          className="text-sm text-cyan-500 hover:text-cyan-600 p-0 h-auto"
        >
          Forgot password?
        </Button>
      </div>

      <Button
        type="submit"
        className="w-full bg-cyan-600 hover:bg-cyan-700 disabled:bg-cyan-400 text-white font-medium transition"
        disabled={isPending}
      >
        {isPending ? "Login..." : "Login"}
      </Button>

      <div className="text-center text-sm text-gray-600">
        Do not have an account?{" "}
        <Link
          href="/register"
          className="text-cyan-500 hover:text-cyan-600 p-0 h-auto"
        >
          Registration
        </Link>
      </div>
    </form>
  );
}
