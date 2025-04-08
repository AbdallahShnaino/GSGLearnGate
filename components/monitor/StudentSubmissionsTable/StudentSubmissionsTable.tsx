"use client";
import { CheckCircle, Clock, Users, Funnel, BellRinging } from "phosphor-react";
import { useStudentSubmissions } from "@/hooks/useStudentSubmissions";
import { useSearch } from "@/hooks/useSearch";
import Loader from "@/components/Shared/Loader";
import StatusCard from "@/components/StatusTaskCards/StatusCard";
import SearchBar from "@/components/SearchBar/SearchBar";
import TempPagination from "@/components/Pagination/TempPagination";
import Image from "next/image";

interface IProps {
  taskId: number;
}

export default function StudentSubmissionsTable({ taskId }: IProps) {
  const { value: searchQuery, updateSearchParam } = useSearch("search");

  const {
    SelectedStatus,
    setSelectedStatus,
    submissions,
    evaluatedCount,
    pendingCount,
    notSubmittedCount,
    countSubmisson,
    currentPage,
    totalPages,
    handleNextPage,
    handlePreviousPage,
    onPageChange,
    loading,
  } = useStudentSubmissions(taskId, searchQuery);
  console.log(submissions, taskId);
  if (loading) {
    return (
      <div className="flex justify-center items-center w-full min-h-screen px-4">
        <Loader message="Loading data..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto flex-col gap-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatusCard
            title="Total Submissions"
            icon={<Users size={22} className="text-orange-600" />}
            iconColor="orange"
            subtitle="Active submissions"
            value={evaluatedCount + pendingCount}
            progress={
              countSubmisson > 0
                ? ((evaluatedCount + pendingCount) / countSubmisson) * 100
                : 0
            }
          />
          <StatusCard
            title="Graded"
            icon={
              <CheckCircle size={22} weight="fill" className="text-green-600" />
            }
            iconColor="green"
            subtitle="Graded submissions"
            value={evaluatedCount}
            progress={
              countSubmisson > 0 ? (evaluatedCount / countSubmisson) * 100 : 0
            }
          />
          <StatusCard
            title="Pending"
            icon={<Clock size={22} weight="fill" className="text-red-600" />}
            iconColor="red"
            subtitle="Awaiting review"
            value={pendingCount}
            progress={
              countSubmisson > 0 ? (pendingCount / countSubmisson) * 100 : 0
            }
          />
          <StatusCard
            title="Not Submitted"
            icon={
              <BellRinging size={22} weight="fill" className="text-gray-600" />
            }
            iconColor="gray"
            subtitle="Not Submitted"
            value={notSubmittedCount}
            progress={
              countSubmisson > 0
                ? (notSubmittedCount / countSubmisson) * 100
                : 0
            }
          />
        </div>
        <div className="bg-white p-4 mb-7 shadow-md rounded-lg">
          <div className="flex flex-col sm:flex-row gap-4">
            <SearchBar
              placeholderText="Search"
              updateSearchParam={updateSearchParam}
            />
            <div className="flex items-center gap-2 bg-orange-50 p-2 rounded-lg h-12">
              <Funnel size={20} className="text-[#FFA41F]" />
              <select
                className="w-[180px] border-orange-200 focus:ring-orange-200 "
                value={SelectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="All">All Submissions</option>
                <option value="GRADED">Graded</option>
                <option value="PENDING">Pending</option>
                <option value="NOT SUBMITTED">Not Submitted</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 shadow-md rounded-lg mb-8">
          <h2 className="text-lg font-semibold mb-4">Student Submissions</h2>
          <div className="container mx-auto p-6">
            <div className="overflow-x-auto max-w-full border border-gray-200 rounded-lg">
              <table className="w-full text-sm text-left text-gray-800 border border-gray-200 rounded-lg">
                <thead className="text-m text-gray-600 uppercase bg-[#FFA41F]/10">
                  <tr className="h-12">
                    <th className="px-4 py-3">Student</th>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Course</th>
                    <th className="px-4 py-3">Task</th>
                    <th className="px-4 py-3">Grade</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {submissions &&
                    submissions.map((submission) => (
                      <tr
                        key={submission.submissionId}
                        className="bg-white hover:bg-orange-50 transition duration-300 border-b border-gray-100 h-12"
                      >
                        <td className="flex items-center px-4 py-3">
                          <Image
                            className="rounded-full border border-gray-300"
                            src={submission.profilePicture}
                            alt="User"
                            width={30}
                            height={30}
                          />
                          <div className="ml-3">
                            <div className="text-s font-semibold">
                              {submission.studentName}
                            </div>
                            <div className="text-gray-500 text-xs">
                              {submission.email}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          {submission.submissionDate}
                        </td>
                        <td className="px-4 py-3">{submission.courseName}</td>
                        <td className="px-4 py-3">{submission.taskName}</td>
                        <td className="px-4 py-3 font-semibold text-orange-600">
                          {submission.grade}
                        </td>
                        <td
                          className={`px-4 py-3 font-semibold ${
                            submission.status === "GRADED"
                              ? "text-green-600"
                              : submission.status === "PENDING"
                              ? "text-red-600"
                              : "text-gray-600"
                          }`}
                        >
                          {submission.status}
                        </td>
                        <td className="px-4 py-3">Action</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <div className="mt-9">
              <TempPagination
                currentPage={currentPage}
                handleNextPage={handleNextPage}
                handlePreviousPage={handlePreviousPage}
                onPageChange={onPageChange}
                totalPages={totalPages}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
