import React from "react";

interface IProps {
  onClose: () => void;
}

const EditProfileModal = ({onClose}: IProps) => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.7)] flex justify-center items-center">
      <form className="bg-white py-5 rounded-md w-[80%] sm:w-96">
        <p className="mx-5">Edit Personal Information</p>
        <hr className="mt-4" />
        <div className="flex flex-col gap-1.5 mx-5 pt-3">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            placeholder="First Name"
            className="border-1 border-gray-400 rounded-md px-1.5 py-1.5 focus:outline-blue-500"
          />
        </div>
        <div className="flex flex-col gap-1.5 mx-5 pt-3">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            placeholder="Last Name"
            className="border-1 border-gray-400 rounded-md px-1.5 py-1.5 focus:outline-blue-500"
          />
        </div>
        <div className="flex flex-col gap-1.5 mx-5 pt-3">
          <label htmlFor="DOB">Date Of Birth</label>
          <input
            type="date"
            name="DOB"
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
    </div>
  );
};

export default EditProfileModal;
