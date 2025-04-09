import StudentSubmissionsTable from "@/components/StudentSubmissionsTable/StudentSubmissionsTable";

interface IProps {
  searchParams: { [taskId: string]: string };
}

const page = async ({ searchParams }: IProps) => {
  const { taskId } = searchParams;

  return (
    <div className="w-full px-4">
      <div className="max-w-[1200px] mx-auto">
        <div className="bg-gradient-to-r from-[#FFA41F] to-orange-400 rounded-xl p-6 shadow-lg mb-8">
          <h1 className="text-3xl font-bold text-white">
            Student Submissions Dashboard
          </h1>
          <p className="text-orange-100 mt-2">
            Manage and track all student submissions
          </p>
        </div>
        <StudentSubmissionsTable taskId={Number(taskId)} role="monitor" />
      </div>
    </div>
  );
};

export default page;
