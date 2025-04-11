import StudentAppointmentsTable from "@/components/StudentAppointmentsTable/StudentAppointmentsTable";
import { requireAuth } from "@/context/auth";
import {
  getCoursesByStudent,
  getStudentAppointments,
} from "@/src/db/queries/select";

const InterviewsPage = async () => {
  const data = await requireAuth();
  const studentId = data.userId;
  const appointments = await getStudentAppointments(Number(studentId));
  const registeredCourses = await getCoursesByStudent(Number(studentId));
  return (
    <div className="min-h-screen bg-[#FFF5E8] p-6 flex flex-col w-full">
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
