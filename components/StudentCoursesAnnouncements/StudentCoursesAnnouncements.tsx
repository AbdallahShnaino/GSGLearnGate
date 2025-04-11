"use client";
import { Course, newAnnouncements } from "@/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface IProps {
  announcements: newAnnouncements[] | null;
  courses: Course[] | null;
}
const StudentCoursesAnnouncements = (props: IProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [filteredAnnouncements, setFilteredAnnouncements] = useState(
    props.announcements
  );
  const [, setSelectedCourse] = useState("");

  useEffect(() => {
    const courseParam = searchParams.get("course") || "";
    setSelectedCourse(courseParam);

    if (!courseParam || !props.announcements) {
      setFilteredAnnouncements(props.announcements);
    } else {
      const filtered = props.announcements.filter(
        (announcement) => announcement.courseTitle === courseParam
      );
      setFilteredAnnouncements(filtered);
    }
  }, [searchParams, props.announcements]);

  const handleCourseFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;

    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set("course", value);
    } else {
      newParams.delete("course");
    }
    router.push(`${pathname}?${newParams.toString()}`);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-2">
        <div className="flex flex-col justify-between gap-3">
          <label
            htmlFor="course-filter"
            className="text-sm font-medium text-gray-700"
          >
            Filter by Course
          </label>
          <select
            id="course-filter"
            onChange={handleCourseFilter}
            className="px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="">All Courses</option>
            {props.courses?.map((course) => (
              <option key={course.id} value={course.title}>
                {course.title}
              </option>
            ))}
          </select>
        </div>
      </div>
      {filteredAnnouncements && filteredAnnouncements?.length >= 1 ? (
        filteredAnnouncements?.map((announcement) => (
          <div
            className="bg-white shadow-lg rounded-xl border border-gray-200 p-6 w-full"
            key={announcement.id}
          >
            <div className="flex justify-between items-start">
              <h3 className="text-2xl font-semibold text-[#FFA41F]">
                {announcement.courseTitle}
              </h3>
              <h3 className="text-xl font-semibold text-[#E99375]">
                {announcement.title}
              </h3>
              <p className="text-[#E99375] my-2">
                {new Date(announcement.createdAt!).toLocaleDateString("en-GB", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
            <div className="flex justify-between items-end">
              <p className="text-gray-700">{announcement.description}</p>
              <p className="text-gray-700">
                Posted By: {announcement.postedBy}
              </p>
            </div>
          </div>
        ))
      ) : (
        <div>There is no announcement to show</div>
      )}
    </div>
  );
};
export default StudentCoursesAnnouncements;
