import { getLimitCoursesByStudent } from "@/src/db/queries/select";

const Table = async () => {
  const courses = await getLimitCoursesByStudent(1, 3);
  return (
    <div className="w-full max-w-4xl overflow-x-auto">
      <div className="overflow-x-auto border border-gray-200 shadow-sm rounded-b-xl">
        <table className="w-full border-collapse bg-white text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-8 py-8 text-left font-medium text-gray-500">
                Course
              </th>
              {/* <th className="px-8 py-8 text-left font-medium text-gray-500">
                Date
              </th> */}
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
            {courses?.map((course) => (
              <tr key={course.id} className="hover:bg-gray-50">
                <td className="px-8 py-8 font-medium text-gray-900">
                  {course.title}
                </td>
                <td className="px-8 py-8 text-gray-700">Date</td>
                <td className="px-8 py-8 text-gray-700">Time</td>
                <td className="px-8 py-8 text-gray-700">Time</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
