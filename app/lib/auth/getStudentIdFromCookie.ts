import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function getStudentIdFromCookie(): Promise<string | null> {
  const cookieStore = cookies();
  const token = (await cookieStore).get("token")?.value;
  let studentId: string | null = null;

  if (token) {
    try {
      const decoded = jwt.decode(token) as { userId?: string };
      studentId = decoded?.userId || null;
    } catch (err) {
      console.error("Invalid token", err);
    }
  }

  return studentId;
}
