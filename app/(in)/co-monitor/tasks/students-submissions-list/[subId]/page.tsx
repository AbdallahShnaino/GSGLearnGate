import SubmissonCom from "@/components/SubmissionCom/SubmissonCom";
import { STATIC_COMONITOR_ID } from "@/context/keys";

import React from "react";
interface Props {
  params: Promise<{ subId: number }>;
}
export default async function page({ params }: Props) {
  const { subId } = await params;
  return (
    <div>
      <SubmissonCom id={subId} CoMentorId={STATIC_COMONITOR_ID} />
    </div>
  );
}
