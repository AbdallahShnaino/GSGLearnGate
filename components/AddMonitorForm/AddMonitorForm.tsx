"use client";
import { submitUser, UserState } from "@/controllers/actions/addUserAction";
import { Role } from "@/types";
import { Image as ImageIcon } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import { useActionState, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddMonitorForm() {
  const initialState: UserState = {
    success: false,
    error: "",
    message: "",
    id: undefined,
  };
  const [formState, formAction, isPending] = useActionState(
    submitUser,
    initialState
  );
  const [selectedImg, setSelectedImg] = useState("");
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImg(imageUrl);
    }
  };
  useEffect(() => {
    if (formState.error) {
      toast.error(formState.message);
    } else if (formState.success) {
      toast.success("User Added successfully!");
      setSelectedImg("");
    }
  }, [formState]);

  return (
    <div className="w-full max-w-2xl mx-auto py-2 px-4">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="bg-white rounded-lg shadow-2xl overflow-hidden px-6 py-4">
        <h1 className="text-xl font-semibold text-[#FFA41F]">Add User</h1>
          <form action={formAction} className="space-y-2">
            <div className="flex flex-col items-center">
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                className="opacity-0 w-16 h-16 rounded-full cursor-pointer border-2 border-gray-300 bg-gray-100"
                required
              />
              <label
                htmlFor="image"
                className="flex justify-center items-center w-16 h-16 rounded-full cursor-pointer bg-gray-100 border-2 border-gray-300"
              >
                {selectedImg ? (
                <Image
                  src={selectedImg}
                  alt="Selected"
                  className="rounded-full object-cover"
                  width={70}
                  height={70}
                />
              ) : (
                <ImageIcon className="w-8 h-8 text-gray-500" />
              )}
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="Enter first name"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Enter last name"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter email address"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Create a password"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor="dateOfBirth"
                  className="block text-sm font-medium text-gray-700"
                >
                  Date of Birth
                </label>
                <input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-700"
                >
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  placeholder="Enter your city"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700"
              >
                Role
              </label>
              <select
                id="role"
                name="role"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              >
                <option value={Role.MONITOR}>Monitor</option>
                <option value={Role.CO_MONITOR}>Co-Monitor</option>
              </select>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className=" w-1/3 px-4 py-2 border border-none rounded-md shadow-sm text-sm font-medium text-white bg-[#FFA41F]"
              >
                {isPending ? "submitting" : "submit"}
              </button>
            </div>
          </form>
        </div>
    </div>
  );
}
