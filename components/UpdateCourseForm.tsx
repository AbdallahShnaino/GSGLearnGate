"use client";
import { getCourse } from "@/services/courses";
import { Course, Difficulty, UsersNames } from "@/types";
import { Image as ImageIcon } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface IProps {
  monitors: UsersNames[];
  coMonitors: UsersNames[];
}

const UpdateCourseForm = ({ monitors, coMonitors }: IProps) => {
  const [selectedImg, setSelectedImg] = useState("");
  const [course, setCourse] = useState<Course | null>(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchCourse = async () => {
      const data = await getCourse(Number(id));
      setCourse(data);
      console.log(data);
    };
    fetchCourse();
  }, [id]);

  return (
    <div className="w-full max-w-4xl m-auto py-2 px-4">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="bg-white rounded-lg shadow-2xl px-6 py-4">
        <h1 className="text-xl font-semibold text-[#FFA41F]">Update Course</h1>
        <form className="space-y-4">
          {/* Course Image */}
          <div className="flex flex-col items-center">
            <label
              htmlFor="image"
              className="flex justify-center items-center w-16 h-16 rounded-full cursor-pointer bg-gray-100 border-2 border-gray-300"
            >
              {selectedImg ? (
                <Image
                  src="/img/gsgLogo.png"
                  alt="Selected"
                  className="rounded-full object-cover"
                  width={70}
                  height={70}
                />
              ) : (
                <ImageIcon className="w-8 h-8 text-gray-500" />
              )}
            </label>
            <span className="text-sm text-gray-600">Upload Course Image</span>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              className="hidden"
            />
          </div>

          {/* Course Title and Duration */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Course Title</label>
              <input
                type="text"
                value={course?.title || ""}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                readOnly
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Duration (in hours)</label>
              <input
                type="number"
                value={course?.duration || ""}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                readOnly
              />
            </div>
          </div>

          {/* Monitors Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Monitor</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                disabled
              >
                <option value="">{course?.monitorName || "Select Monitor"}</option>
                {monitors.map((monitor) => (
                  <option key={monitor.id} value={monitor.userId}>
                    {`${monitor.firstName} ${monitor.lastName}`}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Co-Monitor</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                disabled
              >
                <option value="">{course?.coMonitorName || "Select Co-Monitor"}</option>
                {coMonitors.map((coMonitor) => (
                  <option key={coMonitor.id} value={coMonitor.userId}>
                    {`${coMonitor.firstName} ${coMonitor.lastName}`}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Course Description</label>
            <textarea
              value={course?.description || ""}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              readOnly
            />
          </div>

          {/* Difficulty Level */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Difficulty Level</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              disabled
            >
              <option value="">{course?.difficulty || "Select difficulty level"}</option>
              <option value={Difficulty.BEGINNER}>Beginner</option>
              <option value={Difficulty.INTERMEDIATE}>Intermediate</option>
              <option value={Difficulty.ADVANCED}>Advanced</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {["applyStartDate", "applyEndDate", "courseStartDate", "courseEndDate"].map(
              (field, index) => (
                <div key={index}>
                  <label className="block text-sm font-medium text-gray-700">
                    {field.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                  </label>
                  <input
                    type="date"
                    value={course?.[field as keyof Course] ? 
                      new Date(course[field as keyof Course] as string)
                      .toISOString().split("T")[0] 
                      : ""}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    readOnly
                  />
                </div>
              )
            )}
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-1/3 px-4 py-2 rounded-md text-white hover:bg-[#f89705] bg-[#FFA41F]"
              disabled
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCourseForm;
