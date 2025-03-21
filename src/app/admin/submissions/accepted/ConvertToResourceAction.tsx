"use client";
import { Button } from "@/components/ui/button";
import { Submission } from "@prisma/client";
import { FileStack } from "lucide-react";
import React from "react";
import ConvertToResourceDialog from "./ConvertToResourceDialog";

export default function ConvertToResourceAction({
  submission,
  categories,
  types,
  authors,
}: {
  submission: Submission;
  categories: { id: string; label: string }[];
  types: { id: string; label: string; categoryId: string }[];
  authors: { id: string; firstName: string; lastName: string }[];
}) {
  // The trigger button for the CustomDialog
  const trigger = (
    <Button size="icon" variant="ghost">
      <FileStack className="text-blue-500" />
    </Button>
  );
  
  return (
    <ConvertToResourceDialog
      trigger={trigger}
      submission={submission}
      categories={categories}
      types={types}
      authors={authors}
    />
  );
}