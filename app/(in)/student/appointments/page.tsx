import { getStudentIdFromCookie } from "@/app/lib/auth/getStudentIdFromCookie";
import StudentAppointmentsTable from "@/components/StudentAppointmentsTable/StudentAppointmentsTable";
import {
  getCoursesByStudent,
  getStudentAppointments,
} from "@/src/db/queries/select";

const InterviewsPage = async () => {
  const studentId = await getStudentIdFromCookie();
  const appointments = await getStudentAppointments(Number(studentId));
  const registeredCourses = await getCoursesByStudent(Number(studentId));
  return (
    <div className="min-h-screen p-6 flex flex-col w-full">
      <div className="flex-grow">
        <StudentAppointmentsTable
          appointments={appointments}
          registeredCourses={registeredCourses}
        />
      </div>
    </div>
  );
};

export default InterviewsPage;
