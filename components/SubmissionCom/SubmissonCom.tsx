"use client";
import React, { useState } from "react";
import StudentInfoCard from "./StudentInfoCard";
import TaskHeader from "./TaskHeader";
import { Paperclip } from "@phosphor-icons/react/dist/icons/Paperclip";
import { FloppyDisk } from "@phosphor-icons/react/dist/icons/FloppyDisk";
import { FolderPlus } from "@phosphor-icons/react/dist/icons/FolderPlus";
interface SubmissionIdProps {
  id: string;
}
const SubmissonCom = ({ id }: SubmissionIdProps) => {
  const [grade, setGrade] = useState("");
  const [feedback, setFeedback] = useState("");
  const [newComment, setNewComment] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const student = {
    id: "STD12345",
    name: "John Smith",
    task: {
      id: "TASK987",
      title: "UI Development Project",
      status: "Submitted",
      submittedAt: "2023-04-01T14:30:00",
      content:
        "I developed the user interface using React and Tailwind CSS as required in the task. I also added some additional features such as dark mode and mobile compatibility.",
      attachments: [
        { name: "screenshot1.png", url: "#" },
        { name: "source-code.zip", url: "#" },
      ],
      comments: [
        {
          id: 1,
          text: "Can I get more time to improve the design?",
          timestamp: "2023-04-01T15:45:00",
        },
        {
          id: 2,
          text: "I added an extra feature for page navigation",
          timestamp: "2023-04-02T10:20:00",
        },
      ],
    },
  };

  const handleSaveAllChanges = () => {
    if (grade) {
      setIsSaving(true);

      setTimeout(() => {
        setIsSaving(false);
        alert("All changes have been saved successfully!");
      }, 1500);
    } else {
      alert("Please enter a grade before saving");
    }
  };
  const handleAddComment = () => {
    if (newComment.trim()) {
      setNewComment("");
    }
  };

  return (
    <div className="min-h-screen py-4">
      <div className="container mx-auto px-4 max-w-7xl">
        <StudentInfoCard
          id={student.id}
          name={student.name}
          status={student.task.status}
        />

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSaveAllChanges();
          }}
        >
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
            <TaskHeader
              title={student.task.title}
              id={student.id}
              submittedAt={student.task.submittedAt}
            />

            <div className="p-5 space-y-6">
              <section>
                <h3 className="text-lg font-medium mb-3 pb-2 border-b">
                  Student Submission
                </h3>

                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-1">
                    <Paperclip size={22} className="text-[#FFA41F]" />
                    Attachments:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {student.task.attachments.map((attachment, index) => (
                      <a
                        key={index}
                        href={attachment.url}
                        className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded text-sm"
                      >
                        {attachment.name}
                      </a>
                    ))}
                  </div>
                </div>
              </section>

              <section className="pt-2">
                <h3 className="text-lg font-medium mb-3 pb-2 border-b">
                  Grading
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="md:col-span-2">
                    <label
                      htmlFor="feedback"
                      className="block mb-2 font-medium"
                    >
                      Feedback
                    </label>
                    <textarea
                      id="feedback"
                      rows={4}
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      placeholder="Enter your feedback here..."
                      className="w-full p-3 border rounded-md focus:outline-none focus:ring-1 focus:ring-[#FFA41F] focus:border-[#FFA41F]"
                    ></textarea>
                  </div>

                  <div>
                    <label htmlFor="grade" className="block mb-2 font-medium">
                      Grade (0-100)
                    </label>
                    <input
                      id="grade"
                      type="number"
                      min="0"
                      max="100"
                      value={grade}
                      onChange={(e) => setGrade(e.target.value)}
                      placeholder="Enter grade"
                      className="w-full p-3 border rounded-md focus:outline-none focus:ring-1 focus:ring-[#FFA41F] focus:border-[#FFA41F] text-lg"
                      required
                    />
                  </div>
                </div>
              </section>

              <section className="pt-2">
                <h3 className="text-lg font-medium mb-3 pb-2 border-b flex items-center gap-2">
                  {/* <MessageSquare className="h-5 w-5 text-[#FFA41F]" /> */}
                  Comments
                  <span className="ml-1 bg-[#FFA41F] text-white rounded-full px-2 py-0.5 text-xs">
                    {student.task.comments.length}
                  </span>
                </h3>

                <div className="space-y-3 mb-4">
                  {student.task.comments.map((comment) => (
                    <div key={comment.id} className="border p-3 rounded-md">
                      <div className="flex justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {/* <Image src="" /> */}
                          <span className="font-medium">{student.name}</span>
                        </div>
                        <span className="text-xs text-gray-500">
                          {new Date(comment.timestamp).toLocaleString("en-US", {
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                      <p>{comment.text}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-4">
                  <label
                    htmlFor="newComment"
                    className="block mb-2 font-medium"
                  >
                    Add Comment
                  </label>
                  <textarea
                    id="newComment"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                    rows={2}
                    className="w-full p-3 border rounded-md mb-2 focus:outline-none focus:ring-1 focus:ring-[#FFA41F] focus:border-[#FFA41F]"
                  ></textarea>
                  <button
                    type="button"
                    onClick={handleAddComment}
                    disabled={!newComment.trim()}
                    className={`py-2 px-4 rounded-md font-medium text-white
                                                    ${
                                                      !newComment.trim()
                                                        ? "bg-gray-300 cursor-not-allowed"
                                                        : "bg-[#FFA41F] hover:bg-[#FF9800]"
                                                    }`}
                  >
                    Add Comment
                  </button>
                </div>
              </section>
            </div>

            <div className="bg-gray-50 p-4 border-t flex justify-between items-center">
              <button
                type="button"
                className="px-4 py-2 border rounded-md hover:bg-gray-100"
              >
                Back to List
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className={`px-4 py-2 rounded-md text-white flex items-center gap-2
                                                ${
                                                  isSaving
                                                    ? "bg-gray-400"
                                                    : "bg-[#FFA41F] hover:bg-[#FF9800]"
                                                }`}
              >
                {isSaving ? (
                  "Saving..."
                ) : (
                  <>
                    <FolderPlus size={30} />
                    Save All Changes
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubmissonCom;
