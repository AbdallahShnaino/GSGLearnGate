import SubmissonCom from "@/components/SubmissionCom/SubmissonCom";
import React from "react";
interface Props {
  params: Promise<{ Id: number }>;
}
export default async function page({ params }: Props) {
  const { Id } = await params;
  return (
    <div>
      <SubmissonCom id={Id} CoMentorId={5} />
    </div>
  );
}
