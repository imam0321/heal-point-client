/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { loginUser } from "./loginUser";

export const registerPatient = async (_currentState: any, formData: FormData) => {
  try {
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");
    const ageValue = formData.get("age");
    const genderValue = formData.get("gender");

    if (password !== confirmPassword) {
      return {
        success: false,
        error: "Passwords do not match"
      };
    }

    const registerData = {
      password: password,
      patient: {
        name: formData.get("name"),
        email: formData.get("email"),
        age: Number(ageValue),
        gender: genderValue
      }
    }

    const newFormData = new FormData();
    newFormData.append("data", JSON.stringify(registerData));

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/user/create-patient`, {
      method: "POST",
      body: newFormData
    })

    const result = await res.json();

    if (result.success) {
      await loginUser(_currentState, formData);
    }

    return result

  } catch (error: any) {
    if (error?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error
    }
    return error
  }
}