"use client"
import { useSearch } from "@/hooks/useSearch";
import { getCourses } from "@/services/courses";
import { CourseJoinStudent } from "@/types";
import { useState, useEffect } from "react";

export const useCoursesTable = () => {
  const { value, setValue, updateSearchParam } = useSearch("title");
  const [fetchedCourses, setFetchedCourses] = useState<CourseJoinStudent[] | null>(null);
  const [open, setOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fetchCourses = async () => {
    setIsLoading(true);
    const courses = await getCourses(10, 0);
    setFetchedCourses(courses);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value;
    setValue(searchValue);
    updateSearchParam(searchValue);
  };

  const handleDeleteClick = (id: number) => {
    setSelectedCourse(id);
    setOpen(true);
  };

  const confirmDelete = () => {
    if (selectedCourse) {
      console.log(`Deleting course with ID: ${selectedCourse}`);
    }
    setOpen(false);
  };

  const filteredCourses: CourseJoinStudent[] = 
  fetchedCourses ? fetchedCourses.filter((course) =>
    course.title.toLowerCase().includes(value.toLowerCase())
  ) : [];

  return {
    value,
    handleSearchChange,
    filteredCourses,
    open,
    setOpen,
    selectedCourse,
    handleDeleteClick,
    confirmDelete,
    isLoading
  };
};
