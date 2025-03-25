import { Task } from "@/types/course";
import { CalendarBlank } from "@phosphor-icons/react/dist/icons/CalendarBlank";
import { Clock } from "@phosphor-icons/react/dist/icons/Clock";
import { DotsThree } from "@phosphor-icons/react/dist/icons/DotsThree";
import React from "react";

interface TaskListProps {
  tasks: Task[];
}

const TaskListCom: React.FC<TaskListProps> = ({ tasks }) => {
  return (
    <div className="bg-white border border-[#FFA41F]/30 rounded-lg overflow-hidden mb-6 shadow-sm">
      <div className="grid grid-cols-12 bg-[#FFA41F]/10 p-4 border-b border-[#FFA41F]/20 font-medium text-[#FFA41F]">
        <div className="col-span-6">Task</div>
        <div className="col-span-2 text-center hidden md:block">Deadline</div>
        <div className="col-span-2 text-center hidden md:block">Status</div>
        <div className="col-span-2 text-center hidden md:block">Points</div>
      </div>

      {tasks.map((task, index) => (
        <div
          key={task.id}
          className={`grid grid-cols-12 p-4 border-b border-gray-100 hover:bg-[#FFA41F]/5 transition-colors ${
            index % 2 === 0 ? "bg-white" : "bg-gray-50"
          }`}
        >
          <div className="col-span-12 md:col-span-6 mb-2 md:mb-0">
            <div className="flex items-start">
              <div className="flex-1">
                <h3 className="font-medium text-[#FFA41F]">{task.title}</h3>
                <div className="flex items-center mt-1 text-sm text-gray-500 md:hidden">
                  <CalendarBlank size={14} className="mr-1" />
                  <span className="mr-3">{task.deadline}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs ${
                      task.status === "active"
                        ? "bg-green-100 text-green-700"
                        : task.status === "upcoming"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                  </span>
                </div>
                <div className="flex items-center mt-1 text-sm text-gray-500">
                  <span>
                    Submissions: {task.submissions}/{task.totalStudents}
                  </span>
                  <div className="w-24 h-1.5 bg-gray-200 rounded-full ml-2">
                    <div
                      className="h-full bg-[#FFA41F] rounded-full"
                      style={{
                        width: `${(task.submissions / task.totalStudents) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
              <button className="p-1.5 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 md:hidden">
                <DotsThree size={20} weight="bold" />
              </button>
            </div>
          </div>
          <div className="col-span-2 flex items-center justify-center md:flex hidden">
            <div className="flex items-center">
              <Clock size={16} className="mr-1 text-[#FFA41F]" />
              <span>{task.deadline}</span>
            </div>
          </div>
          <div className="col-span-2 flex items-center justify-center md:flex hidden">
            <span
              className={`px-2 py-1 rounded-full text-xs ${
                task.status === "active"
                  ? "bg-green-100 text-green-700"
                  : task.status === "upcoming"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
            </span>
          </div>
          <div className="col-span-2 hidden md:flex">
            <div className="flex items-center justify-center w-full">
              <div className="text-[#FFA41F] px-2 py-1 rounded-md font-medium">
                {task.points}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskListCom;
