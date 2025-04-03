"use server";

import { authenticateUser } from "@/services/auth";

export type LoginUserStatus =
  | {
      success: false;
      message: string;
      error: string;
      userId: undefined;
    }
  | {
      success: true;
      message: string;
      error?: string;
      userId: number | undefined;
    };

export async function loginUser(
  state: LoginUserStatus,
  formData: FormData
): Promise<LoginUserStatus> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  console.log(email);
  console.log(password);

  if (!email || !password) {
    return {
      success: false,
      message: "Please fill all the fields",
      error: "Please fill all the fields",
      userId: undefined,
    };
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      success: false,
      message: "Invalid email format",
      error: "Invalid email format",
      userId: undefined,
    };
  }

  // Authenticate user
  const authenticatedUser = await authenticateUser(email, password);
  if (!authenticatedUser) {
    return {
      success: false,
      message: "Invalid email or password",
      error: "Invalid email or password",
      userId: undefined,
    };
  } else {
    return {
      success: true,
      message: "Login Successfully",
      userId: authenticatedUser.userId,
    };
  }
}
