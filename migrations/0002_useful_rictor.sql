PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_attachments` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`task_id` integer NOT NULL,
	`student_id` integer NOT NULL,
	`course_id` integer NOT NULL,
	`status` text NOT NULL,
	`path` text NOT NULL,
	`updated_at` text DEFAULT (current_timestamp) NOT NULL,
	`created_at` text DEFAULT (current_timestamp) NOT NULL,
	`deleted_at` text DEFAULT (current_timestamp) NOT NULL,
	FOREIGN KEY (`task_id`) REFERENCES `tasks`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`student_id`) REFERENCES `students`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`course_id`) REFERENCES `courses`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_attachments`("id", "task_id", "student_id", "course_id", "status", "path", "updated_at", "created_at", "deleted_at") SELECT "id", "task_id", "student_id", "course_id", "status", "path", "updated_at", "created_at", "deleted_at" FROM `attachments`;--> statement-breakpoint
DROP TABLE `attachments`;--> statement-breakpoint
ALTER TABLE `__new_attachments` RENAME TO `attachments`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_announcements` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`posted_by` integer NOT NULL,
	`course_id` integer NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`updated_at` text DEFAULT (current_timestamp) NOT NULL,
	`created_at` text DEFAULT (current_timestamp) NOT NULL,
	`deleted_at` text DEFAULT (current_timestamp) NOT NULL,
	FOREIGN KEY (`posted_by`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`course_id`) REFERENCES `courses`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_announcements`("id", "posted_by", "course_id", "title", "description", "updated_at", "created_at", "deleted_at") SELECT "id", "posted_by", "course_id", "title", "description", "updated_at", "created_at", "deleted_at" FROM `announcements`;--> statement-breakpoint
DROP TABLE `announcements`;--> statement-breakpoint
ALTER TABLE `__new_announcements` RENAME TO `announcements`;--> statement-breakpoint
CREATE TABLE `__new_attendances` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`student_id` integer NOT NULL,
	`course_id` integer NOT NULL,
	`absence` integer,
	`updated_at` text DEFAULT (current_timestamp) NOT NULL,
	`created_at` text DEFAULT (current_timestamp) NOT NULL,
	`deleted_at` text DEFAULT (current_timestamp) NOT NULL,
	FOREIGN KEY (`student_id`) REFERENCES `students`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`course_id`) REFERENCES `courses`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_attendances`("id", "student_id", "course_id", "absence", "updated_at", "created_at", "deleted_at") SELECT "id", "student_id", "course_id", "absence", "updated_at", "created_at", "deleted_at" FROM `attendances`;--> statement-breakpoint
DROP TABLE `attendances`;--> statement-breakpoint
ALTER TABLE `__new_attendances` RENAME TO `attendances`;--> statement-breakpoint
CREATE TABLE `__new_joining_requests` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`student_id` integer NOT NULL,
	`course_id` integer NOT NULL,
	`interview_status` text NOT NULL,
	`joining_status` text NOT NULL,
	`updated_at` text DEFAULT (current_timestamp) NOT NULL,
	`created_at` text DEFAULT (current_timestamp) NOT NULL,
	`deleted_at` text DEFAULT (current_timestamp) NOT NULL,
	FOREIGN KEY (`student_id`) REFERENCES `students`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`course_id`) REFERENCES `courses`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_joining_requests`("id", "student_id", "course_id", "interview_status", "joining_status", "updated_at", "created_at", "deleted_at") SELECT "id", "student_id", "course_id", "interview_status", "joining_status", "updated_at", "created_at", "deleted_at" FROM `joining_requests`;--> statement-breakpoint
DROP TABLE `joining_requests`;--> statement-breakpoint
ALTER TABLE `__new_joining_requests` RENAME TO `joining_requests`;--> statement-breakpoint
CREATE TABLE `__new_submissions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`task_id` integer NOT NULL,
	`student_id` integer NOT NULL,
	`course_id` integer NOT NULL,
	`grade` integer,
	`feedback` text NOT NULL,
	`graded_at` integer NOT NULL,
	`status` text NOT NULL,
	`updated_at` text DEFAULT (current_timestamp) NOT NULL,
	`created_at` text DEFAULT (current_timestamp) NOT NULL,
	`deleted_at` text DEFAULT (current_timestamp) NOT NULL,
	FOREIGN KEY (`task_id`) REFERENCES `tasks`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`student_id`) REFERENCES `students`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`course_id`) REFERENCES `courses`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_submissions`("id", "task_id", "student_id", "course_id", "grade", "feedback", "graded_at", "status", "updated_at", "created_at", "deleted_at") SELECT "id", "task_id", "student_id", "course_id", "grade", "feedback", "graded_at", "status", "updated_at", "created_at", "deleted_at" FROM `submissions`;--> statement-breakpoint
DROP TABLE `submissions`;--> statement-breakpoint
ALTER TABLE `__new_submissions` RENAME TO `submissions`;--> statement-breakpoint
CREATE TABLE `__new_tasks` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`started_at` text DEFAULT (current_timestamp) NOT NULL,
	`creator_id` integer NOT NULL,
	`course_id` integer NOT NULL,
	`deadline` integer NOT NULL,
	`grade` integer,
	`updated_at` text DEFAULT (current_timestamp) NOT NULL,
	`created_at` text DEFAULT (current_timestamp) NOT NULL,
	`deleted_at` text DEFAULT (current_timestamp) NOT NULL,
	FOREIGN KEY (`creator_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`course_id`) REFERENCES `courses`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_tasks`("id", "title", "description", "started_at", "creator_id", "course_id", "deadline", "grade", "updated_at", "created_at", "deleted_at") SELECT "id", "title", "description", "started_at", "creator_id", "course_id", "deadline", "grade", "updated_at", "created_at", "deleted_at" FROM `tasks`;--> statement-breakpoint
DROP TABLE `tasks`;--> statement-breakpoint
ALTER TABLE `__new_tasks` RENAME TO `tasks`;