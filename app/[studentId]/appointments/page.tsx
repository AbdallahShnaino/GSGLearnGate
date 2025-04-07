import StudentAppointmentsTable from "@/components/StudentAppointmentsTable/StudentAppointmentsTable";

interface IProps {
  params: Promise<{ studentId: string }>;
}
const InterviewsPage = async (props: IProps) => {
  const { studentId } = await props.params;
  return (
    <div className="min-h-screen bg-[#FFF5E8] p-6">
      <StudentAppointmentsTable studentId={studentId} />
    </div>
  );
};

export default InterviewsPage;
