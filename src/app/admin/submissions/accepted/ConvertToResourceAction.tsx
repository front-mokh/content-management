"use client";
import { Button } from "@/components/ui/button";
import { Submission } from "@prisma/client";
import { FileStack } from "lucide-react";
import React, { useState } from "react";
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
  const [open, setOpen] = useState(false);

  
  return (
    <>
      <Button size={"icon"} variant={"ghost"} onClick={() => setOpen(true)}>
        <FileStack className="text-blue-500" />
      </Button>
      
      <ConvertToResourceDialog 
        open={open} 
        onOpenChange={setOpen} 
        submission={submission}
        categories={categories}
        types={types}
        authors={authors}
      />
    </>
  );
}