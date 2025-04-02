import React from "react";

const SelectOption = () => {
  return (
    <div>
      <select className="px-3 py-2 border border-gray-200 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#FFA41F] focus:border-transparent">
        <option>All Tasks</option>
        <option>Completed Tasks</option>
        <option>In Progress Tasks</option>
      </select>
    </div>
  );
};

export default SelectOption;
