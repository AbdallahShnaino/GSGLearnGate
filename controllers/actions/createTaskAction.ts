"use server";

import { randomUUID } from "crypto";
import path from "path";
import { promises as fs } from "fs";
import { createTaskByMonitor } from "@/services/task";
import { addAttachmentForTask } from "@/services/attachment";
import { Attachments } from "@/types";

export type TaskState =
  | { success: false; error: string; message: string; taskId: undefined }
  | { success: true; message: string; taskId: number; error?: undefined };
const NOT_SUBMISSION = -1;
export async function submitTask(
  state: TaskState,
  formData: FormData
): Promise<TaskState> {
  try {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const dueDate = formData.get("dueDate") as string;
    const deadline = new Date(dueDate);
    const points = formData.get("points") as string;
    const monitorId = formData.get("monitorId") as string;
    const courseId = formData.get("courseId") as string;
    const url = formData.get("url") as string | File;
    if (
      !title ||
      !description ||
      !dueDate ||
      !points ||
      !monitorId ||
      !courseId
    ) {
      return {
        success: false,
        error: "Missing required fields",
        message: "Please provide all the required fields.",
        taskId: undefined,
      };
    }

    const newTask = await createTaskByMonitor(
      Number(monitorId),
      Number(courseId),
      deadline,
      new Date(),
      title,
      description,
      Number(points)
    );
    const file = formData.get("file") as File | null;
    if (file && file instanceof File && file.size > 0) {
      let filePath: string | null = null;
      const fileExtension = path.extname(file.name);
      const randomName = `${randomUUID()}${fileExtension}`;
      const uploadDir = path.join(process.cwd(), "uploads");

      await fs.mkdir(uploadDir, { recursive: true });

      filePath = path.join(uploadDir, randomName);

      const fileBuffer = Buffer.from(await file.arrayBuffer());
      await fs.writeFile(filePath, fileBuffer);
      const publicFilePath = `/uploads/${randomName}`;
      await addAttachmentForTask(
        Number(courseId),
        Number(monitorId),
        publicFilePath,
        NOT_SUBMISSION,
        newTask.id,
        Attachments.FILE
      );
      return {
        success: true,
        message: "Task creation done.",
        taskId: newTask.id,
      };
    } else if (typeof url == "string") {
      await addAttachmentForTask(
        Number(courseId),
        Number(monitorId),
        url,
        NOT_SUBMISSION,
        newTask.id,
        Attachments.LINK
      );
      return {
        success: true,
        message: "Task creation done.",
        taskId: newTask.id,
      };
    } else {
      if (newTask.id) {
        return {
          success: true,
          message: "Task creation done.",
          taskId: newTask.id,
        };
      } else {
        return {
          success: false,
          error: "Something went wrong",
          message: "Task creation failed.",
          taskId: undefined,
        };
      }
    }
  } catch (error) {
    return {
      success: false,
      error: "Something went wrong",
      message: "Task creation failed.",
      taskId: undefined,
    };
  }
}
