import { Announcement } from "@/types";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getMonitorCoursesNames } from "@/services/courses";
import { getAnnouncements } from "@/services/announcement";

export default function useMonitorAnnouncements() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialCourseId = Number(searchParams.get("courseId")) || undefined;
  const initialPage = Number(searchParams.get("page")) || 1;

  const [courseId, setCourseId] = useState<number | undefined>(initialCourseId);
  const [announcements, setAnnouncements] = useState<Announcement[] | null>(
    null
  );
  const pageSize = 10;
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(1);

  const MONITOR_ID: number = 13;

  const fetchRequests = async (newCourseId?: number) => {
    setIsLoading(true);
    try {
      const courseData = await getMonitorCoursesNames(MONITOR_ID);
      const courseIds = courseData
        ? courseData.map((course) => course.courseId)
        : undefined;
      const requests = await getAnnouncements(
        newCourseId ?? courseId,
        courseIds,
        currentPage,
        pageSize
      );

      requests && setTotalPages(Math.ceil(requests.total / pageSize));
      setAnnouncements(requests.announcements);
    } catch (error) {
      console.error("Failed to fetch announcements:", error);
      setAnnouncements(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", currentPage.toString());
    if (courseId !== undefined) {
      params.set("courseId", courseId.toString());
    } else {
      params.delete("courseId");
    }
    router.push(`?${params.toString()}`, { scroll: false }); // Update URL without scrolling
  }, [currentPage, courseId, router, searchParams]);

  useEffect(() => {
    const newCourseId = Number(searchParams.get("courseId")) || undefined;
    const newPage = Number(searchParams.get("page")) || 1;

    if (newCourseId !== courseId) {
      setCourseId(newCourseId);
    }
    if (newPage !== currentPage) {
      setCurrentPage(newPage);
    }

    fetchRequests(newCourseId);
  }, [searchParams]);

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  return {
    courseId,
    announcements,
    currentPage,
    pageSize,
    isLoading,
    totalPages,
    handlePreviousPage,
    handleNextPage,
    onPageChange,
  };
}
