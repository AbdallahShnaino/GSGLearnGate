"use client";

import { insertComment } from "@/src/db/queries/insert";
import { Comments } from "@/types";
import { useState } from "react";

interface IProps {
  comments: Comments[];
  studentId: string;
  courseId: string;
  taskId: string;
  submissionId: number;
}
const StudentPublicComments = (props: IProps) => {
  const [content, setContent] = useState("");
  const handleClick = async () => {
    try {
      await insertComment({
        content: content,
        studentId: Number(props.studentId),
        submissionId: props.submissionId,
        taskId: Number(props.taskId),
        courseId: Number(props.courseId),
        isPublic: true,
        privateRecipientId: 5,
      });
      setContent("");
    } catch (error) {
      console.error("Insert Comment failed:", error);
      alert("Something went wrong!! Please try again...");
    }
  };
  return (
    <section className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold text-[#FFA41F] mb-4">
        Public Comments
      </h2>
      <div className="space-y-4">
        {props.comments
          .filter((comment) => comment.isPublic)
          .map((comment) => {
            return (
              <div
                key={comment.id}
                className="bg-[#FFF5E8] p-4 rounded-lg shadow flex justify-between items-center"
              >
                <p className="text-sm text-neutral-700">
                  <span className="font-medium text-[#E99375]">
                    {comment.userName}:
                  </span>{" "}
                  {comment.content}
                </p>
                <p className="text-xs text-neutral-700">
                  {new Date(comment.createdAt).toLocaleDateString("en-GB", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            );
          })}
      </div>
      <form className="space-y-4 mt-5">
        <textarea
          className="w-full p-4 border border-[#E99375] rounded-lg focus:ring-2 focus:ring-[#FFA41F] focus:outline-none"
          rows={4}
          placeholder="Write a public comment..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <div className="flex justify-center">
          <button
            type="button"
            className="px-6 py-3 bg-[#FFA41F] text-white rounded-lg font-semibold shadow hover:bg-[#FF8700] transition"
            onClick={handleClick}
          >
            Post Comment
          </button>
        </div>
      </form>
    </section>
  );
};

export default StudentPublicComments;
