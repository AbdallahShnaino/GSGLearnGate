import { getLimitCoursesByStudent } from "@/src/db/queries/select";

interface IProps {
  studentId: string;
}
const Table = async (props: IProps) => {
  const courses = await getLimitCoursesByStudent(Number(props.studentId));
  const today = new Date();

  const coursesWithNextLecture = courses?.map((course) => {
    const courseStartDate = new Date(course.startDate);
    const courseEndDate = new Date(course.endDate);
    const currentDate = new Date(today);

    let nextLecture = null;

    while (currentDate <= courseEndDate) {
      const dayOfWeek = currentDate.getDay(); // 0 = Sunday, 1 = Monday, 3 = Wednesday

      if ([0, 1, 3].includes(dayOfWeek) && currentDate >= courseStartDate) {
        const dateStr = currentDate.toLocaleDateString("en-GB");
        const dayName = currentDate.toLocaleDateString("en-US", {
          weekday: "long",
        });

        nextLecture = {
          day: dayName,
          date: dateStr,
          startTime: "10:00 AM",
          endTime: "12:00 PM",
        };
        break;
      }

      currentDate.setDate(currentDate.getDate() + 1);
    }

    return {
      ...course,
      nextLecture,
    };
  });

  return (
    <div className="w-full max-w-4xl overflow-x-auto">
      <div className="overflow-x-auto border border-gray-200 shadow-sm rounded-b-xl">
        <table className="w-full border-collapse bg-white text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-8 py-8 text-left font-medium text-gray-500">
                Course
              </th>
              <th className="px-8 py-8 text-left font-medium text-gray-500">
                Date
              </th>
              <th className="px-8 py-8 text-left font-medium text-gray-500">
                Day
              </th>
              <th className="px-8 py-8 text-left font-medium text-gray-500">
                Start Time
              </th>
              <th className="px-8 py-8 text-left font-medium text-gray-500">
                End Time
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {coursesWithNextLecture
              ?.filter((course) => new Date(course.endDate) >= new Date(today))
              .map((course) => (
                <tr key={course.id} className="hover:bg-gray-50">
                  <td className="px-8 py-8 font-medium text-gray-900">
                    {course.title}
                  </td>
                  <td className="px-8 py-8 text-gray-700">
                    {course.nextLecture?.date}
                  </td>
                  <td className="px-8 py-8 text-gray-700">
                    {course.nextLecture?.day}
                  </td>
                  <td className="px-8 py-8 text-gray-700">
                    {course.nextLecture?.startTime}
                  </td>
                  <td className="px-8 py-8 text-gray-700">
                    {course.nextLecture?.endTime}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
