
import AddTaskForm from '@/components/TaskForm/AddTaskForm'
import React from 'react'

const page = () => {
  return (
    <div>
       <h1 className="text-3xl font-bold mb-6 ml-8">Create Task</h1>
    <div className="md-flex-2 p-6 bg-gray-100 shadow-md rounded-xl sm-w-full">
            <AddTaskForm />
          </div>
    </div>
  )
}

export default page
