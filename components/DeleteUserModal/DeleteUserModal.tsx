import React from 'react'
interface IProps{
    setOpen: (open:boolean)=>void;
    confirmDelete:()=>void;
    selectedUser:string;
}
const DeleteUserModal = (props:IProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center  bg-gray-900/10 backdrop-blur-sm">

    <div className="bg-white p-6 rounded-lg shadow-lg w-80">
      <h2 className="text-lg font-semibold text-gray-800">
        Delete User
      </h2>
      <p className="text-gray-600 mt-2">
        Are you sure you want to delete <b>{props.selectedUser}</b>?
      </p>
      <div className="mt-4 flex justify-end space-x-3">
        <button
          onClick={() => props.setOpen(false)}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md"
        >
          Cancel
        </button>
        <button
          onClick={props.confirmDelete}
          className="px-4 py-2 bg-red-600 text-white rounded-md"
        >
          Confirm
        </button>
      </div>
    </div>
  </div>
  )
}

export default DeleteUserModal