/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useActionState } from "react";
import { registerPatient } from "@/services/auth/registerPatient";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function PatientRegisterForm() {
  const [state, formAction, isPending] = useActionState(registerPatient, null);

  return (
    <form action={formAction} className="space-y-4">
      <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
        <Field>
          <FieldLabel htmlFor="name">Full Name</FieldLabel>
          <Input id="name" name="name" placeholder="Enter full name" />
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
          <FieldLabel htmlFor="age">Age</FieldLabel>
          <Input
            id="age"
            type="number"
            min={0}
            name="age"
            placeholder="Enter your age"
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="gender">Gender</FieldLabel>
          <Select name="gender">
            <SelectTrigger id="gender">
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="MALE">Male</SelectItem>
              <SelectItem value="FEMALE">Female</SelectItem>
            </SelectContent>
          </Select>
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
        disabled={isPending}
        className="w-full bg-cyan-600 hover:bg-cyan-700 disabled:bg-cyan-400 text-white font-medium transition"
      >
        {isPending ? "Creating...." : "Create Account"}
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
