import StudentCoursesAnnouncements from "@/components/StudentCoursesAnnouncements/StudentCoursesAnnouncements";
import {
  getCoursesByStudent,
  getStudentAnnouncementsById,
} from "@/src/db/queries/select";

interface IProps {
  params: Promise<{ studentId: string }>;
}
const Announcements = async (props: IProps) => {
  const { studentId } = await props.params;
  const announcements = await getStudentAnnouncementsById(Number(studentId));
  const courses = await getCoursesByStudent(Number(studentId));

  return (
    <div className="px-6 py-3 w-full min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 my-4">Announcements</h1>

      <StudentCoursesAnnouncements
        announcements={announcements}
        courses={courses}
      />
    </div>
  );
};

export default Announcements;
