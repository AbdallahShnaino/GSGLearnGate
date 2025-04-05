import { seed } from "drizzle-seed";
import { faker } from "@faker-js/faker";
import { drizzle } from "drizzle-orm/libsql";

async function main() {
  const db = drizzle({
    connection: {
      url: "libsql://gsglearngatedb-abdallah-shnaino.turso.io",
      authToken:
        "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJleHAiOjE3NDY0MzUxMzcsImlhdCI6MTc0Mzg0MzEzNywiaWQiOiJhMDNmMzJiYi0wNWU4LTQzMjMtYTliZS0wODE3YTZlMjAwM2MifQ.CsQWpOXkMkRo35i5P6CkpXJ7ZqykxznPM5R4gJrhVvA4T0u8Kcj91vZw0WHTid38Ad1MYWiAWoL5wZjUsA5YAA",
    },
  });

  await seed(db, {
    usersTable: {
      count: 50,
      factory: () => ({
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        dateOfBirth: faker.date.past({ years: 20 }),
        image: faker.image.avatar(),
        role: faker.helpers.arrayElement([
          "ADMIN",
          "STUDENT",
          "MONITOR",
          "CO_MONITOR",
        ]),
        city: faker.location.city(),
      }),
    },
    adminsTable: {
      count: 5,
      factory: async () => {
        const user = await db.query.usersTable.findFirst({
          where: (users, { eq }) => eq(users.role, "ADMIN"),
        });
        return {
          userId: user?.id || faker.number.int({ min: 1, max: 50 }),
        };
      },
    },
    monitorsTable: {
      count: 10,
      factory: async () => {
        const user = await db.query.usersTable.findFirst({
          where: (users, { eq }) => eq(users.role, "MONITOR"),
        });
        return {
          userId: user?.id || faker.number.int({ min: 1, max: 50 }),
        };
      },
    },
    coMonitorsTable: {
      count: 15,
      factory: async () => {
        const user = await db.query.usersTable.findFirst({
          where: (users, { eq }) => eq(users.role, "CO_MONITOR"),
        });
        return {
          userId: user?.id || faker.number.int({ min: 1, max: 50 }),
        };
      },
    },
    studentsTable: {
      count: 30,
      factory: async () => {
        const user = await db.query.usersTable.findFirst({
          where: (users, { eq }) => eq(users.role, "STUDENT"),
        });
        return {
          userId: user?.id || faker.number.int({ min: 1, max: 50 }),
        };
      },
    },
    coursesTable: {
      count: 15,
      factory: () => ({
        title: faker.helpers.arrayElement([
          "Web Development",
          "Data Science",
          "Mobile App Development",
          "UI/UX Design",
          "Cybersecurity",
        ]),
        description: faker.lorem.paragraph(),
        image: faker.image.urlLoremFlickr({ category: "education" }),
        difficulty: faker.helpers.arrayElement([
          "BEGINNER",
          "INTERMEDIATE",
          "ADVANCED",
        ]),
        duration: faker.number.int({ min: 4, max: 12 }),
        applyStartDate: faker.date.past(),
        applyEndDate: faker.date.future(),
        courseStartDate: faker.date.future(),
        courseEndDate: faker.date.future(),
        details: faker.lorem.paragraphs(3),
        entryRequirements: faker.lorem.paragraph(),
      }),
    },
    courseSchedulesTable: {
      count: 100,
      factory: async () => {
        const course = await db.query.coursesTable.findFirst();
        return {
          courseId: course?.id || faker.number.int({ min: 1, max: 15 }),
          dayOfWeek: faker.helpers.arrayElement([
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
          ]),
          startTime: `${faker.number.int({ min: 9, max: 16 })}:00`,
          endTime: `${faker.number.int({ min: 17, max: 20 })}:00`,
          isRecurring: faker.datatype.boolean(),
          specificDate: faker.date.future(),
          weekNumber: faker.number.int({ min: 1, max: 8 }),
          sessionType: faker.helpers.arrayElement([
            "LECTURE",
            "LAB",
            "WORKSHOP",
            "EXAM",
          ]),
        };
      },
    },
    courseEnrollmentsTable: {
      count: 100,
      factory: async () => {
        const student = await db.query.studentsTable.findFirst();
        const course = await db.query.coursesTable.findFirst();
        return {
          courseId: course?.id || faker.number.int({ min: 1, max: 15 }),
          studentId: student?.id || faker.number.int({ min: 1, max: 30 }),
        };
      },
    },
    announcementsTable: {
      count: 30,
      factory: async () => {
        const course = await db.query.coursesTable.findFirst();
        const user = await db.query.usersTable.findFirst();
        return {
          courseId: course?.id || faker.number.int({ min: 1, max: 15 }),
          postedBy: user?.id || faker.number.int({ min: 1, max: 50 }),
          title: faker.lorem.sentence(),
          description: faker.lorem.paragraphs(2),
        };
      },
    },
    coMonitorAvailabilityTable: {
      count: 50,
      factory: async () => {
        const coMonitor = await db.query.coMonitorsTable.findFirst();
        const course = await db.query.coursesTable.findFirst();
        return {
          coMonitorId: coMonitor?.id || faker.number.int({ min: 1, max: 15 }),
          courseId: course?.id || faker.number.int({ min: 1, max: 15 }),
          date: faker.date.future(),
          startTime: `${faker.number.int({ min: 9, max: 16 })}:00`,
          endTime: `${faker.number.int({ min: 17, max: 20 })}:00`,
          isBooked: faker.datatype.boolean(),
        };
      },
    },
    appointmentsTable: {
      count: 25,
      factory: async () => {
        const coMonitor = await db.query.coMonitorsTable.findFirst();
        const student = await db.query.studentsTable.findFirst();
        const course = await db.query.coursesTable.findFirst();
        return {
          coMonitorId: coMonitor?.id || faker.number.int({ min: 1, max: 15 }),
          studentId: student?.id || faker.number.int({ min: 1, max: 30 }),
          courseId: course?.id || faker.number.int({ min: 1, max: 15 }),
          caption: faker.lorem.sentence(),
          date: faker.date.future(),
          status: faker.helpers.arrayElement([
            "ACCEPTED",
            "PENDING",
            "REJECTED",
          ]),
        };
      },
    },
    tasksTable: {
      count: 35,
      factory: async () => {
        const course = await db.query.coursesTable.findFirst();
        const user = await db.query.usersTable.findFirst();
        return {
          courseId: course?.id || faker.number.int({ min: 1, max: 15 }),
          creatorId: user?.id || faker.number.int({ min: 1, max: 50 }),
          title: faker.lorem.words(3),
          description: faker.lorem.paragraph(),
          deadline: faker.date.future(),
          points: faker.number.int({ min: 10, max: 100 }),
        };
      },
    },
    submissionsTable: {
      count: 40,
      factory: async () => {
        const task = await db.query.tasksTable.findFirst();
        const student = await db.query.studentsTable.findFirst();
        const course = await db.query.coursesTable.findFirst();
        return {
          taskId: task?.id || faker.number.int({ min: 1, max: 35 }),
          studentId: student?.id || faker.number.int({ min: 1, max: 30 }),
          courseId: course?.id || faker.number.int({ min: 1, max: 15 }),
          grade: faker.number.int({ min: 0, max: 100 }),
          feedback: faker.lorem.paragraph(),
          status: faker.helpers.arrayElement([
            "PENDING",
            "SUBMITTED",
            "GRADED",
          ]),
        };
      },
    },
    attendanceRecordsTable: {
      count: 200,
      factory: async () => {
        const session = await db.query.courseSchedulesTable.findFirst();
        const student = await db.query.studentsTable.findFirst();
        const user = await db.query.usersTable.findFirst();
        return {
          sessionId: session?.id || faker.number.int({ min: 1, max: 100 }),
          studentId: student?.id || faker.number.int({ min: 1, max: 30 }),
          status: faker.helpers.arrayElement([
            "PRESENT",
            "ABSENT",
            "LATE",
            "EXCUSED",
          ]),
          recordedById: user?.id || faker.number.int({ min: 1, max: 50 }),
        };
      },
    },
    joiningRequestsTable: {
      count: 15,
      factory: async () => {
        const student = await db.query.studentsTable.findFirst();
        const course = await db.query.coursesTable.findFirst();
        return {
          studentId: student?.id || faker.number.int({ min: 1, max: 30 }),
          courseId: course?.id || faker.number.int({ min: 1, max: 15 }),
          interviewStatus: faker.helpers.arrayElement([
            "ACCEPTED",
            "PENDING",
            "REJECTED",
          ]),
          joiningStatus: faker.helpers.arrayElement([
            "ACCEPTED",
            "PENDING",
            "REJECTED",
          ]),
        };
      },
    },
    commentsTable: {
      count: 50,
      factory: async () => {
        const task = await db.query.tasksTable.findFirst();
        const submission = await db.query.submissionsTable.findFirst();
        const user = await db.query.usersTable.findFirst();
        return {
          taskId: task?.id,
          submissionId: submission?.id,
          userId: user?.id || faker.number.int({ min: 1, max: 50 }),
          content: faker.lorem.paragraph(),
          isPublic: faker.datatype.boolean(),
        };
      },
    },
    attachmentsTable: {
      count: 25,
      factory: async () => {
        const task = await db.query.tasksTable.findFirst();
        const submission = await db.query.submissionsTable.findFirst();
        const user = await db.query.usersTable.findFirst();
        return {
          taskId: task?.id,
          submissionId: submission?.id,
          userId: user?.id || faker.number.int({ min: 1, max: 50 }),
          type: faker.helpers.arrayElement(["FILE", "LINK"]),
          path: faker.system.filePath(),
        };
      },
    },
  });
}

main().catch(console.error);
