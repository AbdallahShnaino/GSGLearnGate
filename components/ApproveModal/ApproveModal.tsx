import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ApproveModalProps } from '@/types/students';
import { X } from 'phosphor-react';

const ApproveModal: React.FC<ApproveModalProps> = ({ isOpen, onClose, request, onApprove }: ApproveModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center backdrop-blur-sm z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="bg-white rounded-2xl shadow-xl p-6 max-w-md w-full relative"
      >
        
        <button onClick={onClose} className="absolute top-3 right-3 cursor-pointer text-gray-500 hover:text-gray-700 transition">
          <X size={16} weight="bold" />
        </button>

       
        <div className="flex items-center gap-3 border-b pb-3 mb-4">
          <Image
            src={request.profilePicture}
            alt="User"
            width={50}
            height={50}
            className="rounded-full border border-gray-300"
          />
          <div>
            <h2 className="text-lg font-semibold text-gray-800">{request.name}</h2>
            <p className="text-sm text-gray-500">{request.email}</p>
          </div>
        </div>

     
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
          <p><span className="font-semibold text-gray-700">Request Date:</span> {request.RequestDate}</p>
          <p><span className="font-semibold text-gray-700">Meeting Date:</span> {request.MeetingDate}</p>
          <p><span className="font-semibold text-gray-700">Day:</span> {request.day}</p>
          <p><span className="font-semibold text-gray-700">Time:</span> {request.time}</p>
          <p className="col-span-2 border-t pt-3 text-gray-600">
            <span className="font-semibold text-gray-700">Caption:</span> {request.caption}
          </p>
        </div>

       
        <div className="flex justify-end gap-3 mt-5">
          <button onClick={onClose} className="px-4 py-2 cursor-pointer bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition">
            Cancel
          </button>
          <button onClick={() => onApprove(request.id)} className="px-4 py-2 cursor-pointer bg-green-600 text-white rounded-md hover:bg-green-700 transition">
            Approve
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ApproveModal;
