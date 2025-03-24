import { FullResource } from "@/lib/types";
import ResourceCard from "./ResourceCard";

interface ResourceGridProps {
  resources: FullResource[];
  columns?: 2 | 3 | 4;
}

export default function ResourceGrid({
  resources,
  columns = 3,
}: ResourceGridProps) {
  const gridCols = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  };

  return (
    <div className={`grid ${gridCols[columns]} gap-6`}>
      {resources.map((resource) => (
        <ResourceCard key={resource.id} resource={resource} />
      ))}
    </div>
  );
}
