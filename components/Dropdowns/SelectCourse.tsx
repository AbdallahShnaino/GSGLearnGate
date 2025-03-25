"use client";

import React from "react";
import { useSearchParams, useRouter } from "next/navigation";

interface SelectCourseProps {
  options: { courseId: number; courseName: string }[];
  value?: string;
  onChange: (value: string) => void;
}

export default function SelectCourse({
  options,
  value,
  onChange,
}: SelectCourseProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const setSearchParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    router.push(`?${params.toString()}`, { scroll: false });
  };
  return (
    <select
      value={value}
      onChange={(e) => setSearchParam("courseId", e.target.value)}
      className="my-3 px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-amber-700 "
    >
      {options.map((option) => (
        <option key={option.courseId} value={option.courseId}>
          {option.courseName}
        </option>
      ))}
    </select>
  );
}
