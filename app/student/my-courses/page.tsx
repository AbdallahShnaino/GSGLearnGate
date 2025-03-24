import FullCourseCard from "@/components/FullCourseCard/FullCourseCard";

const MyCourses = () => {
  return (
    <div className="px-6 py-3 w-full min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 my-4">My Courses</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <FullCourseCard />
        <FullCourseCard />
        <FullCourseCard />
        <FullCourseCard />
        <FullCourseCard />
        <FullCourseCard />
      </div>
    </div>
  );
};

export default MyCourses;
