import React from "react";

interface Props {
  name: string;
  id: string;
  status: string;
}

const StudentInfoCard = ({ name, id, status }: Props) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-6 flex justify-between items-center">
      <div className="flex items-center gap-3">
        {/* <Image src={} />  */}
        <div>
          <h1 className="text-xl font-bold">{name}</h1>
          <p className="text-sm text-gray-500">Student ID: {id}</p>
        </div>
      </div>
      <div className="bg-[#FFA41F]/10 text-[#FFA41F] px-3 py-1 rounded-full text-sm font-medium">
        {status}
      </div>
    </div>
  );
};

export default StudentInfoCard;
