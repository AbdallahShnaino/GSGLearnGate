'use client'
import { UploadSimple } from 'phosphor-react';
import React from 'react';

const TaskForm: React.FC = () => {
  return (
    <form className="space-y-4 max-w-6xl mx-auto p-4 border-none rounded-lg shadow-sm bg-white">
      <h2 className="text-xl font-semibold text-[#FFA41F]">Create New Task</h2>

      
      <div className="flex flex-col md:flex-row gap-4 md:gap-6">
        <div className="w-full">
          <label htmlFor="taskTitle" className="block text-sm font-medium text-gray-700">Task Title</label>
          <input
            type="text"
            id="taskTitle"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FFA41F] focus:border-[#FFA41F]"
            placeholder="Input Text"
          />
        </div>

        <div className="w-full md:w-70">
          <label htmlFor="course" className="block text-sm font-medium text-gray-700">Choose Course</label>
          <select
            id="course"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FFA41F] focus:border-[#FFA41F]"
          >
            <option value="">Choose</option>
            <option value="react">React</option>
            <option value="angular">Angular</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="taskDescription" className="block text-sm font-medium text-gray-700">Task Description</label>
        <textarea
          id="taskDescription"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FFA41F] focus:border-[#FFA41F]"
          rows={3}
          placeholder="Input Text"
        />
      </div>

     
      <div className="flex flex-col md:flex-row gap-4 md:gap-6">
        <div className="w-full">
          <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">Due Date</label>
          <input
            type="date"
            id="dueDate"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FFA41F] focus:border-[#FFA41F]"
          />
        </div>
        <div className="w-full">
          <label htmlFor="point" className="block text-sm font-medium text-gray-700">Task Point</label>
          <input
            type="number"
            id="point"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FFA41F] focus:border-[#FFA41F]"
            placeholder="Input point"
          />
        </div>
      </div>

      <div>
        <label htmlFor="file" className="block text-sm font-medium text-gray-700">Link File</label>
        <div className="relative w-full">
          <input
            type="file"
            id="file"
            className="mt-1 block w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FFA41F] focus:border-[#FFA41F] cursor-pointer"
          />
          <UploadSimple
            size={24}
            weight="bold"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-900"
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-[#FFA41F] text-white rounded-md shadow-sm hover:bg-[#ffd9a0] focus:outline-none focus:ring-2 focus:ring-[#FFA41F]"
        >
          Add Task
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
