"use server";
import { randomUUID } from "crypto";
import path from "path";
import { promises as fs } from "fs";
import { editUser } from "@/services/courses";

export type UserState =
  | { success: false; error: string; message: string;}
  | { success: true; message: string; error?: undefined };

export async function submitUser(
  state: UserState,
  formData: FormData
): Promise<UserState> {
  console.log("formData:", Object.fromEntries(formData));

  try {
    const userId = formData.get("id") as string;
    const firstName = formData.get("firstName") as string;
    const lastName= formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const city = formData.get("city") as string;
    const dateOfBirth = new Date(formData.get("dateOfBirth") as string);

    if (!firstName || !lastName || !email || !city  || !dateOfBirth) {
      return {
        success: false,
        error: "Missing required fields",
        message: "Please provide all the required fields.",
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

    await editUser(Number(userId),{
        id:Number(userId),
        firstName,
        lastName,
        email,
        dateOfBirth,
        image: publicFilePath,
        city,
    });

    return {
      success: true,
      message: "Course creation successful.",
    };
  } catch (error) {
    console.error("Error in submitCourse:", error);
    return {
      success: false,
      error: "Something went wrong",
      message: "Course creation failed.",
    };
  }
}