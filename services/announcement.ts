import { insertAnnouncement } from "@/src/db/queries/insert";

export async function sendAnnouncement(
  postedBy: number,
  courseId: number,
  title: string,
  description: string,
) {
  return await insertAnnouncement({
    postedBy,
    title,
    courseId,
    description,
  });
}