"use client";

import SelectCourse from "@/components/Dropdowns/SelectCourse";
import Loader from "@/components/Shared/Loader";
import { TimePicker } from "@/components/TimePicker/TimePicker";
import { saveAvailability } from "@/controllers/actions/availability";
import { getCoMonitorCoursesNames } from "@/services/courses";
import { useActionState, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Submit from "./Submit";

export default function createAppointmentPage() {
  const CO_MONITOR_ID = 20;

  const [coursesList, setCoursesList] = useState<
    | {
        courseId: number;
        courseName: string;
      }[]
    | null
  >();
  const [loading, setLoading] = useState(true);
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("17:00");

  const [formState, formAction, isPending] = useActionState(saveAvailability, {
    success: false,
    message: "",
    errors: null,
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const courses = await getCoMonitorCoursesNames(CO_MONITOR_ID);
      setCoursesList(courses);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [CO_MONITOR_ID]);

  useEffect(() => {
    if (formState?.message) {
      formState.success
        ? toast.success(formState.message, { autoClose: 3000 })
        : toast.error(formState.message, { autoClose: 3000 });
    }
    fetchData();
  }, [formState]);

  if (loading) return <Loader message="Loading availability..." />;

  return (
    <section className="bg-white rounded shadow-md overflow-hidden p-5 border-1 border-gray-300">
      <h2 className="text-lg font-semibold mb-4">Add New Slot</h2>
      <form action={formAction} className="space-y-4">
        {coursesList && coursesList?.length > 0 && (
          <SelectCourse options={coursesList} appendSearchParams={false} />
        )}

        <div className="space-y-2">
          <label className="block text-sm font-medium">Date</label>
          <input
            type="date"
            name="date"
            required
            className="w-full p-2 border rounded-md"
          />
          <input type="hidden" name="coMonitorId" value={CO_MONITOR_ID} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium">Start Time</label>
            <TimePicker
              onChange={setStartTime}
              name="startTime"
              value={startTime}
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium">End Time</label>
            <TimePicker value={endTime} onChange={setEndTime} name="endTime" />
          </div>
        </div>

        <Submit label="Add Availability" />
      </form>
    </section>
  );
}
