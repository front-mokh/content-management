"use client";
import { Button } from "@/components/ui/button";
import { acceptSubmission } from "@/lib/services";
import { Submission } from "@prisma/client";
import { Check } from "lucide-react";
import React from "react";
import { showToast } from "@/utils/showToast";

export default function ApproveSubmissionAction({
  submission,
}: {
  submission: Submission;
}) {
 
  
  async function handleApprove() {
    try {
      await acceptSubmission(submission.id);
      showToast("success", "La soumission a été approuvée avec succès.");
     
    } catch  {
      showToast("error", "Une erreur est survenue lors de l'approbation de la soumission.");
    }
  }
  
  return (
    <Button size={"icon"} variant={"ghost"} onClick={handleApprove}>
      <Check className="text-green-500" />
    </Button>
  );
}