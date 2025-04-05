import SubmissonCom from "@/components/SubmissionCom/SubmissonCom";
import React from "react";
interface Props {
  params: Promise<{ id: string }>;
}
export default async function page({ params }: Props) {
  const { id } = await params;
  return (
    <div>
      <SubmissonCom id={id} />
    </div>
  );
}
