"use server";
import { insertStudentCourse } from "@/src/db/queries/insert";

import { getCoMonitorAppointments, getCoursesNamesByMonitor } from "@/src/db/queries/select";

import { getCoursesWithStudentCount } from "@/src/db/queries/select";


export async function addStudentToCourse(studentId: number, courseId: number) {
  return await insertStudentCourse({ courseId, studentId });
}
export async function getMonitorCoursesNames(monitorId: number) {
  return await getCoursesNamesByMonitor(monitorId);
}

export async function getCoMonitorAppointment(coMentorId: number) {
  try {
    const appointments = await getCoMonitorAppointments(coMentorId);
    if (!appointments || appointments.appointments.length === 0) {
      throw new Error(`No appointments found for coMentorId: ${coMentorId}`);
    }
    return appointments;
  } catch (error) {
    console.error('Error fetching appointments:', error);
    throw error;
  }
}




export async function getCourses(page: number, pageSize: number) {
  return await getCoursesWithStudentCount(page, pageSize);
}

