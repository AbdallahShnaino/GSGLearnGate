"use client";

import React from "react";
import { useSearchParams, useRouter } from "next/navigation";

interface SelectCourseProps {
  options: { courseId: number; courseName: string }[];
  value?: number;
}

export default function SelectCourse({ options, value }: SelectCourseProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const setSearchParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    router.push(`?${params.toString()}`, { scroll: false });
  };
  return (
    <div className="w-full md:w-70 my-5">
      <label
        htmlFor="course"
        className="block text-sm font-medium text-gray-700"
      >
        Choose Course
      </label>
      <select
        id="course"
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FFA41F] focus:border-[#FFA41F]"
        value={value}
        onChange={(e) => setSearchParam("courseId", e.target.value)}
      >
        {options.map((option) => (
          <option key={option.courseId} value={option.courseId}>
            {option.courseName}
          </option>
        ))}
      </select>
    </div>
  );
}
