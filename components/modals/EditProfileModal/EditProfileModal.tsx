import React from "react";

interface IProps {
  typeOfEdit: string;
  onClose: () => void;
}

const EditProfileModal = ({ onClose, typeOfEdit }: IProps) => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.7)] flex justify-center items-center">
      {/* Edit Profile Image */}
      {typeOfEdit === "editImage" && (
        <form className="bg-white py-5 rounded-md w-[80%] sm:w-96">
          <p className="mx-5 text-lg font-bold">Edit Profile Image</p>
          <hr className="mt-4" />
          <div className="flex flex-col gap-1.5 mx-5 pt-3">
            <input
              type="file"
              name="image"
              id="image"
              className="px-1.5 py-1.5"
            />
          </div>
          <hr className="mt-4" />
          <div className="pt-5 flex gap-2 justify-end mx-5">
            <button
              type="button"
              className="bg-[#eeee] rounded py-0.5 px-2.5 cursor-pointer"
              onClick={onClose}
            >
              Cancel
            </button>
            <input
              type="submit"
              value="Save"
              className="bg-[#222831] hover:bg-[#393E46] text-white rounded py-0.5 px-2.5 cursor-pointer"
            />
          </div>
        </form>
      )}
      {/* Edit Profile Image */}

      {/* Edit Personal Information */}
      {typeOfEdit === "editPersonalInformation" && (
        <form className="bg-white py-5 rounded-md w-[80%] sm:w-96">
          <p className="mx-5 text-lg font-bold">Edit Personal Information</p>
          <hr className="mt-4" />
          <div className="flex flex-col gap-1.5 mx-5 pt-3">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              name="first_name"
              id="firstName"
              placeholder="First Name"
              className="border-1 border-gray-400 rounded-md px-1.5 py-1.5 focus:outline-blue-500"
            />
          </div>
          <div className="flex flex-col gap-1.5 mx-5 pt-3">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              name="last_name"
              id="lastName"
              placeholder="Last Name"
              className="border-1 border-gray-400 rounded-md px-1.5 py-1.5 focus:outline-blue-500"
            />
          </div>
          <div className="flex flex-col gap-1.5 mx-5 pt-3">
            <label htmlFor="DOB">Date Of Birth</label>
            <input
              type="date"
              name="date_of_birth"
              id="DOB"
              placeholder="Date Of Birth"
              className="border-1 border-gray-400 rounded-md px-1.5 py-1.5 focus:outline-blue-500"
            />
          </div>
          <hr className="mt-4" />
          <div className="pt-5 flex gap-2 justify-end mx-5">
            <button
              type="button"
              className="bg-[#eeee] rounded py-0.5 px-2.5 cursor-pointer"
              onClick={onClose}
            >
              Cancel
            </button>
            <input
              type="submit"
              value="Save"
              className="bg-[#222831] hover:bg-[#393E46] text-white rounded py-0.5 px-2.5 cursor-pointer"
            />
          </div>
        </form>
      )}
      {/* Edit Personal Information */}

      {/* Edit Email Address */}
      {typeOfEdit === "editEmailAddress" && (
        <form className="bg-white py-5 rounded-md w-[80%] sm:w-96">
          <p className="mx-5 text-lg font-bold">Edit Email Address</p>
          <hr className="mt-4" />
          <div className="flex flex-col gap-1.5 mx-5 pt-3">
            <label htmlFor="lastName">New Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              className="border-1 border-gray-400 rounded-md px-1.5 py-1.5 focus:outline-blue-500"
            />
          </div>
          <hr className="mt-4" />
          <div className="pt-5 flex gap-2 justify-end mx-5">
            <button
              type="button"
              className="bg-[#eeee] rounded py-0.5 px-2.5 cursor-pointer"
              onClick={onClose}
            >
              Cancel
            </button>
            <input
              type="submit"
              value="Save"
              className="bg-[#222831] hover:bg-[#393E46] text-white rounded py-0.5 px-2.5 cursor-pointer"
            />
          </div>
        </form>
      )}
      {/* Edit Email Address */}

      {/* Edit Password */}
      {typeOfEdit === "editPassword" && (
        <form className="bg-white py-5 rounded-md w-[80%] sm:w-96">
          <p className="mx-5 text-lg font-bold">Edit Password</p>
          <hr className="mt-4" />
          <div className="flex flex-col gap-1.5 mx-5 pt-3">
            <label htmlFor="lastName">New Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              className="border-1 border-gray-400 rounded-md px-1.5 py-1.5 focus:outline-blue-500"
            />
          </div>
          <hr className="mt-4" />
          <div className="pt-5 flex gap-2 justify-end mx-5">
            <button
              type="button"
              className="bg-[#eeee] rounded py-0.5 px-2.5 cursor-pointer"
              onClick={onClose}
            >
              Cancel
            </button>
            <input
              type="submit"
              value="Save"
              className="bg-[#222831] hover:bg-[#393E46] text-white rounded py-0.5 px-2.5 cursor-pointer"
            />
          </div>
          {/* Edit Password */}
        </form>
      )}
    </div>
  );
};

export default EditProfileModal;
