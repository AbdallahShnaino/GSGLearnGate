"use server";

import { deleteCourse } from "@/src/db/queries/delete";
import { insertCourse, insertStudentCourse } from "@/src/db/queries/insert";
import { Course } from "@/types";
import { updateCourse } from "@/src/db/queries/update";
import {getStudentCountByCourse,getCoursesWithStudentCount, getAllCourses, getCoMonitorAppointments, getCoursesNamesByCoMonitor, getCoursesNamesByMonitor, getCourseById} from "@/src/db/queries/select";


export async function addStudentToCourse(studentId: number, courseId: number) {
  return await insertStudentCourse({ courseId, studentId });
}
export async function getMonitorCoursesNames(monitorId: number) {
  return await getCoursesNamesByMonitor(monitorId);
}

export async function fetchAllCourses(){
  return await getAllCourses();
}

export async function getCoMonitorCoursesNames(coMonitorId: number) {
  return await getCoursesNamesByCoMonitor(coMonitorId);
}

export async function getCoMonitorAppointment(coMentorId: number) {
  try {
    const appointments = await getCoMonitorAppointments(coMentorId);
    if (!appointments || appointments.appointments.length === 0) {
      throw new Error(`No appointments found for coMentorId: ${coMentorId}`);
    }
    return {
      appointments: appointments.appointments,
      totalCount: appointments.totalCount,
    };
  } catch (error) {
    console.error('Error fetching appointments:', error);
    throw error;
  }
}

export async function getCourses(page: number, pageSize: number) {
  return await getCoursesWithStudentCount(page, pageSize);
}

export async function getStudentsCountPerCourse(courseId: number) {
  return await getStudentCountByCourse(courseId);
}

export async function addCourse(data: Omit<Course,"id">) {
  return await insertCourse(data);
}

export async function removeCourse(id: number) {
  return await deleteCourse(id);
}

export async function editCourse (id: number, data: Course) {
  return await updateCourse(id, data);
}

export async function getCourse(id: number){
  return await getCourseById(id);
}


