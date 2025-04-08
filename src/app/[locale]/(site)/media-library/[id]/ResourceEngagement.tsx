"use client";
import { useState, useEffect } from "react";
import { Eye, ThumbsUp, ThumbsDown } from "lucide-react";
import { Button } from "@/components/ui/button";

import { toast } from "sonner";
import { incrementResourceUpvotes, incrementResourceDislikes } from "@/lib/services";
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
    dislikes: Number(resource.dislikes || 0), // Add dislikes with default value
  });
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [hasDisliked, setHasDisliked] = useState(false);
  const [isUpvoting, setIsUpvoting] = useState(false);
  const [isDisliking, setIsDisliking] = useState(false);
  const [cooldown, setCooldown] = useState(false);

  // Check if user has already upvoted or disliked this resource
  useEffect(() => {
    const checkEngagementStatus = () => {
      // Store engagement in localStorage
      const engagedResources = JSON.parse(
        localStorage.getItem("engagedResources") || "{}"
      );
      
      if (engagedResources[resource.id]) {
        setHasUpvoted(engagedResources[resource.id].action === "upvote");
        setHasDisliked(engagedResources[resource.id].action === "dislike");
      }
    };

    checkEngagementStatus();
  }, [resource.id]);

  const handleUpvote = async () => {
    if (hasUpvoted || hasDisliked || cooldown) return;

    try {
      setIsUpvoting(true);

      const result = await incrementResourceUpvotes(resource.id);

      setMetrics((prev) => ({
        ...prev,
        upvotes: Number(result.upvotes) || prev.upvotes + 1,
      }));

      // Mark as upvoted in localStorage
      const engagedResources = JSON.parse(
        localStorage.getItem("engagedResources") || "{}"
      );
      engagedResources[resource.id] = {
        action: "upvote",
        timestamp: Date.now()
      };
      localStorage.setItem(
        "engagedResources",
        JSON.stringify(engagedResources)
      );

      // Set upvoted state
      setHasUpvoted(true);

      // Show success toast
      toast.success(dictionary.mediaLibrary.details.thankYou, {
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

  const handleDislike = async () => {
    if (hasUpvoted || hasDisliked || cooldown) return;

    try {
      setIsDisliking(true);

      const result = await incrementResourceDislikes(resource.id);

      setMetrics((prev) => ({
        ...prev,
        dislikes: Number(result.dislikes) || prev.dislikes + 1,
      }));

      // Mark as disliked in localStorage
      const engagedResources = JSON.parse(
        localStorage.getItem("engagedResources") || "{}"
      );
      engagedResources[resource.id] = {
        action: "dislike",
        timestamp: Date.now()
      };
      localStorage.setItem(
        "engagedResources",
        JSON.stringify(engagedResources)
      );

      // Set disliked state
      setHasDisliked(true);

      // Show feedback toast
      toast.success(dictionary.mediaLibrary.details.thankYou || "Feedback received", {
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
      setIsDisliking(false);
    }
  };

  return (
    <Card className="h-fit">
      <CardHeader>
        <h3 className="text-lg font-semibold text-website-secondary">
          {dictionary.mediaLibrary.details.engagement}
        </h3>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          {/* Views metric */}
          <div className="bg-website-secondary/5 rounded-lg p-3 flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-website-secondary/15 flex items-center justify-center mb-2">
              <Eye className="h-6 w-6 text-website-secondary" />
            </div>
            <span className="text-2xl font-bold text-website-text/80">
              {metrics.views.toLocaleString()}
            </span>
            <span className="text-sm text-website-text">
              {dictionary.mediaLibrary.details.views}
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
              {dictionary.mediaLibrary.details.upvotes}
            </span>
          </div>

          {/* Dislikes metric */}
          <div className="bg-red-500/5 rounded-lg p-3 flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-red-500/15 flex items-center justify-center mb-2">
              <ThumbsDown className="h-6 w-6 text-red-500" />
            </div>
            <span className="text-2xl font-bold text-website-text/80">
              {metrics.dislikes.toLocaleString()}
            </span>
            <span className="text-sm text-website-text">
              {dictionary.mediaLibrary.details.dislikes || "Dislikes"}
            </span>
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <Button
            className={`flex-1 ${
              hasUpvoted
                ? "bg-website-primary/90 "
                : "bg-website-primary hover:bg-website-primary/90"
            }`}
            onClick={handleUpvote}
            disabled={hasUpvoted || hasDisliked || isUpvoting || isDisliking || cooldown}
          >
            <ThumbsUp className={`h-5 w-5 mr-2`} />
            {hasUpvoted
              ? dictionary.mediaLibrary.details.upvoted
              : dictionary.mediaLibrary.details.upvote}
          </Button>
          
          <Button
            variant="outline"
            className={`flex-1 ${
              hasDisliked
                ? "border-red-500 bg-red-500/10 text-red-500"
                : "border-gray-300 hover:border-red-500 hover:bg-red-500/10 hover:text-red-500"
            }`}
            onClick={handleDislike}
            disabled={hasUpvoted || hasDisliked || isUpvoting || isDisliking || cooldown}
          >
            <ThumbsDown className={`h-5 w-5 mr-2`} />
            {hasDisliked
              ? dictionary.mediaLibrary.details.disliked || "Disliked"
              : dictionary.mediaLibrary.details.dislike || "Dislike"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
