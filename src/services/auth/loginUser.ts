/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

export const loginUser = async (_currentState: any, formData: FormData): Promise<any> => {
  try {
    const loginData = {
      email: formData.get("email"),
      password: formData.get("password")
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(loginData)
    }).then(res => res.json());

    return res
  } catch (error) {
    console.log(error)
    return error
  }
}