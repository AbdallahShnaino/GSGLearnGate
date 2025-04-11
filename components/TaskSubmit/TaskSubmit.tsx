"use client";

import { insertAttachment, insertSubmission } from "@/src/db/queries/insert";
import { getAttachmentPathsByTaskId } from "@/src/db/queries/select";
import { AssignmentStatus, Attachments, StudentSubmission } from "@/types";
import { useEffect, useRef, useState } from "react";

interface IProps {
  taskId: string;
  courseId: string;
  studentId: string;
  deadline: Date;
}
const TaskSubmit = (props: IProps) => {
  const [showPopup, setShowPopup] = useState<string | null>(null);
  const [submissionType, setSubmissionType] = useState("");
  const [path, setPath] = useState<string>("");
  const [displayPath, setDisplayPath] = useState<string>("");
  const [attachment, setAttachment] = useState<StudentSubmission | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmissionType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSubmissionType(e.target.value);
    setShowPopup(e.target.value);
    setDisplayPath("");
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const insertedAttachment = await insertAttachment({
        taskId: Number(props.taskId),
        creatorId: Number(props.studentId),
        courseId: Number(props.courseId),
        type: submissionType === "link" ? Attachments.LINK : Attachments.FILE,
        path: path,
      });
      await insertSubmission({
        taskId: Number(props.taskId),
        studentId: Number(props.studentId),
        courseId: Number(props.courseId),
        grade: null,
        feedback: "",
        gradedAt: new Date(),
        status: AssignmentStatus.SUBMITTED,
        attachmentId: insertedAttachment.id,
      });
      alert("Attachment Added Successfully");
    } catch {
      alert("Something went wrong!! Please try again...");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPath(e.target.files[0].name);
      setDisplayPath(e.target.files[0].name);
    }
  };

  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPath(e.target.value);
    setDisplayPath(e.target.value);
  };

  useEffect(() => {
    const getAttachment = async () => {
      const studentAttachment = await getAttachmentPathsByTaskId(
        Number(props.taskId)
      );
      setAttachment(studentAttachment);
    };

    getAttachment();
  }, [props.taskId]);
  return (
    <>
      {new Date(props.deadline) < new Date() && !attachment?.path ? (
        <section className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold text-[#FFA41F] mb-4">
            Task Time Expired
          </h2>
        </section>
      ) : attachment?.path ? (
        <section className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold text-[#FFA41F] mb-4">
            Your Submitted Attachment:{" "}
            <span className="text-[#E99375]">{attachment.path}</span>
          </h2>
          <h2 className="text-xl font-semibold text-[#FFA41F] mb-4">
            Co-Monitor Feedback:{" "}
            <span className="text-[#E99375]">{attachment.feedback}</span>
          </h2>
        </section>
      ) : (
        <section className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold text-[#FFA41F] mb-4">
            Submit Your Work
          </h2>
          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="submissionType"
                className="block text-sm font-medium text-neutral-700 mb-2"
              >
                Choose Submission Type:
              </label>
              <select
                id="submissionType"
                className="w-full p-3 border border-[#E99375] rounded-lg focus:ring-2 focus:ring-[#FFA41F] focus:outline-none"
                value={submissionType}
                onChange={handleSubmissionType}
              >
                <option value="" disabled hidden>
                  Select type...
                </option>
                <option value="link">Link</option>
                <option value="file">File</option>
              </select>
            </div>

            {showPopup === "link" && (
              <div
                className="fixed inset-0 flex items-center justify-center"
                style={{ backgroundColor: "rgba(233, 147, 117, 0.3)" }}
              >
                <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md">
                  <h3 className="text-lg font-semibold text-neutral-700 mb-4">
                    Enter the Link
                  </h3>
                  <input
                    className="w-full p-4 border border-[#E99375] rounded-lg focus:ring-2 focus:ring-[#FFA41F] focus:outline-none"
                    placeholder="Paste your link here..."
                    onChange={handleLinkChange}
                  ></input>
                  <div className="mt-4 flex justify-end gap-2">
                    <button
                      type="button"
                      className="px-6 py-2 bg-gray-300 text-black rounded-lg font-semibold hover:bg-gray-400 transition"
                      onClick={() => setShowPopup(null)}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="px-6 py-2 bg-[#FFA41F] text-white rounded-lg font-semibold hover:bg-[#FF8700] transition"
                      onClick={() => setShowPopup(null)}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            )}

            {showPopup === "file" && (
              <div
                className="fixed inset-0 flex items-center justify-center"
                style={{ backgroundColor: "rgba(233, 147, 117, 0.3)" }}
              >
                <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md">
                  <h3 className="text-lg font-semibold text-neutral-700 mb-4">
                    Upload Your File
                  </h3>
                  <input
                    type="file"
                    className="w-full p-3 border border-[#E99375] rounded-lg focus:ring-2 focus:ring-[#FFA41F] focus:outline-none"
                    onChange={handleFileChange}
                    ref={inputRef}
                    name="file"
                  />
                  <div className="mt-4 flex justify-end gap-2">
                    <button
                      type="button"
                      className="px-6 py-2 bg-gray-300 text-black rounded-lg font-semibold hover:bg-gray-400 transition"
                      onClick={() => setShowPopup(null)}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="px-6 py-2 bg-[#FFA41F] text-white rounded-lg font-semibold hover:bg-[#FF8700] transition"
                      onClick={() => setShowPopup(null)}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            )}
            {displayPath && (
              <div className="mt-4">
                <p className="text-sm text-neutral-700">
                  Selected: {displayPath}
                </p>
              </div>
            )}
            <div className="flex justify-center">
              <button
                type="submit"
                className="px-8 py-3 bg-[#E99375] text-white rounded-lg font-semibold shadow hover:bg-[#D96B4E] transition"
              >
                Submit
              </button>
            </div>
          </form>
        </section>
      )}
    </>
  );
};

export default TaskSubmit;
