import { Clock } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import React from "react";

const Course = ({ courses }) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] gap-8">
      {courses.map((course) => {
        return (
          <div
            key={course.id}
            className="border-1 border-gray-300 rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-all"
          >
            <Image
              src={course.image}
              alt="course image"
              width={400}
              height={100}
              objectFit="cover"
            />
            <div className="flex justify-between p-2.5">
              <p className="font-bold text-[var(--primary-color)]">
                {course.title}
              </p>
              <p className="text-[#5c7cd4]">{course.difficulty}</p>
            </div>
            <p className="p-2.5 text-[#383449]">{course.description}</p>
            <div className="flex items-center gap-1.5 p-2.5 border-b-1 border-gray-300 text-sm text-[#777]">
              <Clock size={20} />
              {course.duration} hrs
            </div>
            <div className="flex items-center gap-5 p-2.5">
              <div className="w-10 h-10 overflow-hidden rounded-full flex items-center justify-center">
                <Image
                  src={course.presenterImage}
                  alt="presenter image"
                  width={40}
                  height={40}
                />
              </div>
              <p className="text-[#383449]">by {course.presenterName}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Course;
