"use client";
import React, { useState } from "react";
import EditProfileModal from "../EditProfileModal/EditProfileModal";

const EditPassword = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="border-1 p-5 rounded-md">
      <div className="flex justify-between items-center">
        <p className="text-xl font-bold">Password</p>
        <button
          onClick={() => setOpenModal(true)}
          className="border-1 border-gray-400 rounded py-0.5 px-3 cursor-pointer text-sm hover:bg-[var(--primary-color)] hover:text-white transition-all"
        >
          Edit
        </button>
      </div>

      <p className="text-[#777] text-sm">●●●●●●●●</p>

      {openModal && (
        <EditProfileModal
          onClose={() => setOpenModal(false)}
          typeOfEdit="editPassword"
        />
      )}
    </div>
  );
};

export default EditPassword;
