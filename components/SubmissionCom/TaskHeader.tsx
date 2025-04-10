import { FileText } from "@phosphor-icons/react/dist/icons/FileText";
import React from "react";

interface Props {
  title: string;
  points: number;
  submittedAt: Date;
}

const TaskHeader = ({ title, points, submittedAt }: Props) => {
  return (
    <div className="bg-[#FFA41F] p-4 text-white">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold flex items-center">
          <FileText size={26} weight="bold" className="m-2" />
          {title}
        </h2>
        <span className="text-sm text-white">Points : {points}</span>
      </div>
      <p className="text-sm opacity-90">
        Submitted on {new Date(submittedAt).toLocaleString("en-US")}
      </p>
    </div>
  );
};

export default TaskHeader;
