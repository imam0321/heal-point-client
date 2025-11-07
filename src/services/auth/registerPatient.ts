/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

export const registerPatient = async (_currentState: any, formData: FormData) => {
  try {
    const registerData = {
      password: formData.get("password"),
      patient: {
        name: formData.get("name"),
        email: formData.get("email"),
        contactNumber: formData.get("phone")
      }
    }

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