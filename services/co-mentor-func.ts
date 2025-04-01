import { updateMeetingRequest } from "@/src/db/queries/update";
import { Status } from "@/types";



export async function updateMeetingRequestStatus(id: number, status: Status) {
    return await updateMeetingRequest(id, { status });
}
