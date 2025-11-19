"use client";

import { useState } from "react";
import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { createDoctor } from "@/services/admin/doctorsManagement";

const DOCTOR_FORM_STEPS = 3;

export function DoctorRegisterForm() {
  const [currentStep, setCurrentStep] = useState(1);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [state, formAction, isPending] = useActionState(createDoctor, null);

  const [selectedSpecialty, setSelectedSpecialty] = useState("");

  const nextStep = () =>
    setCurrentStep((prev) => Math.min(prev + 1, DOCTOR_FORM_STEPS));

  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  return (
    <form action={formAction} className="space-y-6">
      {/* PROGRESS BAR */}
      <div className="flex gap-2">
        {[1, 2, 3].map((step) => (
          <div
            key={step}
            className={`h-2 flex-1 rounded-full ${
              currentStep >= step ? "bg-cyan-600" : "bg-gray-300"
            }`}
          ></div>
        ))}
      </div>
      {/* STEP 1 */}
      {currentStep === 1 && (
        <div className="space-y-4">
          {/* name & email */}
          <div className="lg:flex md:flex lg:justify-between md:justify-between items-center gap-2 md:space-y-0 space-y-2">
            <Field>
              <FieldLabel>Name</FieldLabel>
              <Input id="name" name="name" placeholder="Dr. John Doe" />
            </Field>
            <Field>
              <FieldLabel>Email</FieldLabel>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="doctor@example.com"
              />
            </Field>
          </div>
          {/* phone &  Gender*/}
          <div className="lg:flex md:flex lg:justify-between md:justify-between items-center gap-2 md:space-y-0 space-y-2">
            <Field>
              <FieldLabel>Contact Number</FieldLabel>
              <Input
                id="contactNumber"
                name="contactNumber"
                placeholder="01234567890"
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
            <FieldLabel>Address</FieldLabel>
            <Input
              id="address"
              name="address"
              placeholder="123 Main St, City"
            />
          </Field>
        </div>
      )}

      {/* STEP 2 */}
      {currentStep === 2 && (
        <div className="space-y-4">
          {/* Qualification & Designation */}
          <div className="lg:flex md:flex lg:justify-between md:justify-between items-center gap-2 md:space-y-0 space-y-2">
            <Field>
              <FieldLabel>Qualification</FieldLabel>
              <Input
                id="qualification"
                name="qualification"
                placeholder="MBBS, MD, etc"
              />
            </Field>
            <Field>
              <FieldLabel>Designation</FieldLabel>
              <Input
                id="designation"
                name="designation"
                placeholder="Senior Consultant"
              />
            </Field>
          </div>

          {/* Specialty & Current Working Place */}
          <div className="lg:flex md:flex lg:justify-between md:justify-between items-center gap-2 md:space-y-0 space-y-2">
            <Field>
              <FieldLabel>Specialty</FieldLabel>
              <Input
                id="specialties"
                name="specialties"
                type="hidden"
                defaultValue={selectedSpecialty}
              />

              <Select
                value={selectedSpecialty}
                onValueChange={setSelectedSpecialty}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select specialty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Cardiology">Cardiology</SelectItem>
                  <SelectItem value="Neurology">Neurology</SelectItem>
                  <SelectItem value="Dermatology">Dermatology</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <FieldLabel>Current Working Place</FieldLabel>
              <Input
                id="currentWorkingPlace"
                name="currentWorkingPlace"
                placeholder="City Hospital"
              />
            </Field>
          </div>
          {/* Registration Number & Experience*/}
          <div className="lg:flex md:flex lg:justify-between md:justify-between items-center gap-2 md:space-y-0 space-y-2">
            <Field>
              <FieldLabel>Registration Number</FieldLabel>
              <Input
                id="registrationNumber"
                name="registrationNumber"
                placeholder="REG123456"
              />
            </Field>

            <Field>
              <FieldLabel>Experience (Years)</FieldLabel>
              <Input
                id="experience"
                name="experience"
                type="number"
                placeholder="5"
              />
            </Field>
          </div>
        </div>
      )}

      {/* STEP 3 */}
      {currentStep === 3 && (
        <div className="space-y-4">
          <Field>
            <FieldLabel>Appointment Fee</FieldLabel>
            <Input
              id="appointmentFee"
              name="appointmentFee"
              type="number"
              placeholder="100"
            />
          </Field>

          <Field>
            <FieldLabel>Profile Photo</FieldLabel>
            <Input id="file" name="file" type="file" />
          </Field>
          {/* password & confirmPassword */}
          <div className="lg:flex md:flex lg:justify-between md:justify-between items-center gap-2 md:space-y-0 space-y-2">
            <Field>
              <FieldLabel>Password</FieldLabel>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter password"
              />
            </Field>
            <Field>
              <FieldLabel>Confirm Password</FieldLabel>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm password"
              />
            </Field>
          </div>
        </div>
      )}

      {/* FOOTER BUTTONS */}
      <div className="flex justify-between pt-8 border-t mt-4">
        {currentStep > 1 && (
          <Button
            variant="outline"
            onClick={prevStep}
            type="button"
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-5 h-5" /> Back
          </Button>
        )}

        {currentStep < 3 && (
          <Button
            onClick={nextStep}
            type="button"
            className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 ml-auto"
          >
            Next <ChevronRight className="w-5 h-5" />
          </Button>
        )}

        {currentStep === 3 && (
          <Button
            type="submit"
            disabled={isPending}
            className="bg-cyan-600 hover:bg-cyan-700 ml-auto"
          >
            {isPending ? "Creating..." : "Create Doctor"}
          </Button>
        )}
      </div>
    </form>
  );
}
