import { fetchCommentsBySubmissionId } from "@/services/co-mentor-func";
import { PrivateComment } from "@/types";
import { useState, useEffect } from "react";

export function usePrivateComments(submissionId: number,ComentorId:number) {
  const [privateComments, setPrivateComments] = useState<PrivateComment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchComments() {
      try {
        setLoading(true);
        setError(null);
        const comments = await fetchCommentsBySubmissionId(submissionId,ComentorId);
        setPrivateComments(comments);
      } catch (err) {
        console.error("Error fetching private comments:", err);
        setError("Failed to fetch private comments.");
      } finally {
        setLoading(false);
      }
    }

    if (submissionId) {
      fetchComments();
    }
  }, [submissionId]);

  return { privateComments, loading, error, setPrivateComments,};
}