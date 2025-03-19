"use client";
import { Button } from "@/components/ui/button";
import { unPublishResource } from "@/lib/services";
import { FullResource } from "@/lib/types";
import { GlobeLock } from "lucide-react";
import React from "react";

export default function UnPublishResourceAction({
  resource,
}: {
  resource: FullResource;
}) {
  async function handleUnPublish() {
    await unPublishResource(resource.id);
  }
  return (
    <Button size={"icon"} variant={"ghost"} onClick={handleUnPublish}>
      <GlobeLock />
    </Button>
  );
}
