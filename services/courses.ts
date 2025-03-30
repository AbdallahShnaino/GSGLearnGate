"use server";
import { deleteCourse } from "@/src/db/queries/delete";
import { insertStudentCourse } from "@/src/db/queries/insert";
import { getCoursesNamesByMonitor, getCoursesWithStudentCount } from "@/src/db/queries/select";

export async function addStudentToCourse(studentId: number, courseId: number) {
  return await insertStudentCourse({ courseId, studentId });
}
export async function getMonitorCoursesNames(monitorId: number) {
  return await getCoursesNamesByMonitor(monitorId);
}

export async function getCourses(page: number, pageSize: number) {
  return await getCoursesWithStudentCount(page, pageSize);
}

export async function removeCourse(id: number) {
  return await deleteCourse(id);
}