import SubmissionDetailsPage from "@/components/custom/SubmissionDetailsPage";
import { getSubmissionById } from "@/lib/services";
import { notFound } from "next/navigation";
import React from "react";

export default async function SubmissionDetails({ params }: { params: { id: string } }) {
  const submissionId = params.id;
  const submission = await getSubmissionById(submissionId);

  if (!submission) {
    notFound();
  }

  return (
    <div>
      <SubmissionDetailsPage submission={submission} />
    </div>
  );
}
