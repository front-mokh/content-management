"use client";
import { useState, useEffect } from "react";
import { Eye, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";

import { toast } from "sonner";
import { incrementResourceUpvotes } from "@/lib/services";
import { FullResource } from "@/lib/types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function ResourceEngagement({
  resource,

  dictionary,
}: {
  resource: FullResource;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dictionary: any;
}) {
  const [metrics, setMetrics] = useState({
    views: Number(resource.views),
    upvotes: Number(resource.upvotes),
  });
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [isUpvoting, setIsUpvoting] = useState(false);
  const [cooldown, setCooldown] = useState(false);

  // Check if user has already upvoted this resource
  useEffect(() => {
    const checkUpvoteStatus = () => {
      // Store upvoted resources in localStorage
      const upvotedResources = JSON.parse(
        localStorage.getItem("upvotedResources") || "{}"
      );
      setHasUpvoted(!!upvotedResources[resource.id]);
    };

    checkUpvoteStatus();
  }, [resource.id]);

  const handleUpvote = async () => {
    if (hasUpvoted || cooldown) return;

    try {
      setIsUpvoting(true);

      const result = await incrementResourceUpvotes(resource.id);

      setMetrics((prev) => ({
        ...prev,
        upvotes: Number(result.upvotes) || prev.upvotes + 1,
      }));

      // Mark as upvoted in localStorage to prevent multiple votes
      const upvotedResources = JSON.parse(
        localStorage.getItem("upvotedResources") || "{}"
      );
      upvotedResources[resource.id] = Date.now();
      localStorage.setItem(
        "upvotedResources",
        JSON.stringify(upvotedResources)
      );

      // Set upvoted state
      setHasUpvoted(true);

      // Show success toast
      toast.success("Thank you!", {
        duration: 3000,
      });

      // Set cooldown to prevent spam clicks
      setCooldown(true);
      setTimeout(() => setCooldown(false), 5000); // 5-second cooldown
    } catch {
      toast.error("Error", {
        duration: 3000,
      });
    } finally {
      setIsUpvoting(false);
    }
  };

  return (
    <Card className="h-fit">
      <CardHeader>
        <h3 className="text-lg font-semibold text-website-secondary">
          Engagement
        </h3>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {/* Views metric */}
          <div className="bg-website-secondary/5 rounded-lg p-3 flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-website-secondary/15 flex items-center justify-center mb-2">
              <Eye className="h-6 w-6 text-website-secondary" />
            </div>
            <span className="text-2xl font-bold text-website-text/80">
              {metrics.views.toLocaleString()}
            </span>
            <span className="text-sm text-website-text">
              {dictionary.views}
            </span>
          </div>

          {/* Upvotes metric */}
          <div className="bg-website-primary/5 rounded-lg p-3 flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-website-primary/15 flex items-center justify-center mb-2">
              <ThumbsUp className="h-6 w-6 text-website-primary" />
            </div>
            <span className="text-2xl font-bold text-website-text/80">
              {metrics.upvotes.toLocaleString()}
            </span>
            <span className="text-sm text-website-text">
              {dictionary.upvotes}
            </span>
          </div>
        </div>

        <Button
          className={`mt-2 w-full ${
            hasUpvoted
              ? "bg-website-primary/90 "
              : "bg-website-primary hover:bg-website-primary/90"
          }`}
          onClick={handleUpvote}
          disabled={hasUpvoted || isUpvoting || cooldown}
        >
          <ThumbsUp className={`h-5 w-5 mr-2`} />
          {hasUpvoted ? dictionary.upvoted : dictionary.upvote}
        </Button>
      </CardContent>
    </Card>
  );
}
