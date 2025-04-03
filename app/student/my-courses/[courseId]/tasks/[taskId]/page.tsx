import TaskSubmit from "@/components/TaskSubmit/TaskSubmit";
import { getTaskByTaskId } from "@/src/db/queries/select";

interface IProps {
  params: Promise<{ taskId: string }>;
}
const Task = async (props: IProps) => {
  const { taskId } = await props.params;
  const taskDetails = await getTaskByTaskId(Number(taskId));
  console.log(taskDetails);
  // const timeDiff = taskDetails![0].deadline.getTime() - taskDetails![0].createdAt.getTime();

  // حساب الأيام والساعات المتبقية
  // const daysRemaining = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  // const hoursRemaining = Math.floor(
  //   (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  // );

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
            Created by: {taskDetails![0].creator}
          </p>
          {/* <p className="text-sm text-neutral-700">
            Created at: {taskDetails![0].createdAt.toLocaleDateString("en-GB")}{" "}
            {taskDetails![0].createdAt.toLocaleTimeString("en-GB", {
              hour: "2-digit",
              minute: "2-digit",
            })}{" "}
            (last update:{" "}
            {taskDetails![0].updatedAt.toLocaleDateString("en-GB")}{" "}
            {taskDetails![0].updatedAt.toLocaleTimeString("en-GB", {
              hour: "2-digit",
              minute: "2-digit",
            })}{" "}
            )
          </p> */}
          <p className="text-sm text-neutral-700">
            Deadline: {taskDetails![0].deadline.toLocaleDateString("en-GB")}{" "}
            {taskDetails![0].deadline.toLocaleTimeString("en-GB", {
              hour: "2-digit",
              minute: "2-digit",
            })}{" "}
            {/* (Remaining Time: {
              timeDiff > 0
              ? `Days Remaining: ${daysRemaining} days, ${hoursRemaining} hours`
              : "Deadline Passed!";
            }) */}
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

          <section className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold text-[#FFA41F] mb-4">
              Public Comments
            </h2>
            <div className="space-y-4">
              <div className="bg-[#FFF5E8] p-4 rounded-lg shadow">
                <p className="text-sm text-neutral-700">
                  <span className="font-medium text-[#E99375]">John Doe:</span>{" "}
                  Great task! Looking forward to the submission.
                </p>
              </div>
              <div className="bg-[#FFF5E8] p-4 rounded-lg shadow">
                <p className="text-sm text-neutral-700">
                  <span className="font-medium text-[#E99375]">
                    Jane Smith:
                  </span>{" "}
                  Can we get an extension for this task?
                </p>
              </div>
            </div>
            <form className="space-y-4 mt-5">
              <textarea
                className="w-full p-4 border border-[#E99375] rounded-lg focus:ring-2 focus:ring-[#FFA41F] focus:outline-none"
                rows={4}
                placeholder="Write a public comment..."
              ></textarea>
              <div className="flex justify-center">
                <button
                  type="button"
                  className="px-6 py-3 bg-[#FFA41F] text-white rounded-lg font-semibold shadow hover:bg-[#FF8700] transition"
                >
                  Post Comment
                </button>
              </div>
            </form>
          </section>
        </div>

        <div className="flex-shrink-0 lg:w-1/3 space-y-8 mt-8 lg:mt-0">
          <TaskSubmit />

          <section className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold text-[#FFA41F] mb-4">
              Private Comments
            </h2>
            <textarea
              className="w-full p-4 border border-[#FFA41F] rounded-lg focus:ring-2 focus:ring-[#E99375] focus:outline-none"
              rows={4}
              placeholder="Write a private comment to your instructor..."
            ></textarea>
            <div className="flex justify-center mt-4">
              <button
                type="button"
                className="px-6 py-3 bg-[#FFA41F] text-white rounded-lg font-semibold shadow hover:bg-[#FF8700] transition"
              >
                Post Comment
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Task;
