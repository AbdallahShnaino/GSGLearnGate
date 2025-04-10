"use client";
import { CalendarBlank } from "@phosphor-icons/react/dist/icons/CalendarBlank";
import { Clock } from "@phosphor-icons/react/dist/icons/Clock";
import { FileText } from "@phosphor-icons/react/dist/icons/FileText";
import React from "react";
import Attachments from "../Attachments/Attachments";
import { getTimeRemaining } from "@/utils";
interface IProps {
  taskId: number;
  createdAt: string;
  title: string;
  description: string;
  points: number;
  startedAt: Date;
  deadline: Date;
  lastUpdate: string;
  paths: string[];
}

const TaskCardDetails = ({
  createdAt,
  deadline,
  description,
  lastUpdate,
  points,
  startedAt,
  taskId,
  title,
  paths,
}: IProps) => {
  const startedAtDate = new Date(startedAt);
  const lastUpdateDate = new Date(lastUpdate);

  const formattedStartedAt = startedAtDate.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  const formattedLastUpdateDate = lastUpdateDate.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  const formattedDeadline = deadline.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  return (
    <>
      <div className="bg-orange-50 p-4 border-b border-orange-100">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-[#FFA41F]">{title}</h2>
            <p className="text-sm text-gray-500">
              Task ID: {taskId} • Created on {createdAt}
            </p>
          </div>
          <div className="bg-[#FFA41F] text-white px-3 py-1 rounded-full text-sm font-medium">
            {points} Points
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="flex items-center gap-2">
            <CalendarBlank size={20} weight="fill" className="text-[#FFA41F]" />
            <div>
              <p className="text-sm text-gray-500">Start Date</p>
              <p className="font-medium">{formattedStartedAt}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={20} weight="fill" className="text-[#FFA41F]" />
            <div>
              <p className="text-sm text-gray-500">Deadline</p>
              <p className="font-medium">{formattedDeadline}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <FileText size={20} weight="fill" className="text-[#FFA41F]" />
            <div>
              <p className="text-sm text-gray-500">Last Updated</p>
              <p className="font-medium">{formattedLastUpdateDate}</p>
            </div>
          </div>
          <div className="bg-orange-50 p-3 rounded-lg">
            <p className="text-sm text-gray-500">Time Remaining</p>
            <p className="text-lg font-bold text-[#FFA41F]">
              {getTimeRemaining(formattedDeadline)}
            </p>
            <p className="text-xs text-gray-500">Due {formattedDeadline}</p>
          </div>
        </div>

        <div className="h-px bg-orange-100 my-6"></div>

        <div className="mb-6">
          <h3 className="text-lg font-medium text-[#FFA41F] mb-4">
            Description
          </h3>
          <div className="bg-orange-50 p-4 rounded-lg text-sm leading-relaxed">
            {description}
          </div>
        </div>

        <Attachments paths={paths} />
      </div>
    </>
  );
};

export default TaskCardDetails;
