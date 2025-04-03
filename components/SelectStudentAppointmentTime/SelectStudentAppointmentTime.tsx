"use client";
import { useState } from "react";

const SelectStudentAppointmentTime = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const times = ["10:00 AM", "11:00 AM", "2:00 PM", "4:00 PM"];

  const handleBooking = () => {
    alert(`Appointment booked on ${selectedDate} at ${selectedTime}`);
  };
  return (
    <>
      <div className="flex flex-col gap-3">
        <label className="text-gray-700">Select Date</label>
        <input
          type="date"
          className="p-2 border rounded-lg text-gray-700"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-3">
        <label className="text-gray-700">Select Time</label>
        <select
          className="p-2 border rounded-lg text-gray-700"
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)}
        >
          <option value="" disabled>
            Select a time
          </option>
          {times.map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleBooking}
        className="mt-3 px-4 py-2 bg-[#FFA41F] text-white rounded-lg hover:bg-[#FF8C00] transition cursor-pointer flex justify-center"
        disabled={!selectedDate || !selectedTime}
      >
        Confirm Booking
      </button>
    </>
  );
};

export default SelectStudentAppointmentTime;
