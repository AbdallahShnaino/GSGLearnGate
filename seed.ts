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
      url: "libsql://gsglearngatedb-abdallah-shnaino.turso.io",
      authToken:
        "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJleHAiOjE3NDU2NDkxMTcsImlhdCI6MTc0MzA1NzExNywiaWQiOiI2ZGUyNWIxMy1hOGUyLTRiNjctODFhYy0wZjI0ZjU2ZjIxYTkifQ.TFFetvTi_UT1DLmJK0hIhDo1x3XqmO-EFD6oxeV6UMvStrFQbxxxak7KokQEfQhZ3VhnwbFZ6TYq_FI_ItZ3AA",
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
