import React from "react";
import CardFooter from "@/components/CardFooter/CardFooter";
import CardTskHeader from "@/components/CardTskHeader/CardTskHeader";
import TaskCardDetails from "@/components/TaskCardDetails/TaskCardDetails";
import PuplicCommments from "@/components/Comments/PuplicCommments";
const page = () => {
  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      <CardTskHeader />
      <div className="border border-orange-100 rounded-lg overflow-hidden">
        <TaskCardDetails />
        <PuplicCommments TaskId={19} />
        <CardFooter />
      </div>
    </div>
  );
};

export default page;
