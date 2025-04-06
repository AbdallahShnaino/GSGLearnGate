export type CourseScheduleList = {
  id: number;
  courseId: number;
  courseName: string;
  dayOfWeek: string | null;
  startTime: string;
  endTime: string;
};
export type CourseStudentsList = {
  status: import("/home/abdallah/projects/next/GSGLearnGate/types/index").AttendanceRecordStatus;
  id: number;
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
};
