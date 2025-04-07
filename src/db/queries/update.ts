import { db } from "..";
import { eq } from "drizzle-orm";
import {
  appointmentsTable,
  coMonitorAvailabilityTable,
  coursesTable,
  usersTable,
} from "../schema";
import { AppointmentWithStudent, Course, User } from "@/types";

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

export async function updateUser(
  id: number,
  data: Partial<Omit<User, "password" | "role">>
): Promise<User | null> {
  const [updated] = await db
    .update(usersTable)
    .set(data)
    .where(eq(usersTable.id, Number(id)))
    .returning();
  return updated ?? null;
}

export async function bookAppointment(
  appointmentId: number,
  studentId: number
): Promise<boolean> {
  const [updated] = await db
    .update(coMonitorAvailabilityTable)
    .set({ isBooked: true, bookedByStudentId: studentId })
    .where(eq(coMonitorAvailabilityTable.id, appointmentId))
    .returning();

  return !!updated;
}
