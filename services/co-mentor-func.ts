"use server";

import { getCoMonitorUserDetails, getPrivateCommentsBySubmission, getPrivateCommentsReplyBySubmission, getPublicCommentsByTaskId, getSubmissionById, getSubmissionsAndNonSubmissionsForTask, getTotalCoursesByCoMonitor, getTotalStudentsByCoMonitor, getTotalTasksByCoMonitor } from "@/src/db/queries/select";
import { Status, User } from "@/types";
import { db } from "@/src/db";
import {  submissionsTable, tasksTable } from "@/src/db/schema";
import { eq } from "drizzle-orm";



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
      return [];
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
      return []; 
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
export async function fetchPublicCommentsByTaskId(taskId: number) {
  try {
    const publicComments = await getPublicCommentsByTaskId(taskId);

    if (!publicComments || publicComments.length === 0) {
      console.warn("No public comments found for the given task.");
      return [];
    }

    return publicComments;
  } catch (error) {
    console.error("Error fetching public comments:", error);
    throw new Error("Failed to fetch public comments.");
  }
}
export async function fetchTotalStudentsByCoMonitor(coMonitorId: number): Promise<number> {
  try {
    const totalStudents = await getTotalStudentsByCoMonitor(coMonitorId);
    return totalStudents;
  } catch (error) {
    console.error("Error fetching total students:", error);
    throw new Error("Failed to fetch total students.");
  }
}


export async function fetchTotalCoursesByCoMonitor(coMonitorId: number): Promise<number> {
  try {
    const totalCourses = await getTotalCoursesByCoMonitor(coMonitorId);
    return totalCourses;
  } catch (error) {
    console.error("Error fetching total courses:", error);
    throw new Error("Failed to fetch total courses.");
  }
}


export async function fetchTotalTasksByCoMonitor(coMonitorId: number): Promise<number> {
  try {
    const totalTasks = await getTotalTasksByCoMonitor(coMonitorId);
    return totalTasks;
  } catch (error) {
    console.error("Error fetching total tasks:", error);
    throw new Error("Failed to fetch total tasks.");
  }
}


export async function fetchCoMonitorUserDetails(coMonitorId: number): Promise<User | null> {
  try {
    const userDetails = await getCoMonitorUserDetails(coMonitorId);
    return userDetails;
  } catch (error) {
    console.error("Error fetching Co-Mentor user details:", error);
    throw new Error("Failed to fetch Co-Mentor user details.");
  }
}