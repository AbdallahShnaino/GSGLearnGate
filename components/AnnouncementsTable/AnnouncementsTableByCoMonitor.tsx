"use client";

import AnnouncementCard from "../AnnouncementCard/AnnouncementCard";
import Loader from "../Shared/Loader";
import SelectCourse from "../Dropdowns/SelectCourse";
import TempPagination from "../Pagination/TempPagination";
import useCoMonitorAnnouncements from "@/hooks/useCoMonitorAnnouncements";

interface IProps {
  coMonitorCoursesList: { courseId: number; courseName: string }[] | null;
}

export default function AnnouncementsTableByCoMonitor({
  coMonitorCoursesList,
}: IProps) {
  const {
    announcements,
    isLoading,
    courseId,
    currentPage,
    handleNextPage,
    handlePreviousPage,
    onPageChange,
    totalPages,
  } = useCoMonitorAnnouncements();

  if (isLoading) {
    return <Loader message="Loading data..." />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="max-w-xs">
          <SelectCourse
            options={coMonitorCoursesList}
            value={courseId}
            appendSearchParams={true}
          />
        </div>
      </div>

      {announcements && announcements.length > 0 ? (
        <div>
          <ul className="space-y-4">
            {announcements.map((announcement) => (
              <li
                key={announcement.id}
                className="transform transition-all duration-200 hover:-translate-y-1"
              >
                <AnnouncementCard
                  createdAt={announcement.createdAt || "unknown date"}
                  description={announcement.description}
                  title={announcement.title}
                />
              </li>
            ))}
          </ul>
          <div className="mt-8 flex justify-end">
            <TempPagination
              currentPage={currentPage}
              handleNextPage={handleNextPage}
              handlePreviousPage={handlePreviousPage}
              onPageChange={onPageChange}
              totalPages={totalPages}
            />
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg italic">
            No announcements to view
          </p>
        </div>
      )}
    </div>
  );
}
