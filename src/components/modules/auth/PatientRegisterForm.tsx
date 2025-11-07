"use client";

import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PatientRegisterForm() {
  return (
    <form className="space-y-4">
      <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
        <Field>
          <FieldLabel htmlFor="fullName">Full Name</FieldLabel>
          <Input
            id="fullName"
            name="fullName"
            placeholder="Enter full name"
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="m@example.com"
          />
        </Field>
      </div>

      <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
      
        <Field>
          <FieldLabel htmlFor="phone">Phone Number</FieldLabel>
          <Input id="phone" name="phone" placeholder="Enter phone number" />
        </Field>

        <Field>
          <FieldLabel htmlFor="dob">Date of Birth</FieldLabel>
          <div className="relative">
            <Input id="dob" name="dob" type="date" />
          </div>
        </Field>
      </div>

      <Field>
        <FieldLabel htmlFor="password">Password</FieldLabel>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Create a password"
        />
      </Field>

      <Field>
        <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="Confirm password"
        />
      </Field>

      <Button
        type="submit"
        className="w-full bg-cyan-600 hover:bg-cyan-700 text-white"
      >
        Create Account
      </Button>
      <p className="text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link href="/login" className="text-cyan-600 hover:underline">
          Login
        </Link>
      </p>
    </form>
  );
}
