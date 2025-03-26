"use server";

import { insertAttachment } from "@/src/db/queries/insert";
import { Attachments } from "@/types";

export async function addAttachmentForTask(
  courseId: number,
  creatorId: number,
  path: string,
  submissionId: number,
  taskId: number,
  type: Attachments
) {
  return await insertAttachment({
    courseId,
    creatorId,
    path,
    submissionId,
    taskId,
    type,
  });
}
