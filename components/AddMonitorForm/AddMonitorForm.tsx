"use client";
import { Image } from "@phosphor-icons/react/dist/ssr";
import { useState } from "react";

export default function AddMonitorForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    dateOfBirth: "",
    city: "",
    role: "",
    image: null as File | null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setFormData((prevData) => ({
        ...prevData,
        image: file,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    if (formData.image) {
      console.log("Image file:", formData.image);
    }
  };
  return (
    <div className="w-full max-w-2xl mx-auto py-2 px-4">
      <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
        <div className="px-6 pb-2">
          <form onSubmit={handleSubmit} className="space-y-2">
            <div className="flex flex-col items-center">
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                className="opacity-0 w-16 h-16 rounded-full cursor-pointer border-2 border-gray-300 bg-gray-100"
              />
              <label
                htmlFor="image"
                className="flex justify-center items-center w-16 h-16 rounded-full cursor-pointer bg-gray-100 border-2 border-gray-300"
              >
                <Image className="w-8 h-8 text-gray-500" />
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
                  value={formData.firstName}
                  onChange={handleChange}
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
                  value={formData.lastName}
                  onChange={handleChange}
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
                value={formData.email}
                onChange={handleChange}
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
                value={formData.password}
                onChange={handleChange}
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
                  value={formData.dateOfBirth}
                  onChange={handleChange}
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
                  value={formData.city}
                  onChange={handleChange}
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
                value={formData.role}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              >
                <option value="monitor">Monitor</option>
                <option value="co-monitor">Co-Monitor</option>
              </select>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className=" w-1/3 px-4 py-2 border border-none rounded-md shadow-sm text-sm font-medium text-white bg-[#FFA41F]"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
