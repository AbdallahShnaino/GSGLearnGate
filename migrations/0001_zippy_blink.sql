ALTER TABLE `attendance_records` ADD `course_id` integer NOT NULL REFERENCES courses(id);