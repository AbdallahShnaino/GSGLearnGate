"use server";
import { authenticateUser } from "@/services/auth";
import { Role } from "@/types";
import { generateToken } from "@/utils/auth";
import { cookies } from "next/headers";

export type LoginUserStatus =
  | {
      success: false;
      message: string;
      error: string;
      userId: undefined;
      role: undefined;
    }
  | {
      success: true;
      message: string;
      error?: string;
      userId: number | undefined;
      role: Role | undefined;
    };

export async function loginUser(
  state: LoginUserStatus,
  formData: FormData
): Promise<LoginUserStatus> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  if (!email || !password) {
    return {
      success: false,
      message: "Please fill all the fields",
      error: "Please fill all the fields",
      userId: undefined,
      role: undefined,
    };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      success: false,
      message: "Invalid email format",
      error: "Invalid email format",
      userId: undefined,
      role: undefined,
    };
  }
  const authenticatedUser = await authenticateUser(email, password);
  if (!authenticatedUser) {
    return {
      success: false,
      message: "Invalid email or password",
      error: "Invalid email or password",
      userId: undefined,
      role: undefined,
    };
  } else {
    const token = generateToken({ userId: authenticatedUser.userId, email });

    const cookieStore = await cookies();
    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    });
    cookieStore.set("role", String(authenticatedUser.role));
    cookieStore.set("userId", String(authenticatedUser.userId));
    return {
      success: true,
      message: "Login Successfully",
      userId: authenticatedUser.userId,
      role: authenticatedUser.role,
    };
  }
}
