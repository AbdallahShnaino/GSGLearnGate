import StudentAppointmentsTable from "@/components/StudentAppointmentsTable/StudentAppointmentsTable";
import {
  getCoursesByStudent,
  getStudentAppointments,
} from "@/src/db/queries/select";

interface IProps {
  params: Promise<{ studentId: string }>;
}
const InterviewsPage = async (props: IProps) => {
  const { studentId } = await props.params;
  const appointments = await getStudentAppointments(Number(studentId));
  const registeredCourses = await getCoursesByStudent(Number(studentId));
  return (
    <div className="min-h-screen bg-[#FFF5E8] p-6">
      <StudentAppointmentsTable
        appointments={appointments}
        registeredCourses={registeredCourses}
      />
    </div>
  );
};

export default InterviewsPage;
