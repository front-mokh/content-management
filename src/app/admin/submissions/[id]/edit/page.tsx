// app/admin/submissions/[id]/edit/page.tsx
import { getSubmissionById } from "@/lib/services";
import { notFound } from "next/navigation";
import EditSubmissionForm from "@/components/custom/EditSubmissionForm";

export default async function EditSubmissionPage({
  params,
}: {
  params: { id: string };
}) {
  const submission = await getSubmissionById(params.id);

  if (!submission) {
    notFound();
  }

  return (
    <div className="container py-8 max-w-4xl mx-auto">
      <EditSubmissionForm submission={submission} />
    </div>
  );
}