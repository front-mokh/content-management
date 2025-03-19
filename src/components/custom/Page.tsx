"use client";
import { ReactNode } from "react";

import { ArrowLeft } from "lucide-react";

import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export default function Page({
  backButtonHref,
  title,
  actions,
  children,
}: {
  backButtonHref?: string;
  title?: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  const router = useRouter();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          {backButtonHref && (
            <Button
              variant="outline"
              size="icon"
              className="mr-4 shrink-0"
              onClick={() => router.push(backButtonHref)}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          )}
          {title && <h1 className="md:text-xl font-semibold">{title}</h1>}
        </div>
        {actions}
      </div>
      {children}
    </div>
  );
}
