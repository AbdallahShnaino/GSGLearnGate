import { sendAnnouncement } from "@/services/announcement";

const postedBy = 1;

export type AnnouncementState =
  | { success: false; error: string; message: string; announcementId: undefined }
  | { success: true; message: string; announcementId: number; error?: undefined };

export async function submitAnnouncement(
  state: AnnouncementState,
  formData: FormData
): Promise<AnnouncementState> {
  try {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const courseId = formData.get("courseId");

    if (!title || !description || !courseId) {
      return {
        success: false,
        error: "Missing required fields",
        message: "Please provide all the required fields.",
        announcementId: undefined,
      };
    }

    const courseIdNumber = Number(courseId);
    if (isNaN(courseIdNumber)) {
      return {
        success: false,
        error: "Invalid courseId",
        message: "Course ID must be a valid number.",
        announcementId: undefined,
      };
    }

    const newAnnouncement = await sendAnnouncement(
      postedBy,
      courseIdNumber,
      title,
      description
    );

    return {
      success: true,
      message: "Announcement sent successfully.",
      announcementId: newAnnouncement.id,
    };
  } catch (error) {
    return {
      success: false,
      error: "Something went wrong" + error,
      message: "Announcement sending failed.",
      announcementId: undefined,
    };
  }
}
