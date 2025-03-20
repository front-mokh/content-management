"use client";
import { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

interface PageProps {
  backButtonHref?: string;
  title?: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
}

export default function Page({
  backButtonHref,
  title,
  description,
  actions,
  children,
}: PageProps) {
  const router = useRouter();
  const handleBack = () => {
    if (backButtonHref) {
      router.push(backButtonHref);
    } else {
      router.back();
    }
  };

  return (
    <div className="space-y-6">
      <Card className="h-full">
        {(title || description || actions || backButtonHref !== undefined) && (
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center gap-3">
              {(backButtonHref !== undefined || backButtonHref === "") && (
                <Button
                  variant="outline"
                  size="icon"
                  className="shrink-0"
                  onClick={handleBack}
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              )}
              <div>
                {title && <h1 className="md:text-xl font-semibold">{title}</h1>}
                {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
              </div>
            </div>
            {actions}
          </CardHeader>
        )}
        <CardContent className="pt-6">
          {children}
        </CardContent>
      </Card>
    </div>
  );
}