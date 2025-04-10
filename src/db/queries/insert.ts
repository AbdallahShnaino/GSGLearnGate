import { db } from "./../index";
import {
  usersTable,
  adminsTable,
  monitorsTable,
  coMonitorsTable,
  studentsTable,
  coursesTable,
  announcementsTable,
  appointmentsTable,
  studentsCoursesTable,
  submissionsTable,
  tasksTable,
  attachmentsTable,
  courseSchedulesTable,
  joiningRequestsTable,
  commentsTable,
  InsertCommentsTable,
  SelectCommentsTable,
  coMonitorAvailabilityTable,
} from "./../schema";
import {
  User,
  Course,
  Announcement,
  Appointment,
  StudentCourse,
  Submission,
  Task,
  Attachment,
  Attachments,
  Role,
  StudentBookingDate,
  CourseSchedule,
  AvailabilitySlot,
  newComment,
  JoiningRequest,
} from "@/types/index";

interface InsertUserInput {
  role: Role;
  data: Omit<User, "id">;
}

export async function insertUser({
  data,
  role,
}: InsertUserInput): Promise<Omit<User, "password">> {
  const [insertedUser] = await db.insert(usersTable).values(data).returning();
  const user = insertedUser as Omit<User, "password">;

  if (role === Role.ADMIN) {
    await db.insert(adminsTable).values({ userId: user.id }).execute();
  }
  if (role === Role.MONITOR) {
    await db.insert(monitorsTable).values({ userId: user.id }).execute();
  }
  if (role === Role.CO_MONITOR) {
    await db.insert(coMonitorsTable).values({ userId: user.id }).execute();
  }
  if (role === Role.STUDENT) {
    await db.insert(studentsTable).values({ userId: user.id }).execute();
  }

  return user;
}

export async function insertCourse(data: Omit<Course, "id">): Promise<Course> {
  const [inserted] = await db.insert(coursesTable).values(data).returning();
  return inserted as Course;
}

export async function insertAnnouncement(
  data: Omit<Announcement, "id">
): Promise<Announcement> {
  const [inserted] = await db
    .insert(announcementsTable)
    .values(data)
    .returning();
  return inserted as Announcement;
}

export async function insertAppointment(
  data: Omit<Appointment, "id">
): Promise<Appointment> {
  const [inserted] = await db
    .insert(appointmentsTable)
    .values(data)
    .returning();
  return inserted as Appointment;
}

export async function insertStudentCourse(
  data: Omit<StudentCourse, "id">
): Promise<StudentCourse> {
  const [inserted] = await db
    .insert(studentsCoursesTable)
    .values(data)
    .returning();
  return inserted as StudentCourse;
}

export async function insertSubmission(
  data: Omit<Submission, "id">
): Promise<Submission> {
  const [inserted] = await db.insert(submissionsTable).values(data).returning();
  return inserted as Submission;
}

export async function insertTask(data: Omit<Task, "id">): Promise<Task> {
  const normalizedData = {
    ...data,
    startedAt: new Date(data.startedAt).toISOString(),
    deadline: new Date(data.deadline),
  };

  const [inserted] = await db
    .insert(tasksTable)
    .values(normalizedData)
    .returning();

  if (!inserted) throw new Error("Failed to insert task");

  return {
    ...inserted,
    startedAt: new Date(inserted.startedAt),
    deadline: inserted.deadline,
  } as Task;
}

export async function insertAttachment(
  data: Omit<Attachment, "id">
): Promise<Attachment> {
  const [inserted] = await db
    .insert(attachmentsTable)
    .values({
      ...data,
      type: data.type as Attachments,
    })
    .returning();
  return inserted as Attachment;
}

export async function insertStudentAppointmentBookingData(
  data: Omit<StudentBookingDate, "id">
): Promise<StudentBookingDate> {
  const [inserted] = await db
    .insert(appointmentsTable)
    .values(data)
    .returning();
  return inserted as StudentBookingDate;
}

export async function insertComment(
  data: Omit<InsertCommentsTable, "id">
): Promise<SelectCommentsTable> {
  if (!data.submissionId || !data.content || !data.privateRecipientId) {
    throw new Error("Missing required fields for inserting a comment.");
  }

  try {
    const [inserted] = await db.insert(commentsTable).values(data).returning();

    return inserted as SelectCommentsTable;
  } catch (error) {
    console.error("Error inserting comment:", error);
    throw new Error("Failed to insert comment.");
  }
}

export async function insertCourseSchedule(
  data: Omit<CourseSchedule, "id">
): Promise<CourseSchedule> {
  const [inserted] = await db
    .insert(courseSchedulesTable)
    .values(data)
    .returning();

  return inserted as CourseSchedule;
}

export async function insertCoMonitorAvailability(
  availability: Omit<AvailabilitySlot, "id" | "createdAt" | "updatedAt">
) {
  try {
    const [newAvailability] = await db
      .insert(coMonitorAvailabilityTable)
      .values({
        ...availability,
        isBooked: availability.isBooked ?? false,
      })
      .returning();

    return newAvailability;
  } catch (error) {
    console.error("Error inserting co-monitor availability:", error);
    throw new Error("Failed to create availability slot");
  }
}

export async function insertNewComment(
  data: Omit<newComment, "id">
): Promise<newComment> {
  const [inserted] = await db.insert(commentsTable).values(data).returning();
  return inserted as newComment;
}

export async function insertJoiningRequest(
  data: Omit<JoiningRequest, "id">
): Promise<JoiningRequest> {
  const [inserted] = await db
    .insert(joiningRequestsTable)
    .values(data)
    .returning();
  return inserted as JoiningRequest;
}
