"use client";

import { Status, StudentCourseDetails } from "@/types";

interface IProps {
  courseData: StudentCourseDetails[];
  studentId: string;
  soonCourseId: string;
  requestStatus: Status | null;
}
const SoonCourseDetails = (props: IProps) => {
  const handleRegister = async () => {
    try {
      const response = await fetch("/api/student/joinRequests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentId: Number(props.studentId),
          courseId: Number(props.soonCourseId),
          interviewStatus: Status.PENDING,
          joiningStatus: Status.PENDING,
        }),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      const result = await response.json();
      alert("Joining Request Sent Successfully");
    } catch {
      alert("Something went wrong!! Please try again...");
    }
  };

  return (
    <div className="w-full max-w-screen-xl mx-auto bg-gray-50 p-8">
      <div className="bg-gradient-to-r from-[#FFA41F] to-[#FF8C1A] p-6 rounded-2xl text-white shadow-lg mb-8">
        <h2 className="text-4xl font-bold">{props.courseData![0].title}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-lg space-y-4">
          <h3 className="text-2xl font-semibold text-gray-800">
            Course Details
          </h3>
          <div className="flex justify-between items-center">
            <p className="text-gray-600">Duration</p>
            <p className="text-gray-700">
              {props.courseData![0].duration * 6} hours
            </p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-gray-600">Start Date</p>
            <p className="text-gray-700">
              {new Date(props.courseData![0].startDate).toLocaleDateString(
                "en-GB"
              )}
            </p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-gray-600">End Date</p>
            <p className="text-gray-700">
              {new Date(props.courseData![0].endDate).toLocaleDateString(
                "en-GB"
              )}
            </p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-gray-600">Monitor</p>
            <p className="text-gray-700">{props.courseData![0].monitor}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg space-y-4">
          <h3 className="text-2xl font-semibold text-gray-800">
            Course Description
          </h3>
          <p className="text-gray-600">{props.courseData![0].description}</p>

          <h3 className="text-2xl font-semibold text-gray-800 mt-4">
            Entry Requirements
          </h3>
          <p className="text-gray-600">
            {props.courseData![0].entryRequirements}
          </p>
        </div>
      </div>

      {!props.requestStatus ? (
        <div className="mt-8 flex justify-center">
          <button
            onClick={handleRegister}
            className="px-8 py-3 bg-[#FFA41F] text-white text-lg rounded-xl shadow-xl hover:bg-[#FF8C1A] transition-all ease-in-out duration-300 transform hover:scale-105"
          >
            Register for the Course
          </button>
        </div>
      ) : (
        <div className="mt-8 flex justify-center">
          <div className="px-8 py-3 bg-[#E99375] text-white text-lg rounded-xl shadow-xl">
            Your Request to join course is sent
          </div>
        </div>
      )}
    </div>
  );
};

export default SoonCourseDetails;
