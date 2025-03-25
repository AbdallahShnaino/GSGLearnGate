"use client";

import { useState } from "react";

const Task = () => {
  const [showPopup, setShowPopup] = useState<string | null>(null);
  const handleSubmissionType = (type: string) => setShowPopup(type);
  return (
    <div className="min-h-screen bg-[#FFF5E8] p-6">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-[#FFA41F]">
          React & Next.js Training
        </h1>

        <p className="text-xl text-neutral-700 font-bold">
          Exercise 1: App Router
        </p>

        <div className="mt-4 bg-[#FFF6E0] p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-[#FFA41F]">Task Details</h2>
          <p className="text-sm text-neutral-700">Mohammad Ali</p>
          <p className="text-sm text-neutral-700">
            March 23 (last update: Mar 25)
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
              This is where the task description will go. It can include
              instructions, required resources, or any other details that the
              student needs to complete the task. Lorem ipsum dolor sit amet
              consectetur, adipisicing elit. Lorem ipsum dolor sit amet,
              consectetur adipisicing elit. Ducimus, necessitatibus!
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
          <section className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold text-[#FFA41F] mb-4">
              Submit Your Work
            </h2>
            <form className="space-y-6">
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
                  onChange={(e) => handleSubmissionType(e.target.value)}
                >
                  <option value="" disabled selected>
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
                    <textarea
                      className="w-full p-4 border border-[#E99375] rounded-lg focus:ring-2 focus:ring-[#FFA41F] focus:outline-none"
                      rows={2}
                      placeholder="Paste your link here..."
                    ></textarea>
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
