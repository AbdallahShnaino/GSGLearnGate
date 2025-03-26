"use client";
import React, { useState } from "react";
import EditProfileModal from "../modals/EditProfileModal/EditProfileModal";

const EditEmailAddress = () => {
  //================{For Test}======================
  const user = {
    email: "mo.qashqesh@gmail.com",
  };
  //================{For Test}======================

  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="border-1 p-5 rounded-md">
      <div className="flex justify-between items-center">
        <p className="text-xl font-bold">Email Address</p>
        <button
          onClick={() => setOpenModal(true)}
          className="border-1 border-gray-400 rounded py-0.5 px-3 cursor-pointer text-sm hover:bg-[var(--primary-color)] hover:text-white transition-all"
        >
          Edit
        </button>
      </div>

      <p className="text-[#777] text-sm">{user.email}</p>

      {openModal && (
        <EditProfileModal
          onClose={() => setOpenModal(false)}
          typeOfEdit="editEmailAddress"
        />
      )}
    </div>
  );
};

export default EditEmailAddress;
