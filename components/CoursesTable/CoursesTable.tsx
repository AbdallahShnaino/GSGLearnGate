import { courses } from "@/services/mock";
import { TrashSimple, PencilSimple, MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";

export default function CoursesTable() {
  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-4">
       <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <MagnifyingGlass size={20} className="text-[#FFA41F]" />
        </div>
        <input
          type="text"
          className="block w-64 p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Search for students"
        />
      </div>
      <div className="overflow-x-auto border border-gray-200 shadow-sm rounded-xl">
        <table className="w-full border-collapse bg-white text-sm">
          <thead className="text-left text-xs text-gray-700 uppercase bg-gray-100">
            <tr className="bg-gray-50">
              <th className="px-4 py-4 text-left">ID</th>
              <th className="px-4 py-4 text-left">Title</th>
              <th className="px-4 py-4 text-left">Monitor</th>
              <th className="px-4 py-4 text-left">Co-Monitor</th>
              <th className="px-4 py-4 text-center">Number of Students</th>
              <th className="px-4 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {courses.map((course) => (
              <tr key={course.id} className="hover:bg-gray-50">
                <td className="px-4 py-4 font-medium text-gray-900">{course.id}</td>
                <td className="px-4 py-4 text-gray-700">{course.title}</td>
                <td className="px-4 py-4 text-gray-700">{course.monitor}</td>
                <td className="px-4 py-4 text-gray-700">{course.coMonitor}</td>
                <td className="px-4 py-4 text-center">5</td>
                <td className="px-4 py-4 flex justify-center gap-2">
                  <TrashSimple size={18} color="#ee1717" weight="fill" />
                  <PencilSimple size={18} color="#1cc925" weight="fill" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}