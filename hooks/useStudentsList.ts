import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getStudentsWithMonitorCorse } from "@/services/courses";
import { STATIC_MONITOR_ID, STATIC_COMONITOR_ID } from "@/context/keys";
import { StudentItem, StudentsListResponse } from "@/types/students";
import { Role } from "@/types";
interface IProps {
  role: Role;
}
export default function useStudentsList({ role }: IProps) {
  const searchParams = useSearchParams();
  const [students, setStudents] = useState<StudentItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState<number>(0);

  const courseId = Number(searchParams.get("courseId")) || undefined;

  const fetchRequests = async () => {
    setIsLoading(true);
    try {
      const id = role == Role.MONITOR ? STATIC_MONITOR_ID : STATIC_COMONITOR_ID;
      const { students, totalPages }: StudentsListResponse =
        await getStudentsWithMonitorCorse(
          currentPage,
          id,
          undefined,
          pageSize,
          courseId
        );
      setTotalPages(totalPages);
      setStudents(students);
    } catch (error) {
      throw new Error("CODE:10003");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [currentPage, courseId]);

  const handleNextPage = () =>
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  const handlePreviousPage = () =>
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  const onPageChange = (page: number) =>
    setCurrentPage(page >= 1 && page <= totalPages ? page : currentPage);

  return {
    courseId,
    students,
    currentPage,
    pageSize,
    isLoading,
    handlePreviousPage,
    handleNextPage,
    onPageChange,
    totalPages,
  };
}
