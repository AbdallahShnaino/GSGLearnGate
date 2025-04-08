import { insertUser } from "@/src/db/queries/insert";
import {
  getCoMonitors,
  getCoursesCountByMonitor,
  getMonitors,
  getStudents,
  getStudentsCountByMonitor,
} from "@/src/db/queries/select";
import { Role, User } from "@/types";

export async function getAllMonitors(page: number, pageSize: number) {
  return await getMonitors(page, pageSize);
}

export async function getAllCoMonitors(page: number, pageSize: number) {
  return await getCoMonitors(page, pageSize);
}

export async function getAllStudents(page: number, pageSize: number) {
  return await getStudents(page, pageSize);
}

export async function addUser(data: Omit<User, "id">, role: Role) {
  return await insertUser({ data, role });
}

export async function getStudentsNumber(monitorId: number) {
  return await getStudentsCountByMonitor(monitorId);
}
export async function getMonitorCoursesNumber(monitorId: number) {
  return await getCoursesCountByMonitor(monitorId);
}
