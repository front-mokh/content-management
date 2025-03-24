"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ResourceCard from "./ResourceCard";
import { Button } from "@/components/ui/button";

interface CategoryCarouselProps {
  resources: any[];
}

export default function CategoryCarousel({ resources }: CategoryCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x"
      >
        {resources.map((resource) => (
          <div
            key={resource.id}
            className="min-w-[280px] max-w-[280px] snap-start"
          >
            <ResourceCard resource={resource} />
          </div>
        ))}
      </div>

      <Button
        variant="secondary"
        size="icon"
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full shadow-md bg-white"
        onClick={scrollLeft}
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>

      <Button
        variant="secondary"
        size="icon"
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rounded-full shadow-md bg-white"
        onClick={scrollRight}
      >
        <ChevronRight className="h-5 w-5" />
      </Button>
    </div>
  );
}
