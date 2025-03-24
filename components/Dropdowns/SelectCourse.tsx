import React from "react";

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
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="my-3 px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-amber-700 "
    >
      {options.map((option) => (
        <option key={option.courseId} value={option.courseName}>
          {option.courseName}
        </option>
      ))}
    </select>
  );
}
