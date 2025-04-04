"use client";
import {
  submitAnnouncement,
  AnnouncementState,
} from "@/controllers/actions/sendAnnouncementAction";
import { Course } from "@/types";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface IProps {
  courses:
    | Course[]
    | {
        courseId: number;
        courseName: string;
      }[];
}

export default function SendAnnouncementForm({ courses }: IProps) {
  const initialState: AnnouncementState = {
    success: false,
    error: "",
    message: "",
    announcementId: undefined,
  };
  const router = useRouter();
  const [formState, formAction, isPending] = useActionState(
    submitAnnouncement,
    initialState
  );

  useEffect(() => {
    if (formState.error) {
      toast.error(formState.message);
    } else if (formState.success) {
      toast.success("Announcement Send successfully!");
    }
    const timer = setTimeout(() => {
      router.back();
    }, 3000);

    return () => clearTimeout(timer);
  }, [formState]);

  const getCourseOptions = () => {
    return courses.map((course) => {
      if ("id" in course && "title" in course) {
        return (
          <option key={course.id} value={course.id}>
            {course.title}
          </option>
        );
      } else {
        return (
          <option key={course.courseId} value={course.courseId}>
            {course.courseName}
          </option>
        );
      }
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto py-6 px-4">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
        <div className="px-6 py-10">
          <form action={formAction} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Enter Course Title"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="courseId"
                  className="block text-sm font-medium text-gray-700"
                >
                  Course
                </label>
                <select
                  id="courseId"
                  name="courseId"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                >
                  {getCourseOptions()}
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                placeholder="Enter Course Description"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-1/3 px-4 py-2 text-white bg-[#FFA41F] rounded-md shadow-sm text-sm font-medium hover:bg-orange-500 transition"
              >
                {isPending ? "Submitting" : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
