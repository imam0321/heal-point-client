"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    console.log({ email, password });
  };

  return (
    <form className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email" className="text-gray-700">
          Email Address
        </Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Password */}
      <div className="space-y-2 relative">
        <Label htmlFor="password" className="text-gray-700">
          Password
        </Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="password"
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
      </div>

      <Button
        variant="link"
        className="text-sm text-cyan-500 hover:text-cyan-600 p-0 h-auto"
      >
        Forgot password?
      </Button>

      {/* Sign In */}
      <Button
        onClick={handleLogin}
        className="w-full bg-cyan-500 hover:bg-cyan-600 text-white"
      >
        Login
      </Button>

      {/* Signup */}
      <div className="text-center text-sm text-gray-600">
        Do not have an account?{" "}
        <Button
          variant="link"
          className="text-cyan-500 hover:text-cyan-600 p-0 h-auto"
        >
          Registration
        </Button>
      </div>
    </form>
  );
}
