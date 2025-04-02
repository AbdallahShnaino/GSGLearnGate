import { getSubmissionsForTasks } from "@/src/db/queries/select";
import { updateMeetingRequest } from "@/src/db/queries/update";
import { Status } from "@/types";

export async function updateMeetingRequestStatus(id: number, status: Status) {
  return await updateMeetingRequest(id, { status });
}

export async function fetchSubmissions(
  taskId?: number,
  page: number = 1,
  pageSize: number = 10
) {
  try {
    const data = await getSubmissionsForTasks(taskId, page, pageSize);

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
