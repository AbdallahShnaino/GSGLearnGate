"use client";
import { useState } from "react";
import {
  TrashSimple,
  PencilSimple,
  MagnifyingGlass,
} from "@phosphor-icons/react/dist/ssr";
import DeleteUserModal from "../DeleteUserModal/DeleteUserModal";
import { User } from "@/types";
import { useSearch } from "@/hooks/useSearch";
interface IProps{
  users: User[];
}
export default function UsersTable(props:IProps) {
  const{value, setValue, updateSearchParam}=useSearch("name")
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<string>();

  const handleDeleteClick = (user: string) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const confirmDelete = () => {
    if (selectedUser) {
      console.log(`Deleting user with ID: ${selectedUser}`);
    }
    setOpen(false);
    setSelectedUser("");
  };
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value;
    setValue(searchValue);
    updateSearchParam(searchValue);
  };
  const filteredUsers = props.users.filter((user) =>
    `${user.firstName} ${user.lastName}`.toLowerCase().includes(value.toLowerCase())
  );


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
                <td className="px-4 py-4 text-gray-700">{user.firstName+" "+user.lastName}</td>
                <td className="px-4 py-4 text-gray-700">{user.email}</td>
                <td className="px-4 py-4 text-left text-gray-700">
                  {user.dateOfBirth.toLocaleDateString()}
                </td>
                <td className="px-4 py-4 text-gray-700">{user.city}</td>
                <td>
                  <div className="flex justify-evenly">
                    <button onClick={() => handleDeleteClick(user.firstName)}>
                      <TrashSimple size={18} color="#ee1717" weight="fill" />
                    </button>
                    <PencilSimple size={18} color="#1cc925" weight="fill" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {open && selectedUser && (
        <DeleteUserModal
          setOpen={setOpen}
          confirmDelete={confirmDelete}
          selectedUser={selectedUser}
        />
      )}
    </div>
  );
}
