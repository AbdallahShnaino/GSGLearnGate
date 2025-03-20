import { users } from "@/services/mock";
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
      <div className="overflow-hidden border border-gray-200 shadow-sm rounded-b-xl">
        <table className="w-full border-collapse bg-white text-sm ">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-4 text-left font-medium text-gray-500">
                ID
              </th>
              <th className="px-4 py-4 text-left font-medium text-gray-500">
                Name
              </th>
              <th className="px-4 py-4 text-left font-medium text-gray-500">
                Email
              </th>
              <th className="px-4 py-4 text-right font-medium text-gray-500">
                Date of Birth
              </th>
              <th className="px-4 py-4 text-center font-medium text-gray-500">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-4 py-4 font-medium text-gray-900">
                  {user.id}
                </td>
                <td className="px-4 py-4 text-gray-700">{user.name}</td>
                <td className="px-4 py-4 text-gray-700">{user.email}</td>
                <td className="px-4 py-4 text-right text-gray-700">
                  {user.dob}
                </td>
                <td>
                  <div className="flex justify-evenly ">
                    <TrashSimple size={18} color="#ee1717" weight="fill" />
                    <PencilSimple size={18} color="#179bee" weight="fill" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
