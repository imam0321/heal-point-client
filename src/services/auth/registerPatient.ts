/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

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
    console.log(ageValue, genderValue)

    const newFormData = new FormData();
    newFormData.append("data", JSON.stringify(registerData));

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/user/create-patient`, {
      method: "POST",
      body: newFormData
    }).then(res => res.json());

    return res

  } catch (error) {
    console.log(error)
    return error
  }
}