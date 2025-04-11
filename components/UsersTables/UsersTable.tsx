"use client";
import {
  PencilSimple,
  MagnifyingGlass,
} from "@phosphor-icons/react/dist/ssr";
import { useUsersTable } from "@/hooks/useUsersTable";
import Loader from "../Shared/Loader";
import { Role } from "@/types";
import Link from "next/link";
import TempPagination from "../Pagination/TempPagination";
interface IProps{
  role: string;
}
export default function UsersTable(props:IProps) {
  const {
    value,
    handleSearchChange,
    filteredUsers,
    isLoading,
    handleNextPage,
    handlePreviousPage,
    currentPage,
    totalPages,
    setCurrentPage
  } = useUsersTable(props.role);
  if(isLoading){
    return <Loader/>
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-4">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <MagnifyingGlass size={20} className="text-[#FFA41F]" />
        </div>
        <input
          type="text"
          className="block w-64 p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          placeholder={props.role === Role.MONITOR? "Search for a monitor": props.role === Role.CO_MONITOR?"Search for a coMonitor": "Search for a student"}
          value={value}
          onChange={handleSearchChange}
        />
      </div>
        <div className="overflow-hidden border border-gray-200 shadow-sm rounded-xl">
          <table className="w-full border-collapse bg-white text-sm">
            <thead className="text-left text-xs text-gray-700 uppercase bg-gray-100">
              <tr className="bg-gray-50">
                <th className="px-4 py-4 text-left">ID</th>
                <th className="px-4 py-4 text-left">Name</th>
                <th className="px-4 py-4 text-left">Email</th>
                <th className="px-4 py-4 text-left">Date of Birth</th>
                <th className="px-4 py-4 text-left">City</th>
                <th className="px-4 py-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 font-medium text-gray-900">
                    {user.id}
                  </td>
                  <td className="px-4 py-4 text-gray-700">
                    {user.firstName} {user.lastName}
                  </td>
                  <td className="px-4 py-4 text-gray-700">{user.email}</td>
                  <td className="px-4 py-4 text-left text-gray-700">
                    {user.dateOfBirth?.toLocaleDateString()}
                  </td>
                  <td className="px-4 py-4 text-gray-700">{user.city}</td>
                  <td>
                    <div className="flex justify-evenly">
                      <Link href={`/admin/users/${user.userId}`}>
                        <PencilSimple size={18} color="#1cc925" weight="fill" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      <TempPagination
        currentPage={currentPage}
        totalPages={totalPages}
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
