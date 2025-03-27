import { AppointmentWithStudent } from "@/types";
import { appointmentsTable, usersTable } from "../schema";
import { db } from "..";
import { eq } from "drizzle-orm";

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
