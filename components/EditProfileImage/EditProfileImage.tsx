"use client";
import Image from "next/image";
import React, { useState } from "react";
import EditProfileModal from "../EditProfileModal/EditProfileModal";

const EditProfileImage = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="border-1 p-5 rounded-md">
      <div className="flex justify-between items-center">
        <p className="text-xl font-bold">Profile Image</p>
        <button
          onClick={() => setOpenModal(true)}
          className="border-1 border-gray-400 rounded py-0.5 px-3 cursor-pointer text-sm hover:bg-[var(--primary-color)] hover:text-white transition-all"
        >
          Edit
        </button>
      </div>
      <div className="border-1 w-16 h-16 rounded-full mt-5 flex justify-center items-center overflow-hidden">
        <Image
          src={"/img/Unknown_person.jpg"}
          alt="user profile image"
          width={64}
          height={64}
        />
      </div>
      {openModal && <EditProfileModal onClose={() => setOpenModal(false)} typeOfEdit={"editImage"} />}
    </div>
  );
};

export default EditProfileImage;
