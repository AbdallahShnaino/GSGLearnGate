"use client";

import { Users, Funnel } from "phosphor-react";
import { useStudentSubmissions } from "@/hooks/useStudentSubmissions";
import { useSearch } from "@/hooks/useSearch";
import Loader from "@/components/Shared/Loader";
import StatusCard from "@/components/StatusTaskCards/StatusCard";
import SearchBar from "@/components/SearchBar/SearchBar";
import TempPagination from "@/components/Pagination/TempPagination";

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

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full min-h-screen px-4">
        <Loader message="Loading data..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full px-4 flex justify-center">
      <div className="w-full max-w-[1200px] flex flex-col gap-6">
        {/* Status Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
          {/* You can add more cards here if needed */}
        </div>

        {/* Search & Filter */}
        <div className="bg-white p-4 shadow-md rounded-lg">
          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <div className="flex-grow">
              <SearchBar
                placeholderText="Search"
                updateSearchParam={updateSearchParam}
              />
            </div>
            <div className="flex-shrink-0">
              <div className="flex items-center gap-2 bg-orange-50 p-2 rounded-lg h-12">
                <Funnel size={20} className="text-[#FFA41F]" />
                <select
                  className="w-[180px] border-orange-200 focus:ring-orange-200"
                  value={SelectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option value="All">All Submissions</option>
                  <option value="GRADED">Graded</option>
                  <option value="SUBMITTED">SUBMITTED</option>
                  <option value="NOT SUBMITTED">Not Submitted</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white p-4 shadow-md rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Student Submissions</h2>
          <div className="w-full overflow-x-auto">
            <div className="min-w-[800px]">
              <table className="w-full text-sm text-left text-gray-800 border border-gray-200 rounded-lg">
                <thead>{/* Your table headers here */}</thead>
                <tbody>
                  {submissions.map((submission) => (
                    <tr
                      key={submission.submissionId}
                      className="bg-white hover:bg-orange-50 transition duration-300 border-b border-gray-100 h-14"
                    >
                      {/* Your table cells here */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <div className="mt-6">
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
  );
}
