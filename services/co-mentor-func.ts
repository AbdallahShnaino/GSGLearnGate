import { getSubmissionsAndNonSubmissionsForTask } from "@/src/db/queries/select";
import { updateMeetingRequest } from "@/src/db/queries/update";
import { Status } from "@/types";
import { db } from "@/src/db";
import { tasksTable } from "@/src/db/schema";
import { eq } from "drizzle-orm";

export async function updateMeetingRequestStatus(id: number, status: Status) {
  return await updateMeetingRequest(id, { status });
}

export async function fetchSubmissions(
  taskId: number,
  page: number = 1,
  pageSize: number = 10
) {
  try {
    const taskData = await db
      .select({
        courseId: tasksTable.courseId,
      })
      .from(tasksTable)
      .where(eq(tasksTable.id, taskId))
      .all();

    if (!taskData || taskData.length === 0) {
      throw new Error("Failed to fetch courseId for the given taskId.");
    }

    const courseId = taskData[0].courseId;

    const data = await getSubmissionsAndNonSubmissionsForTask(
      taskId,
      courseId,
      page,
      pageSize
    );

    if (!data) {
      throw new Error("Failed to fetch submissions.");
    }

    return {
      submissions: data.submissions,
      totalPages: Math.ceil(data.totalCount / pageSize),
      currentPage: page,
      totalCount: data.totalCount,
    };
  } catch (error) {
    console.error("Error fetching submissions:", error);
    throw error;
  }
}
