"use client";
import Loader from "@/components/Shared/Loader";
import { getCoMonitorAppointmentsList } from "@/services/availability";
import { CoMonitorAppointment } from "@/types/appointments";
import { useEffect, useState } from "react";

export default function ListAppointmentPage() {
  const [availability, setAvailability] = useState<CoMonitorAppointment[]>();
  const [loading, setLoading] = useState(true);
  const CO_MONITOR_ID = 20;

  const fetchData = async () => {
    try {
      setLoading(true);
      const appointments = await getCoMonitorAppointmentsList(CO_MONITOR_ID);
      setAvailability(appointments);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  if (loading) return <Loader message="Loading availability..." />;

  return (
    <section className="bg-white rounded shadow-md overflow-hidden p-5 border-1 border-gray-300">
      <h2 className="text-lg font-semibold mb-4">Your Availability</h2>
      <button onClick={fetchData}>Reload Data</button>
      {availability?.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No availability slots yet
        </div>
      ) : (
        <div className="overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr className="text-left text-sm text-gray-500">
                <th className="p-3">Date</th>
                <th className="p-3">Time</th>
                <th className="p-3">Status</th>
                <th className="p-3">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {availability?.map((slot) => (
                <tr key={slot.id} className="hover:bg-gray-50">
                  <td className="p-3">
                    {new Date(slot.date).toLocaleDateString()}
                  </td>
                  <td className="p-3">
                    {slot.startTime} - {slot.endTime}
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        slot.isBooked
                          ? "bg-red-100 text-red-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {slot.isBooked ? "Booked" : "Available"}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="text-sm">
                      <div>{slot.course?.title || "General"}</div>
                      {slot.student && (
                        <div className="text-gray-500">
                          {slot.student.firstName} {slot.student.lastName}
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
