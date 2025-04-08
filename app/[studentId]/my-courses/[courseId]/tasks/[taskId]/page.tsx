import StudentPublicComments from "@/components/StudentComments/StudentPublicComments/StudentPublicComments";
import StudentPrivateComments from "@/components/StudentComments/SudentPrivateComments/StudentPrivateComments";
import TaskSubmit from "@/components/TaskSubmit/TaskSubmit";
import {
  getCommentsByTaskId,
  getSubmissionIdByTaskId,
  getTaskByTaskId,
} from "@/src/db/queries/select";

interface IProps {
  params: Promise<{ studentId: string; courseId: string; taskId: string }>;
}
const Task = async (props: IProps) => {
  const { studentId, courseId, taskId } = await props.params;
  const taskDetails = await getTaskByTaskId(Number(taskId));
  const comments = await getCommentsByTaskId(Number(courseId), Number(taskId));
  const submissionId = await getSubmissionIdByTaskId(
    Number(courseId),
    Number(taskId)
  );

  return (
    <div className="min-h-screen bg-[#FFF5E8] p-6">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-[#FFA41F]">
          {taskDetails![0].courseTitle}
        </h1>

        <p className="text-xl text-neutral-700 font-bold">
          Exercise 1: {taskDetails![0].taskTitle}
        </p>

        <div className="mt-4 bg-[#FFF6E0] p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-[#FFA41F]">Details</h2>
          <p className="text-sm text-neutral-700">
            Created By: {taskDetails![0].creator}
          </p>
          <p className="text-sm text-neutral-700">
            Created At: {taskDetails![0].createdAt.slice(0, 16)} (last update:{" "}
            {taskDetails![0].updatedAt.slice(0, 16)})
          </p>
          <p className="text-sm text-neutral-700">
            Deadline: {taskDetails![0].deadline.toLocaleDateString("en-GB")}{" "}
            {taskDetails![0].deadline.toLocaleTimeString("en-GB", {
              hour: "2-digit",
              minute: "2-digit",
            })}{" "}
          </p>
          <p className="text-sm text-neutral-700">
            Time Left:{" "}
            {(() => {
              const deadline = new Date(taskDetails![0].deadline);
              const now = new Date();
              const diffMs = deadline.getTime() - now.getTime();

              if (diffMs <= 0) return "Expired";

              const diffHoursTotal = Math.floor(diffMs / 1000 / 60 / 60);
              const days = Math.floor(diffHoursTotal / 24);
              const hours = diffHoursTotal % 24;

              return `${days}d ${hours}h`;
            })()}
          </p>
        </div>
      </header>

      <div className="lg:flex lg:gap-8">
        <div className="flex-grow lg:w-2/3 space-y-8">
          <section className="bg-white p-6 rounded-xl shadow-md flex-grow">
            <h2 className="text-xl font-semibold text-[#FFA41F] mb-2">
              Description
            </h2>
            <p className="text-sm text-neutral-700 leading-6">
              {taskDetails![0].description}
            </p>
          </section>

          <StudentPublicComments
            comments={comments}
            studentId={studentId}
            courseId={courseId}
            taskId={taskId}
            submissionId={submissionId![0].submissionId}
          />
        </div>

        <div className="flex-shrink-0 lg:w-1/3 space-y-8 mt-8 lg:mt-0">
          <TaskSubmit
            taskId={taskId}
            courseId={courseId}
            studentId={studentId}
          />

          <StudentPrivateComments
            comments={comments}
            studentId={studentId}
            courseId={courseId}
            taskId={taskId}
            submissionId={submissionId![0].submissionId}
          />
        </div>
      </div>
    </div>
  );
};

export default Task;
