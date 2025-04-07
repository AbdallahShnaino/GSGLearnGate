import { getStudentAnnouncementsById } from "@/src/db/queries/select";

interface IProps {
  params: Promise<{ studentId: string }>;
}
const Announcements = async (props: IProps) => {
  const { studentId } = await props.params;
  const announcements = await getStudentAnnouncementsById(Number(studentId));

  return (
    <div className="px-6 py-3 w-full min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 my-4">
        All Announcements
      </h1>

      <div className="flex flex-col gap-6">
        {announcements ? (
          announcements.map((announcement) => (
            <div
              key={announcement.id}
              className="bg-white shadow-lg rounded-xl border border-gray-200 p-6 w-full"
            >
              <div className="flex justify-between items-start">
                <h3 className="text-2xl font-semibold text-[#FFA41F]">
                  {announcement.courseTitle}
                </h3>
                <h3 className="text-xl font-semibold text-[#E99375]">
                  {announcement.title}
                </h3>
                <p className="text-[#E99375] my-2">
                  {new Date(announcement.createdAt!).toLocaleDateString(
                    "en-GB",
                    {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  )}
                </p>
              </div>
              <div className="flex justify-between items-end">
                <p className="text-gray-700">{announcement.description}</p>
                <p className="text-gray-700">
                  Posted By: {announcement.postedBy}
                </p>
              </div>
            </div>
          ))
        ) : (
          <h2>There is no announcements to show</h2>
        )}
      </div>
    </div>
  );
};

export default Announcements;
