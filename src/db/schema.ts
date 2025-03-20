import {
  AnySQLiteColumn,
  int,
  integer,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

const timestamps = {
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`(current_timestamp)`),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(current_timestamp)`),
  deletedAt: text("deleted_at")
    .notNull()
    .default(sql`(current_timestamp)`),
};
export const usersTable = sqliteTable("users", {
  id: int().primaryKey({ autoIncrement: true }),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  password: text("password").notNull(),
  dateOfBirth: integer("date_of_birth", { mode: "timestamp" }).notNull(),
  image: text("image").notNull(),
  role: text("role", {
    enum: [Role.ADMIN, Role.STUDENT, Role.MONITOR, Role.CO_MONITOR],
  }).notNull(),
  city: text("city").notNull(),
  ...timestamps,
});

export const adminsTable = sqliteTable("admins", {
  id: int().primaryKey(),
  userId: int("user_id").references((): AnySQLiteColumn => usersTable.id),
});

export const monitorsTable = sqliteTable("monitors", {
  id: int().primaryKey(),
  userId: int("user_id").references((): AnySQLiteColumn => usersTable.id),
});

export const coMonitorsTable = sqliteTable("co_monitors", {
  id: int().primaryKey(),
  userId: int("user_id").references((): AnySQLiteColumn => usersTable.id),
});
export const studentsTable = sqliteTable("students", {
  id: int().primaryKey(),
  userId: int("user_id").references((): AnySQLiteColumn => usersTable.id),
});

export const coursesTable = sqliteTable("courses", {
  id: int().primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  description: text("description").notNull(),
  image: text("image").notNull(),
  difficulty: text("difficulty", {
    enum: [Difficulty.BEGINNER, Difficulty.INTERMEDIATE, Difficulty.ADVANCED],
  }).notNull(),
  duration: integer("duration").notNull(),
  applyStartDate: integer("apply_start_date", { mode: "timestamp" }).notNull(),
  applyEndDate: integer("apply_end_date", { mode: "timestamp" }).notNull(),
  courseStartDate: integer("course_start_date", {
    mode: "timestamp",
  }).notNull(),
  courseEndDate: integer("course_end_date", { mode: "timestamp" }).notNull(),
  monitorId: int("monitor_id").references(
    (): AnySQLiteColumn => monitorsTable.id
  ),
  coMonitorId: int("co_monitor_id").references(
    (): AnySQLiteColumn => coMonitorsTable.id
  ),
  adminId: int("admin_id").references((): AnySQLiteColumn => adminsTable.id),
  details: text("details").notNull(),

  entryRequirements: text("entry_requirements").notNull(),

  ...timestamps,
});
export const announcementsTable = sqliteTable("announcements", {
  id: int().primaryKey({ autoIncrement: true }),
  postedBy: int("posted_by").references((): AnySQLiteColumn => usersTable.id),
  courseId: int("course_id").references((): AnySQLiteColumn => coursesTable.id),
  title: text("title").notNull(),
  description: text("description").notNull(),
  ...timestamps,
});

export const appointmentsTable = sqliteTable("appointments", {
  id: int().primaryKey({ autoIncrement: true }),
  coMonitorId: int("co_monitor_id").references(
    (): AnySQLiteColumn => coMonitorsTable.id
  ),
  studentId: int("student_id").references(
    (): AnySQLiteColumn => studentsTable.id
  ),
  caption: text("caption").notNull(),
  date: integer("date", { mode: "timestamp" }).notNull(),

  status: text("status", {
    enum: [Status.ACCEPTED, Status.PENDING, Status.REJECTED],
  }).notNull(),
  ...timestamps,
});
export const studentsCoursesTable = sqliteTable("students_courses", {
  id: int().primaryKey({ autoIncrement: true }),
  courseId: int("course_id").references((): AnySQLiteColumn => coursesTable.id),
  studentId: int("student_id").references(
    (): AnySQLiteColumn => studentsTable.id
  ),
  status: text("status", {
    enum: [Status.ACCEPTED, Status.PENDING, Status.REJECTED],
  }).notNull(),
  ...timestamps,
});

export const submissionsTable = sqliteTable("submissions", {
  id: int().primaryKey({ autoIncrement: true }),
  taskId: int("task_id").references((): AnySQLiteColumn => tasksTable.id),
  studentId: int("student_id").references(
    (): AnySQLiteColumn => studentsTable.id
  ),
  courseId: int("course_id").references((): AnySQLiteColumn => coursesTable.id),
  grade: int("grade"),
  feedback: text("feedback").notNull(),
  gradedAt: integer("graded_at", { mode: "timestamp" }).notNull(),

  status: text("status", {
    enum: [
      AssignmentStatus.PENDING,
      AssignmentStatus.SUBMITTED,
      AssignmentStatus.GRADED,
    ],
  }).notNull(),
  ...timestamps,
});

export const tasksTable = sqliteTable("tasks", {
  id: int().primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  description: text("description").notNull(),
  startedAt: text("started_at")
    .notNull()
    .default(sql`(current_timestamp)`),

  deadline: integer("deadline", { mode: "timestamp" }).notNull(),
  points: int("grade"),
  ...timestamps,
});

export const attachmentsTable = sqliteTable("attachments", {
  id: int().primaryKey({ autoIncrement: true }),
  taskId: int("task_id").references((): AnySQLiteColumn => tasksTable.id),
  studentId: int("student_id").references(
    (): AnySQLiteColumn => studentsTable.id
  ),
  courseId: int("course_id").references((): AnySQLiteColumn => coursesTable.id),

  type: text("status", {
    enum: [Attachment.FILE, Attachment.LINK],
  }).notNull(),
  path: text("path").notNull(),
  ...timestamps,
});

export const attendancesTable = sqliteTable("attendances", {
  id: int().primaryKey({ autoIncrement: true }),
  studentId: int("student_id").references(
    (): AnySQLiteColumn => studentsTable.id
  ),
  courseId: int("course_id").references((): AnySQLiteColumn => coursesTable.id),
  absence: int("absence"),
  ...timestamps,
});

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

export type InsertAdmin = typeof adminsTable.$inferInsert;
export type SelectAdmin = typeof adminsTable.$inferSelect;

export type InsertMonitor = typeof monitorsTable.$inferInsert;
export type SelectMonitor = typeof monitorsTable.$inferSelect;

export type InsertCoMonitors = typeof coMonitorsTable.$inferInsert;
export type SelectCoMonitors = typeof coMonitorsTable.$inferSelect;

export type InsertStudent = typeof studentsTable.$inferInsert;
export type SelectStudent = typeof studentsTable.$inferSelect;

export type InsertCourse = typeof coursesTable.$inferInsert;
export type SelectCourse = typeof coursesTable.$inferSelect;

export type InsertAnnouncement = typeof announcementsTable.$inferInsert;
export type SelectAnnouncement = typeof announcementsTable.$inferSelect;

export type InsertAppointment = typeof appointmentsTable.$inferInsert;
export type SelectAppointment = typeof appointmentsTable.$inferSelect;

export type InsertStudentCourse = typeof studentsCoursesTable.$inferInsert;
export type SelectStudentCourse = typeof studentsCoursesTable.$inferSelect;

export type InsertSubmission = typeof submissionsTable.$inferInsert;
export type SelectSubmission = typeof submissionsTable.$inferSelect;

export type InsertTask = typeof tasksTable.$inferInsert;
export type SelectTask = typeof tasksTable.$inferSelect;

export type InsertAttachment = typeof attachmentsTable.$inferInsert;
export type SelectAttachment = typeof attachmentsTable.$inferSelect;

export type InsertAttendance = typeof attendancesTable.$inferInsert;
export type SelectAttendance = typeof attendancesTable.$inferSelect;
