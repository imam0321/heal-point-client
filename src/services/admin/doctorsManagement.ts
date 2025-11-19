/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zod-validator";
import { IDoctor } from "@/types/doctor.interface";
import { createDoctorZodSchema, updateDoctorZodSchema } from "@/zod/doctor.validation";

export const createDoctor = async (_prevState: any, formData: FormData) => {
  try {
    // Build the payload in the correct nested structure
    const payload = {
      password: formData.get("password") as string,
      doctor: {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        contactNumber: formData.get("contactNumber") as string,
        address: formData.get("address") as string,
        registrationNumber: formData.get("registrationNumber") as string,
        experience: Number(formData.get("experience") as string),
        gender: formData.get("gender") as "MALE" | "FEMALE",
        appointmentFee: Number(formData.get("appointmentFee") as string),
        qualification: formData.get("qualification") as string,
        currentWorkingPlace: formData.get("currentWorkingPlace") as string,
        designation: formData.get("designation") as string,
      }
    };

    // Validate with the correct structure
    const validated = zodValidator(payload, createDoctorZodSchema);
    if (!validated.success) {
      return validated;
    }

    // Build FormData for the API
    const newFormData = new FormData();
    newFormData.append("data", JSON.stringify(validated.data));

    if (formData.get("file")) {
      newFormData.append("file", formData.get("file") as Blob);
    }

    const res = await serverFetch.post("/user/create-doctor", {
      body: newFormData,
    });

    return await res.json();
  } catch (error: any) {
    console.log(error);
    return { success: false, message: error.message };
  }
}

export const getDoctors = async (queryString: string) => {
  try {
    const res = await serverFetch.get(`/doctor${queryString ? `?${queryString}` : ""}`)

    return await res.json();
  } catch (error) {
    console.log(error)
    return { success: false, message: 'Something went wrong' }
  }
}

export const getDoctorById = async (id: string) => {
  try {
    const res = await serverFetch.get(`/doctor/${id}`);
    return await res.json()
  } catch (error: any) {
    console.log(error)
    return { success: false, message: error.message }
  }
}

export const updateDoctor = async (id: string, _prevState: any, formData: FormData) => {
  try {
    const payload: Partial<IDoctor> = {
      name: formData.get("name") as string,
      contactNumber: formData.get("contactNumber") as string,
      address: formData.get("address") as string,
      registrationNumber: formData.get("registrationNumber") as string,
      experience: Number(formData.get("experience") as string),
      gender: formData.get("gender") as "MALE" | "FEMALE",
      appointmentFee: Number(formData.get("appointmentFee") as string),
      qualification: formData.get("qualification") as string,
      currentWorkingPlace: formData.get("currentWorkingPlace") as string,
      designation: formData.get("designation") as string,
    }

    const validated = zodValidator(payload, updateDoctorZodSchema);
    if (!validated.success) {
      return validated;
    }

    const res = await serverFetch.patch(`/doctor/${id}`, {
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(validated.data)
    })

    return res.json();
  } catch (error) {
    console.log(error)
    return { success: false, message: 'Something went wrong' }
  }
}

export const softDeleteDoctor = async (id: string) => {
  try {
    const res = await serverFetch.delete(`/doctor/soft/${id}`)
    return await res.json();
  } catch (error: any) {
    console.log(error)
    return { success: false, message: error.message }
  }
}

export const deleteDoctor = async (id: string) => {
  try {
    const res = await serverFetch.delete(`/doctor/${id}`)
    return await res.json();

  } catch (error: any) {
    console.log(error)
    return { success: false, message: error.message }
  }
}