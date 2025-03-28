"use server";

import { createNewUser } from "@/services/auth";

export type SubmitUserStatus =
  | {
      // Failed status
      success: false;
      message: string;
      error: string;
      userId: undefined;
    }
  | {
      // Success status
      success: true;
      message: string;
      error?: string;
      userId: number;
    };

export async function submitUser(
  state: SubmitUserStatus,
  formData: FormData
): Promise<SubmitUserStatus> {
  const city = formData.get("city") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const first_name = formData.get("first_name") as string;
  const last_name = formData.get("last_name") as string;
  const dateOfBirth = formData.get("date_of_birth") as string;

  if (!email || !password || !first_name || !last_name || !dateOfBirth) {
    return {
      success: false,
      message: "Please fill all the fields",
      error: "Please fill all the fields",
      userId: undefined,
    };
  }

  const newUser = await createNewUser(
    city,
    dateOfBirth,
    email,
    first_name,
    last_name,
    password
  )

  return Promise.resolve({
    success: true,
    message: "User created successfully",
    error: undefined,
    userId: newUser.id,
  });
}
