import { getUserByEmail } from "@/src/db/queries/select";
import { Role } from "@/types";
import { comparePassword } from "@/utils/crypt";

export async function authenticateUser(email: string, password: string) {
  try {
    const user = await getUserByEmail(email);
    if (user === null) {
      return {
        success: false,
        message: "Invalid email or password",
        error: "User not found",
        userId: undefined,
        role: undefined,
      };
    }
    const isPasswordValid = await comparePassword(password, user.password);

    if (isPasswordValid === false) {
      return {
        success: false,
        message: "Invalid email or password",
        error: "Incorrect password",
        userId: undefined,
        role: undefined,
      };
    } else {
      return {
        success: true,
        message: "Login successful",
        error: undefined,
        userId: user.id,
        role: user.role as Role,
      };
    }
  } catch {
    return {
      success: false,
      message: "An error occurred during authentication",
      error: "Internal server error",
      userId: undefined,
      role: undefined,
    };
  }
}
