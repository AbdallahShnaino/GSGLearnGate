import { courses } from "@/services/mock";
import { TrashSimple, PencilSimple } from "@phosphor-icons/react/dist/ssr";

export default function Table() {
  return (
    <div className="w-full max-w-4xl mx-auto p-4">
       <div className="bg-[#222831] py-3 px-4 rounded-t-xl">
        <input
          type="text"
          placeholder="Search users..."
          className="p-2 border bg-white border-gray-300 rounded-lg"
        />
        </div>
      <div className="overflow-x-auto border border-gray-200 shadow-sm rounded-b-xl">
        <table className="w-full border-collapse bg-white text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-4 text-left font-medium text-gray-500">ID</th>
              <th className="px-4 py-4 text-left font-medium text-gray-500">Title</th>
              <th className="px-4 py-4 text-left font-medium text-gray-500">Monitor</th>
              <th className="px-4 py-4 text-left font-medium text-gray-500">Co-Monitor</th>
              <th className="px-4 py-4 text-center font-medium text-gray-500">Attendance</th>
              <th className="px-4 py-4 text-center font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {courses.map((course) => (
              <tr key={course.id} className="hover:bg-gray-50">
                <td className="px-4 py-4 font-medium text-gray-900">{course.id}</td>
                <td className="px-4 py-4 text-gray-700">{course.title}</td>
                <td className="px-4 py-4 text-gray-700">{course.monitor}</td>
                <td className="px-4 py-4 text-gray-700">{course.coMonitor}</td>
                <td className="px-4 py-4 text-center">
                  <button
                    className="text-blue-600 hover:underline"
                  >
                    View
                  </button>
                </td>
                <td className="px-4 py-4 flex justify-center gap-2">
                  <TrashSimple size={18} color="#ee1717" weight="fill" />
                  <PencilSimple size={18} color="#179bee" weight="fill" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
