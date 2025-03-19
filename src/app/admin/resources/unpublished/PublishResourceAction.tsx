"use client";
import { Button } from "@/components/ui/button";
import { publishResource } from "@/lib/services";
import { FullResource } from "@/lib/types";
import { RadioTower } from "lucide-react";
import React from "react";

export default function PublishResourceAction({
  resource,
}: {
  resource: FullResource;
}) {
  async function handlePublish() {
    await publishResource(resource.id);
  }
  return (
    <Button size={"icon"} variant={"ghost"} onClick={handlePublish}>
      <RadioTower />
    </Button>
  );
}
