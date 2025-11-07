"use client";

import { useState } from "react";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, password });
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <Field>
        <FieldLabel>Email Address</FieldLabel>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        className="w-full bg-cyan-500 hover:bg-cyan-600 text-white"
      >
        Login
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
