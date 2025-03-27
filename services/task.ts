"use server";

import { insertTask } from "@/src/db/queries/insert";

export async function createTaskByMonitor(
  creatorId: number,
  courseId: number,
  deadline: Date,
  startedAt: Date,
  title: string,
  description: string,
  points: number
) {
  return await insertTask({
    creatorId,
    title,
    courseId,
    deadline,
    description,
    startedAt,
    points,
  });
}
