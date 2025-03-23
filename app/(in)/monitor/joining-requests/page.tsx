import PersonCard from "@/components/PersonCard/PersonCard";
import StudentRequestsTable from "@/components/StudentRequestsTable/StudentRequestsTable";

export default function joiningRequestsPage() {
  return (
    <div>
      <h2 className="mx-8 my-11 font-bold ">Students Joining Requests</h2>
      <StudentRequestsTable />
    </div>
  );
}
