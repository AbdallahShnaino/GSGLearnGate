"use client";
import CreateTaskButtom from "@/components/CreateTaskButtom/CreateTaskButtom";
import Filter from "@/components/Filter/Filter";
import Pagination from "@/components/Pagination/Pagination";
import SearchBar from "@/components/SearchBar/SearchBar";
import SelectOption from "@/components/SelectOption/SelectOption";
import StatusTaskCard from "@/components/StatusTaskCards/StatusTaskCard";
import TaskListCom from "@/components/TasksList/TaskListCom";
import { useSearch } from "@/hooks/useSearch";
import { tasks } from "@/services/mock";
import React from "react";

const page = () => {
  const { value: searchQuery, updateSearchParam } = useSearch("search");
  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <h1 className="text-2xl font-bold text-[#FFA41F]">
          Tasks & Assignments
        </h1>
        <CreateTaskButtom />
      </div>
      <StatusTaskCard />
      <div className="bg-white border border-[#FFA41F]/30 rounded-lg p-3  mb-6 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <SearchBar
              updateSearchParam={updateSearchParam}
              placeholderText="Search tasks..."
            />
          </div>
          <div className="flex flex-col md:flex-row gap-2 items-center">
            <Filter />
            <SelectOption />
          </div>
        </div>
      </div>

      <TaskListCom tasks={tasks} />
      <Pagination />
    </div>
  );
};

export default page;
