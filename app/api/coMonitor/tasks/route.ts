import { NextResponse } from "next/server";
import { getTasksWithSubmissionsByCoMonitors } from "@/services/task";
import { STATIC_COMONITOR_ID } from "@/context/keys";
import { TaskStatus } from "@/types";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  try {
    const status = (searchParams.get("status") as TaskStatus) || TaskStatus.ALL;
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 2;
    const data = await getTasksWithSubmissionsByCoMonitors(
      STATIC_COMONITOR_ID,
      status,
      page,
      limit
    );
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch tasks" },
      { status: 500 }
    );
  }
}
