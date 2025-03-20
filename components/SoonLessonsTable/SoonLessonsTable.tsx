const upcomingLessons = [
  {
    id: 1,
    course: "React & Next.js",
    date: "March 22, 2025",
    time: "10:00 AM",
    monitor: "Ahmad Ali",
  },
  {
    id: 2,
    course: "UI/UX Design",
    date: "March 23, 2025",
    time: "2:00 PM",
    monitor: "Ahmad Ali",
  },
  {
    id: 3,
    course: "JavaScript Fundamentals",
    date: "March 25, 2025",
    time: "9:00 AM",
    monitor: "Ahmad Ali",
  },
];
export default function Table() {
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
                Monitor
              </th>
              <th className="px-8 py-8 text-left font-medium text-gray-500">
                Date
              </th>
              <th className="px-8 py-8 text-left font-medium text-gray-500">
                Time
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {upcomingLessons.map((lesson) => (
              <tr key={lesson.id} className="hover:bg-gray-50">
                <td className="px-8 py-8 font-medium text-gray-900">
                  {lesson.course}
                </td>
                <td className="px-8 py-8 font-medium text-gray-900">
                  {lesson.monitor}
                </td>
                <td className="px-8 py-8 text-gray-700">{lesson.date}</td>
                <td className="px-8 py-8 text-gray-700">{lesson.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
