"use client";
import { Button } from "@/components/ui/button";
import { rejectSubmission } from "@/lib/services";
import { Submission } from "@prisma/client";
import { X } from "lucide-react";
import React from "react";
import { showToast } from "@/utils/showToast";

export default function RejectSubmissionAction({
  submission,
}: {
  submission: Submission;
}) {

  
  async function handleReject() {
    try {
      await rejectSubmission(submission.id);
      showToast("success", "La soumission a été rejetée avec succès.");
   
    } catch  {
    showToast("error", "Une erreur est survenue lors du rejet de la soumission.");
    
    }
  }
  
  return (
    <Button size={"icon"} variant={"ghost"} onClick={handleReject}>
      <X className="text-red-500" />
    </Button>
  );
}