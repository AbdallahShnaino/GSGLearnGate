"use server";

import { insertAttachment } from "@/src/db/queries/insert";
import { Attachments } from "@/types";
import { writeFile } from "@/utils/writeFile";

export async function submitStudentTaskFile(formData: FormData) {
  const file = formData.get("image") as File;
  const taskId = Number(formData.get("taskId"));
  const courseId = Number(formData.get("courseId"));
  const studentId = Number(formData.get("studentId"));
  if (!file || file.size === 0) {
    throw Error("No file uploaded");
  }
  const path = await writeFile(file);
  console.log({
    taskId,
    creatorId: studentId,
    courseId,
    type: Attachments.FILE,
    // path,
  });

  //   await insertAttachment({
  //     taskId,
  //     creatorId: studentId,
  //     courseId,
  //     type: Attachments.FILE,
  //     path,
  //   });
}
