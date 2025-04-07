import React from "react";

// بيانات ثابتة للإعلانات
const announcements = [
  {
    id: 1,
    title: "New Course Available: Advanced React",
    date: "April 7, 2025",
    description:
      "We are excited to announce the launch of our new advanced React course. Enroll now and enhance your React skills!",
  },
  {
    id: 2,
    title: "System Maintenance: April 10th",
    date: "April 6, 2025",
    description:
      "Our platform will undergo maintenance on April 10th, 2025. Please plan accordingly and expect brief downtimes.",
  },
  {
    id: 3,
    title: "New Features Coming Soon",
    date: "April 5, 2025",
    description:
      "We are working hard to bring new features to the platform! Stay tuned for updates on improved course tracking and progress visualization.",
  },
];

const Announcements = async () => {
  return (
    <div className="px-6 py-3 w-full min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 my-4">
        All Announcements
      </h1>

      <div className="flex flex-col gap-6">
        {announcements.map((announcement) => (
          <div
            key={announcement.id}
            className="bg-white shadow-lg rounded-xl border border-gray-200 p-6 w-full"
          >
            <div className="flex justify-between items-start">
              <h3 className="text-2xl font-semibold text-[#FFA41F]">
                {announcement.title}
              </h3>
              <p className="text-[#E99375] my-2">{announcement.date}</p>
            </div>
            <p className="text-gray-700">{announcement.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcements;
