"use server";
import { randomUUID } from "crypto";
import path from "path";
import { promises as fs } from "fs";
import { Role } from "@/types";
import { addUser } from "@/services/users";

export type UserState =
  | { success: false; error: string; message: string; id: undefined }
  | { success: true; message: string; id: number; error?: undefined };

export async function submitUser(
  state: UserState,
  formData: FormData
): Promise<UserState> {
  console.log("formData:", Object.fromEntries(formData));

  try {
    const firstName = formData.get("firstName") as string;
    const lastName= formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const city = formData.get("city") as string;
    const role = formData.get("role") as Role;
    const dateOfBirth = new Date(formData.get("dateOfBirth") as string);

    if (!firstName || !lastName || !email || !password || !city || !role || !dateOfBirth) {
      return {
        success: false,
        error: "Missing required fields",
        message: "Please provide all the required fields.",
        id: undefined,
      };
    }

    const image = formData.get("image") as File | null;
    let publicFilePath: string = "";

    if (image) {
      const fileExtension = path.extname(image.name);

      const randomName = `${randomUUID()}${fileExtension}`;
      const uploadDir = path.join(process.cwd(), "public", "usersImages");

      await fs.mkdir(uploadDir, { recursive: true });

      const filePath = path.join(uploadDir, randomName);
      const fileBuffer = Buffer.from(await image.arrayBuffer());

      await fs.writeFile(filePath, fileBuffer);

      publicFilePath = `/usersImages/${randomName}`;
    }

    const newUser= await addUser({

        firstName,
        lastName,
        email,
        password,
        dateOfBirth,
        image: publicFilePath,
        role,
        city,
    },role);

    return {
      success: true,
      message: "Course creation successful.",
      id: newUser.id,
    };
  } catch (error) {
    console.error("Error in submitCourse:", error);
    return {
      success: false,
      error: "Something went wrong",
      message: "Course creation failed.",
      id: undefined,
    };
  }
}