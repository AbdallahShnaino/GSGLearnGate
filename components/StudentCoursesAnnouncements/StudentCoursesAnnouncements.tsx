import { newAnnouncements } from "@/types";

interface IProps {
  announcements: newAnnouncements[] | null;
}
const StudentCoursesAnnouncements = (props: IProps) => {
  return (
    <div className="flex flex-col gap-6">
      {props.announcements && props.announcements?.length >= 1 ? (
        props.announcements?.map((announcement) => (
          <div
            className="bg-white shadow-lg rounded-xl border border-gray-200 p-6 w-full"
            key={announcement.id}
          >
            <div className="flex justify-between items-start">
              <h3 className="text-2xl font-semibold text-[#FFA41F]">
                {announcement.courseTitle}
              </h3>
              <h3 className="text-xl font-semibold text-[#E99375]">
                {announcement.title}
              </h3>
              <p className="text-[#E99375] my-2">
                {new Date(announcement.createdAt!).toLocaleDateString("en-GB", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
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
        <div>There is no announcement to show</div>
      )}
    </div>
  );
};
export default StudentCoursesAnnouncements;
