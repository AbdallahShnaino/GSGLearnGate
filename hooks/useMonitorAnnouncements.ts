import { STATIC_MONITOR_ID } from "@/context/keys";
import { getAnnouncements } from "@/services/announcement";
import { getMonitorCoursesNames } from "@/services/courses";
import { Announcement } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function useMonitorAnnouncements() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const courseId = Number(searchParams.get("courseId")) || undefined;
  const currentPage = Number(searchParams.get("page")) || 1;

  const [announcements, setAnnouncements] = useState<Announcement[] | null>(
    null
  );
  const pageSize = 10;
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  const fetchRequests = useCallback(
    async (courseId?: number, page: number = 1) => {
      setIsLoading(true);
      try {
        const courseData = await getMonitorCoursesNames(STATIC_MONITOR_ID);
        const courseIds = courseData
          ? courseData.map((course) => course.courseId)
          : undefined;
        const requests = await getAnnouncements(
          courseId,
          courseIds,
          page,
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
    },
    []
  );

  useEffect(() => {
    try {
      fetchRequests(courseId, currentPage);
    } catch (error) {
      throw new Error("CODE:1001");
    }
  }, [courseId, currentPage, fetchRequests]);

  const updateUrl = useCallback(
    (newPage: number, newCourseId?: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", newPage.toString());

      if (newCourseId !== undefined) {
        params.set("courseId", newCourseId.toString());
      } else {
        params.delete("courseId");
      }

      router.push(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  const handlePreviousPage = () => {
    const newPage = Math.max(currentPage - 1, 1);
    updateUrl(newPage, courseId);
  };

  const handleNextPage = () => {
    const newPage = Math.min(currentPage + 1, totalPages);
    updateUrl(newPage, courseId);
  };

  const onPageChange = (page: number) => {
    updateUrl(page, courseId);
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
