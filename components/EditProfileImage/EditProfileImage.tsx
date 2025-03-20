import React from "react";

const EditProfileImage = () => {
  return (
    <div className="border-1 p-5 rounded-md">
      <div className="flex justify-between items-center">
        <p className="text-lg">Profile Image</p>
        <button className="border-1 border-gray-400 rounded py-0.5 px-3 cursor-pointer text-sm hover:bg-[var(--primary-color)] hover:text-white transition-all">
          Edit
        </button>
      </div>
      <div className="border-1 w-16 h-16 rounded-full mt-5"></div>
    </div>
  );
};

export default EditProfileImage;
