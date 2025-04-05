"use client";

import { useState } from "react";
const TaskSubmit = () => {
  const [showPopup, setShowPopup] = useState<string | null>(null);
  const [submissionType, setSubmissionType] = useState("");
  const handleSubmissionType = (type: string) => {
    setSubmissionType(type);
    setShowPopup(type);
  };
  return (
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
            value={submissionType}
            onChange={(e) => handleSubmissionType(e.target.value)}
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
  );
};

export default TaskSubmit;
