import React from "react";

const EditPersonalInformation = () => {
  //================{For Test}======================
  const user = {
    firstName: "Mohammed",
    lastName: "Qashqesh",
    dateOfBirth: "2003-12-18",
    email: "mo.qashqesh@gmail.com",
  };
  //================{For Test}======================

  return (
    <div className="border-1 p-5 rounded-md">
      <div className="flex justify-between items-center">
        <p className="text-xl font-bold">Personal Information</p>
        <button className="border-1 border-gray-400 rounded py-0.5 px-3 cursor-pointer text-sm hover:bg-[var(--primary-color)] hover:text-white transition-all">
          Edit
        </button>
      </div>
      <div className="flex flex-col gap-3 mt-3">
        <div>
          <p className="text-lg font-bold">First Name</p>
          <p className="text-[#777] text-sm">{user.firstName}</p>
        </div>
        <div>
          <p className="text-lg font-bold">Last Name</p>
          <p className="text-[#777] text-sm">{user.lastName}</p>
        </div>
        <div>
          <p className="text-lg font-bold">Email Address</p>
          <p className="text-[#777] text-sm">{user.email}</p>
        </div>
      </div>
    </div>
  );
};

export default EditPersonalInformation;
