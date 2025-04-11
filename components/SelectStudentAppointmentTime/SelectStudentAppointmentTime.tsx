"use client";
import { getCoMonitorAppointmentsList } from "@/services/availability";
import { bookAppointment } from "@/src/db/queries/update";
import { CoMonitorAppointment } from "@/types/appointments";
import { useEffect, useState } from "react";

interface IProps {
  coMonitorId: number;
  studentId: string;
}
const SelectStudentAppointmentTime = (props: IProps) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedRecord, setSelectedRecord] = useState<CoMonitorAppointment>();
  const [availability, setAvailability] = useState<CoMonitorAppointment[]>();
  const [time, setTime] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const appointments = await getCoMonitorAppointmentsList(
          props.coMonitorId
        );
        setAvailability(appointments);
      } catch {
        throw new Error("CODE:3001");
      }
    };
    fetchData();
  }, [props.coMonitorId]);

  const handleBooking = async () => {
    try {
      await bookAppointment(selectedRecord!.id, Number(props.studentId));
      alert(`Appointment booked on ${selectedDate} at ${time}`);
    } catch {
      alert("Something went wrong!! Please try again...");
    }
    setSelectedDate("");
    setTime("");
  };
  const handleDateSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    const newSelectedRecord = availability?.find((appointment) => {
      return appointment.date.toLocaleDateString("en-GB") === selectedValue;
    });
    setSelectedDate(selectedValue);
    setSelectedRecord(newSelectedRecord);
    setTime(newSelectedRecord!.startTime);
  };
  return (
    <>
      <div className="flex flex-col gap-3">
        <label className="text-gray-700">Select Date</label>
        <select
          className="p-2 border rounded-lg text-gray-700"
          value={selectedDate}
          onChange={handleDateSelect}
        >
          <option value="" disabled>
            Select a time
          </option>
          {availability &&
            availability
              ?.filter((appointment) => {
                return appointment.isBooked === false;
              })
              .map((appointment) => (
                <option
                  key={appointment.id}
                  value={appointment.date.toLocaleDateString("en-GB")}
                >
                  {appointment.date.toLocaleDateString("en-GB")}
                </option>
              ))}
        </select>
      </div>
      <div className="flex flex-col gap-3">
        <label className="text-gray-700">Time</label>
        <input
          type="text"
          className="p-2 border rounded-lg text-gray-700"
          value={time ? time : "No Time"}
          disabled
        />
      </div>
      <button
        onClick={handleBooking}
        className="mt-3 px-4 py-2 bg-[#FFA41F] text-white rounded-lg hover:bg-[#FF8C00] transition cursor-pointer flex justify-center"
        disabled={!selectedDate}
      >
        Confirm Booking
      </button>
    </>
  );
};

export default SelectStudentAppointmentTime;
