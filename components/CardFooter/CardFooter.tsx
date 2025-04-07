"use client";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr/ArrowLeft";
import React from "react";
import { useRouter } from "next/navigation";
interface IProps {
  taskId: number;
}
const CardFooter = ({ taskId }: IProps) => {
  const router = useRouter();

  return (
    <div className="bg-orange-50 p-4 flex justify-between">
      <button
        onClick={() => router.back()}
        className="flex items-center px-4 py-2 border border-orange-200 text-[#FFA41F] rounded-md hover:bg-white cursor-pointer"
      >
        <ArrowLeft size={16} weight="bold" className="mr-2" />
        Back to Tasks
      </button>
      <button
        onClick={() =>
          router.push(`/monitor/tasks/submissions?taskId=${taskId}`)
        }
        className="px-4 py-2 bg-[#FFA41F] text-white rounded-md hover:bg-orange-600 cursor-pointer"
      >
        View Submissions
      </button>
    </div>
  );
};

export default CardFooter;
