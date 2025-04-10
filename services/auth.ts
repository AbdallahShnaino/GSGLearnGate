import { getUserByEmail } from "@/src/db/queries/select"; // استيراد دالة getUserByEmail
import { Role } from "@/types";
import { comparePassword } from "@/utils/crypt"; // استيراد دالة مقارنة كلمة المرور

export async function authenticateUser(email: string, password: string) {
  try {
    // البحث عن المستخدم باستخدام البريد الإلكتروني
    const user = await getUserByEmail(email);
    // التحقق من وجود المستخدم
    if (user === null) {
      return {
        success: false,
        message: "Invalid email or password",
        error: "User not found",
        userId: undefined,
        id: undefined,
        role: undefined
      };
    }
    console.log(user.password);
    // مقارنة كلمة المرور المدخلة مع كلمة المرور المخزنة
    const isPasswordValid = await comparePassword(password, user.password);

    console.log(isPasswordValid);

    // التحقق من صحة كلمة المرور
    if (isPasswordValid === false) {
      return {
        success: false,
        message: "Invalid email or password",
        error: "Incorrect password",
        userId: undefined,
        id: undefined,
        role: undefined
      };
    } else {
      // العودة بنتيجة ناجحة مع id المستخدم
      return {
        success: true,
        message: "Login successful",
        error: undefined,
        userId: user.roleId,
        id: user.id,
        role: user.role as Role
      };
    }
  } catch (error) {
    // التعامل مع الأخطاء في حالة حدوث مشكلة غير متوقعة
    console.error("Authentication error:", error);
    return {
      success: false,
      message: "An error occurred during authentication",
      error: "Internal server error",
      userId: undefined,
      id: undefined,
      role: undefined
    };
  }
}
