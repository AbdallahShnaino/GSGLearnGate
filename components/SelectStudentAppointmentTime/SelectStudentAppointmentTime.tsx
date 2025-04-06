"use client";
import { insertStudentAppointmentBookingData } from "@/src/db/queries/insert";
import { Status } from "@/types";
import { useParams } from "next/navigation";
import { useState } from "react";

interface IProps {
  coMonitorId: number;
}
const SelectStudentAppointmentTime = (props: IProps) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [caption, setCaption] = useState("");
  const { courseId } = useParams();

  const times = ["10:00", "11:00", "14:00", "16:00"];

  const handleBooking = async () => {
    const dateStr = `${selectedDate}T${selectedTime}:00`;
    const dateObj = new Date(dateStr);

    try {
      await insertStudentAppointmentBookingData({
        courseId: Number(courseId),
        coMonitorId: props.coMonitorId,
        studentId: 1,
        caption: caption,
        dateTime: dateObj,
        status: Status.PENDING,
        createdAt: new Date().toLocaleDateString(),
        updatedAt: new Date().toLocaleDateString(),
      });
      alert(`Appointment booked on ${selectedDate} at ${selectedTime}`);
    } catch (error) {
      console.error("Booking failed:", error);
      alert("Something went wrong!! Please try again...");
    }
    setSelectedDate("");
    setSelectedTime("");
    setCaption("");
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
      <div className="flex flex-col gap-3">
        <label className="text-gray-700">Write Caption</label>
        <textarea
          className="p-2 border rounded-lg text-gray-700"
          rows={3}
          cols={30}
          placeholder="Enter your caption here"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        ></textarea>
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
