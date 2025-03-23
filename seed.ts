import { seed } from "drizzle-seed";

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
  attendancesTable,
  joiningRequestsTable,
} from "./src/db/schema";
import { drizzle } from "drizzle-orm/libsql";

async function main() {
  const db = drizzle({
    connection: {
      url: process.env.TURSO_CONNECTION_URL!,
      authToken: process.env.TURSO_AUTH_TOKEN!,
    },
  });

  await seed(db, {
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
    attendancesTable,
    joiningRequestsTable,
  }).refine(() => ({
    usersTable: {
      count: 20,
    },
    adminsTable: {
      count: 20,
    },
    monitorsTable: {
      count: 20,
    },
    coMonitorsTable: {
      count: 20,
    },
    studentsTable: {
      count: 20,
    },
    coursesTable: {
      count: 15,
    },
    announcementsTable: {
      count: 30,
    },
    appointmentsTable: {
      count: 25,
    },
    studentsCoursesTable: {
      count: 50,
    },
    submissionsTable: {
      count: 40,
    },
    tasksTable: {
      count: 35,
    },
    attachmentsTable: {
      count: 25,
    },
    attendancesTable: {
      count: 60,
    },
    joiningRequestsTable: {
      count: 15,
    },
  }));
}

main();
