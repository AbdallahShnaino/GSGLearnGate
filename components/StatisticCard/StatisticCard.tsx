import React, { ReactNode } from "react";
interface IProps{
  title: string;
  total: number;
  icon: ReactNode
}
const StatisticCard = (props:IProps) => {
  return (
    <div className="flex p-10 shadow-md shadow-gray-300/80 rounded-lg bg-[#f7fdff] justify-between items-center ">
        <div className="flex flex-col">
            <p className="text-gray-400">{props.title}</p>
            <p>{props.total}</p>
        </div>
        <div className="bg-[#FFF5E8] p-2 rounded-2xl">
            {props.icon}
        </div>
    </div>

  );
};

export default StatisticCard;
