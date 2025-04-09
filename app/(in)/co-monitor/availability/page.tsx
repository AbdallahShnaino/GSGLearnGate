import React from "react";
import { UserCircle } from "@phosphor-icons/react/dist/ssr";

const page = () => {
  return (
    <header>
      <div className="flex items-center justify-between p-2">
        <h1 className="text-xl font-semibold">Availability Management</h1>
        <div className="flex items-center gap-2">
          <span className="text-gray-600">Hi, CO-Monitor</span>
          <UserCircle size={32} weight="duotone" className="text-[#FFA41F]" />
        </div>
      </div>
      <p className="text-gray-600 pl-2">Schedule your available time slots</p>
    </header>
  );
};

export default page;
