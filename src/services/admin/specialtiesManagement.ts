/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetch } from "@/lib/server-fetch";
import z from "zod";

const createSpecialtyZodSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long.")
})

export const createSpecialty = async (_prevState: any, formData: FormData) => {
  try {
    const payload = {
      title: formData.get("title") as string,
    }

    const validatedPayload = createSpecialtyZodSchema.safeParse(payload);
    if (!validatedPayload.success) {
      return {
        success: false,
        errors: validatedPayload.error.issues.map(issue => {
          return {
            field: issue.path[0],
            message: issue.message
          }
        })
      }
    }

    const newFormData = new FormData();
    newFormData.append("data", JSON.stringify(validatedPayload));

    if (formData.get("file")) {
      newFormData.append("file", formData.get("file") as Blob)
    }

    const res = await serverFetch.post("/specialties", {
      body: newFormData,
    });

    const result = await res.json();

    return result
  } catch (error: any) {
    console.log(error)
    return {
      success: false,
      message: error?.message || "something went wrong"
    }
  }
}

export const getSpecialty = async () => {
  try {
    const res = await serverFetch.get("/specialties");
    return await res.json();
  } catch (error: any) {
    console.log(error)
    return {
      success: false,
      message: error?.message || "something went wrong"
    }
  }
}

export const deleteSpecialty = async (id: string) => {
  try {
    const res = await serverFetch.delete(`/specialties/${id}`);
    return await res.json();
  } catch (error: any) {
    console.log(error)
    return {
      success: false,
      message: error?.message || "something went wrong"
    }
  }
}