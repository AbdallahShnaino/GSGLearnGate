import {
  getAllJoiningRequestsWithDetails,
  updateJoiningRequest,
} from "@/src/db/queries/select";
import { Status } from "@/types";

export async function getJoiningRequests(
  monitorId: number,
  currentPage: number,
  pageSize: number
) {
  return await getAllJoiningRequestsWithDetails(
    monitorId,
    currentPage,
    pageSize
  );
}

export async function updateJoiningRequestStatus(id: number, status: Status) {
  return await updateJoiningRequest(id, { joiningStatus: status });
}
