"use client";
import React, { useState } from "react";
import EditProfileModal from "../modals/EditProfileModal/EditProfileModal";

const EditPersonalInformation = () => {
  //================{For Test}======================
  const user = {
    firstName: "Mohammed",
    lastName: "Qashqesh",
    dateOfBirth: "2003-12-18",
  };
  //================{For Test}======================

  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="border-1 p-5 rounded-md">
      <div className="flex justify-between items-center">
        <p className="text-xl font-bold">Personal Information</p>
        <button
          onClick={() => setOpenModal(true)}
          className="border-1 border-gray-400 rounded py-0.5 px-3 cursor-pointer text-sm hover:bg-[var(--primary-color)] hover:text-white transition-all"
        >
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
          <p className="text-lg font-bold">Date Of Birth</p>
          <p className="text-[#777] text-sm">{user.dateOfBirth}</p>
        </div>
      </div>
      {openModal && (
        <EditProfileModal
          onClose={() => setOpenModal(false)}
          typeOfEdit="editPersonalInformation"
        />
      )}
    </div>
  );
};

export default EditPersonalInformation;
