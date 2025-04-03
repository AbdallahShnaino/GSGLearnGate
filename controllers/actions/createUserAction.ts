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
  // Make authentication (check if email is used)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      success: false,
      message: "Invalid email format",
      error: "Invalid email format",
      userId: undefined,
    };
  }

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordRegex.test(password)) {
    return {
      success: false,
      message:
        "Password must be at least 8 characters long and include uppercase, lowercase, numbers, and special characters",
      error:
        "Password must be at least 8 characters long and include uppercase, lowercase, numbers, and special characters",
      userId: undefined,
    };
  }

  const nameRegex = /^[A-Za-z]+$/;
  if (!nameRegex.test(first_name) || !nameRegex.test(last_name)) {
    return {
      success: false,
      message: "First name and last name must contain only letters",
      error: "First name and last name must contain only letters",
      userId: undefined,
    };
  }

  const birthDate = new Date(dateOfBirth);
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();

  if (age < 16 || (age === 16 && today < new Date(birthDate.setFullYear(today.getFullYear())))) {
    return {
      success: false,
      message: "You must be at least 16 years old to register",
      error: "You must be at least 16 years old to register",
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
  );

  return Promise.resolve({
    success: true,
    message: "User created successfully",
    error: undefined,
    userId: newUser.id,
  });
}
