import { getAllJoiningRequestsWithDetails } from "@/src/db/queries/select";

/*
export type JoiningRequest = {
  id: number;
  studentId: number;
  courseId: number;
  status: Status;
} & Timestamps;


*/
export async function getJoiningRequests() {
  const result = await getAllJoiningRequestsWithDetails();
  console.log(result);
  // i want to get data from joing re table
  // after that i need to get all courses and users
  // i will return needed data
}

export function updateJoiningRequestStatus() {
  // i want to update status
}
