import TaskCard from "@/components/TaskCard/TaskCard";

const Tasks = () => {
  return (
    <div className="min-h-screen bg-neutral-50 p-6 w-screen">
      <h1 className="text-3xl font-bold text-[#FFA41F] mb-6">
        Tasks & Assignments
      </h1>

      <div className="space-y-6 w-full">
        <TaskCard
          title="Math Homework"
          deadline="March 25, 2025"
          status="Submitted"
          statusColor="green"
          grade="8/10"
          gradedBy="Mr. Smith"
        />
        <TaskCard
          title="Science Project"
          deadline="March 20, 2025"
          status="Late"
          statusColor="red"
          grade="6/10"
          gradedBy="Dr. Johnson"
        />

        <TaskCard
          title="History Essay"
          deadline="March 30, 2025"
          status="Not Submitted"
          statusColor="gray"
          grade="N/A"
          gradedBy="N/A"
        />
      </div>
    </div>
  );
};

export default Tasks;
