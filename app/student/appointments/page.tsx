// "use client";

import StudentAppointmentsTable from "@/components/StudentAppointmentsTable/StudentAppointmentsTable";
import { getStudentAppointments } from "@/src/db/queries/select";
import { Role } from "@/types";
// import { CalendarCheck, CalendarX, Hourglass } from "@phosphor-icons/react";

// const interviews = [
//   {
//     id: 1,
//     course: "ReactJS Basics",
//     teacher: "Mr. Mohammed",
//     status: "accepted",
//   },
//   { id: 2, course: "UI/UX Design", teacher: "Mr. Ahmed", status: "pending" },
//   { id: 3, course: "Node.js", teacher: "Mr. Khaled", status: "rejected" },
//   {
//     id: 4,
//     course: "Database Systems",
//     teacher: "Ms. Sarah",
//     status: "accepted",
//   },
//   { id: 5, course: "Cybersecurity", teacher: "Dr. Ali", status: "pending" },
// ];

// const statusStyles = {
//   accepted: {
//     text: "Accepted",
//     icon: <CalendarCheck size={24} />,
//     color: "bg-[#FFA41F] text-white",
//   },
//   pending: {
//     text: "Pending",
//     icon: <Hourglass size={24} />,
//     color: "bg-[#E99375] text-white",
//   },
//   rejected: {
//     text: "Rejected",
//     icon: <CalendarX size={24} />,
//     color: "bg-gray-400 text-white",
//   },
// };

const InterviewsPage = async () => {
  const appointments = await getStudentAppointments(1);
  console.log(appointments);

  return (
    <div className="min-h-screen bg-[#FFF5E8] p-6">
      {/* <h1 className="text-3xl font-bold text-[#FFA41F] mb-6 text-center">
        Course Interviews
      </h1>

      <div className="max-w-4xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {interviews.map(({ id, course, teacher, status }) => (
          <div
            key={id}
            className="bg-white p-4 rounded-xl shadow-md flex flex-col gap-3 border-l-4 transition-all duration-300 hover:scale-105 hover:shadow-lg"
            style={{
              borderColor: statusStyles[status].color
                .split(" ")[0]
                .replace("bg-", "#"),
            }}
          >
            <div className="flex items-center gap-2">
              {statusStyles[status].icon}
              <h2 className="text-lg font-semibold">{course}</h2>
            </div>
            <p className="text-gray-600">With {teacher}</p>
            <div
              className={`px-3 py-1 w-fit rounded-lg ${statusStyles[status].color}`}
            >
              {statusStyles[status].text}
            </div>
          </div>
        ))}
      </div> */}
      <StudentAppointmentsTable role={Role.MONITOR} />
    </div>
  );
};

export default InterviewsPage;
