import SubmissionForm from "@/components/submission/SubmissionForm";
import React from "react";
import { getDictionary } from "@/lib/i18n";
export default async function NewSubmissionPage({ params }: { params: { locale: string } }) {
  const dictionary = await getDictionary(params.locale);
  return (
    <div className="container py-8">
      <SubmissionForm dictionary={dictionary} />
    </div>
  );
}