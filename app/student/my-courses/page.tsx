import FullCourseCard from "@/components/FullCourseCard/FullCourseCard";

export default function MyCourses() {
  return (
    <div className="px-6 py-3 w-full min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 my-4">My Courses</h1>
      <div className="flex flex-wrap gap-4 justify-center sm:justify-between items-center w-full">
        <FullCourseCard />
        <FullCourseCard />
        <FullCourseCard />
        <FullCourseCard />
        <FullCourseCard />
        <FullCourseCard />
      </div>
    </div>
  );
}
