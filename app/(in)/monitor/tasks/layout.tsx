"use client";
import CreateTaskButton from "@/components/CreateTaskButtom/CreateTaskButtom";
import SelectTaskStatus from "@/components/Dropdowns/SelectTaskStatus";
import { usePathname } from "next/navigation";

export default function Layout({
  children,
  activeTasksCard,
  lateSubmissionsCard,
  submissionsAwaitingReview,
  tasksList,
}: {
  children: React.ReactNode;
  activeTasksCard: React.ReactNode;
  lateSubmissionsCard: React.ReactNode;
  submissionsAwaitingReview: React.ReactNode;
  tasksList: React.ReactNode;
}) {
  const path = usePathname();
  return path == "/monitor/tasks" ? (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <h1 className="text-2xl font-bold text-[#FFA41F]">
          Tasks & Assignments
        </h1>
        <CreateTaskButton link="/monitor/tasks/create" />
      </div>
      <div className="bg-white border border-[#FFA41F]/30 rounded-lg p-3  mb-6 shadow-sm">
        <div className="flex justify-end flex-col md:flex-row gap-4">
          <SelectTaskStatus value={1} appendSearchParams={true} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {activeTasksCard}
        {submissionsAwaitingReview}
        {lateSubmissionsCard}
      </div>
      {tasksList}
    </div>
  ) : (
    <>{children}</>
  );
}
/* 

 <>

    
    </>

*/
