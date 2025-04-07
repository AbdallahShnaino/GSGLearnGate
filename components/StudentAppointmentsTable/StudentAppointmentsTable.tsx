import { getStudentAppointments } from "@/src/db/queries/select";

interface IProps {
  studentId: string;
}
const StudentAppointmentsTable = async (props: IProps) => {
  const appointments = await getStudentAppointments(Number(props.studentId));
  const statusStyles = {
    accepted: {
      text: "Accepted",
      color: "bg-[#FFA41F] text-white",
    },
    pending: {
      text: "Pending",
      color: "bg-[#E99375] text-white",
    },
    rejected: {
      text: "Rejected",
      color: "bg-gray-400 text-white",
    },
  };
  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-4">
      <div className="overflow-hidden border border-gray-200 shadow-sm rounded-xl">
        <table className="w-full border-collapse bg-white text-sm">
          <thead className="text-left text-xs text-gray-700 uppercase bg-gray-100">
            <tr className="bg-gray-50">
              <th className="px-4 py-4 text-left">#</th>
              <th className="px-4 py-4 text-left">Course</th>
              <th className="px-4 py-4 text-left">Co-Monitor</th>
              <th className="px-4 py-4 text-left">Date</th>
              <th className="px-4 py-4 text-center">Time</th>
              <th className="px-4 py-4 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {appointments!.map((appointment, index) => (
              <tr key={appointment.id} className="hover:bg-gray-50">
                <td className="px-4 py-4 font-medium text-gray-900">
                  {index + 1}
                </td>
                <td className="px-4 py-4 text-gray-700">
                  {appointment.courseTitle}
                </td>
                <td className="px-4 py-4 text-gray-700">
                  {appointment.coMonitor}
                </td>
                <td className="px-4 py-4 text-left text-gray-700">
                  {appointment.date?.toLocaleDateString("en-GB")}
                </td>
                <td className="px-4 py-4 text-gray-700">
                  {appointment.date!.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
                <td
                  className={`px-4 py-2 rounded-lg font-semibold ${
                    statusStyles[appointment.status.toLowerCase()]?.color ||
                    "bg-gray-200 text-black"
                  }`}
                >
                  {statusStyles[appointment.status.toLowerCase()]?.text ||
                    "Unknown"}
                </td>
                <td>
                  <div className="flex justify-evenly"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentAppointmentsTable;
