import jwt from "jsonwebtoken";
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export function generateToken(payload: object) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(JWT_SECRET));
    return payload;
  } catch (error) {
    console.error("Error verifying token:", error);
    return null;
  }
}
