import React from "react";
import Course from "../Course/Course";

const CollectionCourses = () => {
  const courses = [
    {
      id: 1,
      image: "/img/hero-background.jpg",
      title: "Frontend Development",
      difficulty: "Beginner",
      description:
        "This is a short description talking about the frontend development course.",
      duration: "20",
      presenterImage: "/img/Unknown_person.jpg",
      presenterName: "Mohammed Qashqesh",
    },
    {
      id: 2,
      image: "/img/hero-background.jpg",
      title: "Backend Development",
      difficulty: "Intermediate",
      description:
        "This course focuses on server-side technologies and database management.",
      duration: "30",
      presenterImage: "/img/Unknown_person.jpg",
      presenterName: "Mohammed Qashqesh",
    },
    {
      id: 3,
      image: "/img/hero-background.jpg",
      title: "React Development",
      difficulty: "Intermediate",
      description:
        "Learn how to build powerful web applications with React.js.",
      duration: "25",
      presenterImage: "/img/Unknown_person.jpg",
      presenterName: "Mohammed Qashqesh",
    },
    {
      id: 4,
      image: "/img/hero-background.jpg",
      title: "Web Design Principles",
      difficulty: "Beginner",
      description:
        "Understand the key principles of web design for an optimal user experience.",
      duration: "15",
      presenterImage: "/img/Unknown_person.jpg",
      presenterName: "Mohammed Qashqesh",
    },
  ];

  return (
    <div className="py-20 md:w-[750] lg:w-[970] xl:w-[1170] m-auto">
      <Course courses={courses} />
    </div>
  );
};

export default CollectionCourses;
