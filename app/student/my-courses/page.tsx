import FullCourseCard from "@/components/FullCourseCard/FullCourseCard";
import { getCoursesDataByStudent } from "@/src/db/queries/select";

const MyCourses = async () => {
  const courses = await getCoursesDataByStudent(1);
  console.log(courses);

  return (
    <div className="px-6 py-3 w-full min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 my-4">My Courses</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses?.map((course) => (
          <FullCourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default MyCourses;
