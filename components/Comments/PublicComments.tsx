"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { fetchPublicCommentsByTaskId } from "@/services/co-mentor-func";
import { PublicComment } from "@/types";
import Loader from "../Shared/Loader";

interface Props {
  taskId: number;
}

const PublicComments = ({ taskId }: Props) => {
  const [publicComments, setPublicComments] = useState<PublicComment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        const comments = await fetchPublicCommentsByTaskId(taskId);
        setPublicComments(comments);
      } catch (err) {
        console.error("Error fetching public comments:", err);
        setError("Failed to load public comments.");
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [taskId]);

  if (loading) return <Loader />;

  if (error)
    return (
      <div className="bg-red-50 text-red-600 p-4 rounded-md my-4">{error}</div>
    );

  if (publicComments.length === 0)
    return (
      <div className="space-y-2 bg-white rounded-xl p-2 w-[97%] items-center m-auto border border-orange-100 mb-5">
        <h3 className="text-xl font-bold text-[#FFA41F] mb-6 border-r-4 border-[#FFA41F] pr-3">
          Public Comments ({publicComments.length})
        </h3>
        <div className="text-center py-8 text-gray-500">No comments yet</div>
      </div>
    );

  const getUserBadgeColor = (userType?: string) => {
    switch (userType) {
      case "Student":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Co-Mentor":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "Mentor":
        return "bg-orange-200 text-orange-800 border-orange-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="space-y-2 bg-white rounded-xl p-2 w-[97%] items-center m-auto border border-orange-100 mb-5">
      <h3 className="text-xl font-bold text-[#FFA41F] mb-6 border-r-4 border-[#FFA41F] pr-3">
        Public Comments ({publicComments.length})
      </h3>

      <div className="divide-y divide-orange-100">
        {publicComments.map((comment) => (
          <div
            key={comment.commentId}
            className="py-4 hover:bg-orange-50 transition-colors rounded-lg px-3"
          >
            <div className="flex justify-between items-start ">
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 rounded-full overflow-hidden  border-orange-300">
                  <Image
                    src={comment.userImage || "/images/default-user.png"}
                    alt={comment.userName || "User"}
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900">
                      {comment.userName || "Unknown User"}
                    </span>
                    {comment.userType && (
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full border ${getUserBadgeColor(
                          comment.userType
                        )}`}
                      >
                        {comment.userType}
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-gray-500">
                    {comment.userEmail}
                  </span>
                </div>
              </div>

              <span className="text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded-full whitespace-nowrap">
                {new Date(comment.createdAt).toLocaleString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>

            <div className="pr-12 mt-2">
              <p className="text-gray-800 whitespace-pre-line leading-relaxed">
                {comment.commentText}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PublicComments;
