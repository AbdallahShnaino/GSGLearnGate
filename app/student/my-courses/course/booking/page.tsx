"use client";

import Link from "next/link";
import { useState } from "react";

const BookingPage = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState("");

  const teachers = ["Mohammad Ahmad", "Sarah Khaled", "Ali Hassan"];
  const times = ["10:00 AM", "11:00 AM", "2:00 PM", "4:00 PM"];

  const handleBooking = () => {
    alert(
      `Appointment booked with ${selectedTeacher} on ${selectedDate} at ${selectedTime}`
    );
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-white shadow-lg rounded-2xl border border-gray-200 p-6 flex flex-col gap-4 mt-10">
      <h2 className="text-2xl font-semibold text-gray-800 text-center">
        Book an Appointment
      </h2>

      <div className="flex flex-col gap-3">
        <label className="text-gray-700">Select Teacher</label>
        <select
          className="p-2 border rounded-lg text-gray-700"
          value={selectedTeacher}
          onChange={(e) => setSelectedTeacher(e.target.value)}
        >
          <option value="" disabled>
            Select a teacher
          </option>
          {teachers.map((teacher) => (
            <option key={teacher} value={teacher}>
              {teacher}
            </option>
          ))}
        </select>
      </div>

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
        disabled={!selectedDate || !selectedTime || !selectedTeacher}
      >
        Confirm Booking
      </button>

      <Link
        href="/student/my-appointments"
        className="text-center text-[#FFA41F] hover:underline mt-4"
      >
        View My Appointments
      </Link>
    </div>
  );
};

export default BookingPage;
