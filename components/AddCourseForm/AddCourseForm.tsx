import { Image as ImageIcon } from "@phosphor-icons/react/dist/ssr";
import React from "react";

const AddCourseForm = () => {
  return (
    <div className="w-full max-w-4xl m-auto py-2 px-4">
      <div className="bg-white rounded-lg shadow-2xl h-[500px] overflow-y-scroll px-6 py-4">
        <form className="space-y-4">
          <div className="flex flex-col items-center">
            <label
              htmlFor="image"
              className="flex justify-center items-center w-16 h-16 rounded-full cursor-pointer bg-gray-100 border-2 border-gray-300"
            >
              <ImageIcon className="w-8 h-8 text-gray-500" />
            </label>
            <span className="text-sm text-gray-600">Upload Course Image</span>
            <input type="file" id="image" accept="image/*" className="hidden" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Course Title
              </label>
              <input
                id="title"
                type="text"
                placeholder="Enter course title"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>

            <div>
              <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
                Duration (in weeks)
              </label>
              <input
                id="duration"
                type="text"
                placeholder="e.g., 12 weeks"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="monitor" className="block text-sm font-medium text-gray-700">
                Monitor
              </label>
              <select
              id="monitor"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            >
              <option value="" disabled selected>
                Select Monitor
              </option>
              <option value="">Sara</option>
              <option value="">Khaldoon</option>
            </select>
            </div>

            <div>
              <label htmlFor="co-monitor" className="block text-sm font-medium text-gray-700">
                Co-Monitor
              </label>
              <select
              id="co-monitor"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            >
              <option value="" disabled selected>
                Select Co-Monitor
              </option>
              <option value="">Sara</option>
              <option value="">Khaldoon</option>
            </select>
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Course Description
            </label>
            <textarea
              id="description"
              placeholder="Provide a brief course description"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="entryRequirements" className="block text-sm font-medium text-gray-700">
                Entry Requirements
              </label>
              <input
                id="entryRequirements"
                type="text"
                placeholder="e.g., Basic programming knowledge"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>

            <div>
              <label htmlFor="details" className="block text-sm font-medium text-gray-700">
                Additional Details
              </label>
              <input
                id="details"
                type="text"
                placeholder="e.g., Online/Offline course details"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
          </div>

          <div>
            <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700">
              Difficulty Level
            </label>
            <select
              id="difficulty"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            >
              <option value="" disabled selected>
                Select difficulty level
              </option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="applyStartDate" className="block text-sm font-medium text-gray-700">
                Apply Start Date
              </label>
              <input
                id="applyStartDate"
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>

            <div>
              <label htmlFor="applyEndDate" className="block text-sm font-medium text-gray-700">
                Apply End Date
              </label>
              <input
                id="applyEndDate"
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="courseStartDate" className="block text-sm font-medium text-gray-700">
                Course Start Date
              </label>
              <input
                id="courseStartDate"
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>

            <div>
              <label htmlFor="courseEndDate" className="block text-sm font-medium text-gray-700">
                Course End Date
              </label>
              <input
                id="courseEndDate"
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="button"
              className="w-1/3 px-4 py-2 rounded-md text-white hover:bg-[#f89705] bg-[#FFA41F]"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCourseForm;
