import CreateTaskButtom from "@/components/CreateTaskButtom/CreateTaskButtom";

export default function Layout({
  children,
  activeTasksCard,
  lateSubmissionsCard,
  taskAwaitingReview,
  tasksList,
}: {
  children: React.ReactNode;
  activeTasksCard: React.ReactNode;
  lateSubmissionsCard: React.ReactNode;
  taskAwaitingReview: React.ReactNode;
  tasksList: React.ReactNode;
}) {
  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <h1 className="text-2xl font-bold text-[#FFA41F]">
          Tasks & Assignments
        </h1>
        <CreateTaskButtom />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {activeTasksCard}
        {taskAwaitingReview}
        {lateSubmissionsCard}
      </div>
      {tasksList}
      {children}
    </div>
  );
}
/* 

 <>

    
    </>

*/
