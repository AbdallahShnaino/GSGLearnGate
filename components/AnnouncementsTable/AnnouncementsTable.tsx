"use client";
import useMonitorAnnouncements from "@/hooks/useMonitorAnnouncements";
import AnnouncementCard from "../AnnouncementCard/AnnouncementCard";
import Loader from "../Shared/Loader";
import SelectCourse from "../Dropdowns/SelectCourse";
import TempPagination from "../Pagination/TempPagination";

interface IProps {
  monitorCoursesList: { courseId: number; courseName: string }[] | null;
}

export default function AnnouncementsTable({ monitorCoursesList }: IProps) {
  const {
    announcements,
    isLoading,
    courseId,
    currentPage,
    handleNextPage,
    handlePreviousPage,
    onPageChange,
    totalPages,
  } = useMonitorAnnouncements();

  if (isLoading) {
    return <Loader message="Loading data..." />;
  }

  return (
    <div className="w-full mx-auto mt-4 mb-10 border-1 border-gray-300 rounded-md overflow-hidden shadow-md">
      <div className="bg-white rounded-xl shadow-lg p-5">
        <div className="mb-8">
          <div className="max-w-xs">
            <SelectCourse
              options={monitorCoursesList}
              value={courseId}
              appendSearchParams={true}
            />
          </div>
        </div>

        {announcements && announcements.length > 0 ? (
          <div>
            <ul className="grid grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] gap-8">
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
    </div>
  );
}
