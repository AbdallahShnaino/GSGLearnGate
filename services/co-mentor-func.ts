"use server";

import { getPrivateCommentsBySubmission, getPrivateCommentsReplyBySubmission, getSubmissionById, getSubmissionsAndNonSubmissionsForTask } from "@/src/db/queries/select";
import { updateMeetingRequest } from "@/src/db/queries/update";
import { Status } from "@/types";
import { db } from "@/src/db";
import {  submissionsTable, tasksTable } from "@/src/db/schema";
import { eq } from "drizzle-orm";

export async function updateMeetingRequestStatus(id: number, status: Status) {
  return await updateMeetingRequest(id, { status });
}

export async function fetchSubmissions(
  taskId: number,
  page: number = 1,
  pageSize: number = 10
) {
  try {
    const taskData = await db
      .select({
        courseId: tasksTable.courseId,
      })
      .from(tasksTable)
      .where(eq(tasksTable.id, taskId))
      .all();

    if (!taskData || taskData.length === 0) {
      throw new Error("Failed to fetch courseId for the given taskId.");
    }

    const courseId = taskData[0].courseId;

    const data = await getSubmissionsAndNonSubmissionsForTask(
      taskId,
      courseId,
      page,
      pageSize
    );

    if (!data) {
      throw new Error("Failed to fetch submissions.");
    }

    return {
      submissions: data.submissions,
      totalPages: Math.ceil(data.totalCount / pageSize),
      currentPage: page,
      totalCount: data.totalCount,
    };
  } catch (error) {
    console.error("Error fetching submissions:", error);
    throw error;
  }
}
export async function fetchSubmissionById(submissionId: number) {
  try {
    const data = await getSubmissionById(submissionId);
    if (!data) {
      throw new Error("Submission not found.");
    }
    return data;
  } catch (error) {
    console.error("Error fetching submission:", error);
    throw error;
  }
}

export async function fetchCommentsBySubmissionId(submissionId: number, ComentorId: number) {
  try {
    
    const studentComments = await getPrivateCommentsBySubmission(submissionId);

 
    const coMentorReplies = await getPrivateCommentsReplyBySubmission(submissionId, ComentorId); 

    
    const allComments = [...studentComments, ...coMentorReplies];

   
    allComments.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

    if (!allComments || allComments.length === 0) {
      throw new Error("No comments found for the given submission.");
    }

    return allComments;
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw new Error("Failed to fetch comments.");
  }
}
export async function saveSubmissionData({
  submissionId,
  grade,
  feedback,
}: {
  submissionId: number;
  grade: number;
  feedback: string;
}) {
  try {
  
    if (!submissionId || grade === undefined || !feedback) {
      throw new Error("Missing required fields: submissionId, grade, or feedback.");
    }

  
    await db
      .update(submissionsTable)
      .set({
        grade,
        feedback,
        gradedAt: new Date(),
        status: "GRADED",
      })
      .where(eq(submissionsTable.id, submissionId));

   
    

    return { success: true, message: "Submission data saved successfully." };
  } catch (error) {
    console.error("Error saving submission data:", error);
    return { success: false, message: "Failed to save submission data.", error: error.message };
  }
}