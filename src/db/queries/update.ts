import { db } from "..";
import { eq } from "drizzle-orm";
import { appointmentsTable, coursesTable, usersTable } from "../schema";
import { AppointmentWithStudent, Course } from "@/types";

export async function updateMeetingRequest(
  id: number,
  updates: Partial<AppointmentWithStudent>
): Promise<AppointmentWithStudent[]> {
  return await db
    .update(appointmentsTable)
    .set(updates)
    .where(eq(appointmentsTable.id, id))
    .returning({
      id: appointmentsTable.id,
      studentId: appointmentsTable.studentId,
      date: appointmentsTable.date,
      caption: appointmentsTable.caption,
      coMonitorId: appointmentsTable.coMonitorId,
      status: appointmentsTable.status,
      createdAt: appointmentsTable.createdAt,
      profileImage: usersTable.image,
      studentName: usersTable.firstName,
      studentEmail: usersTable.email,
    });
}

export async function updateCourse(
  id: number,
  data: Partial<Omit<Course, "id">>
): Promise<Course | null> {
  const [updated] = await db
    .update(coursesTable)
    .set(data)
    .where(eq(coursesTable.id, Number(id)))
    .returning();

  return updated ?? null;
}
