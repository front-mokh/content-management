import { Badge } from "@/components/ui/badge";
import { Type } from "@prisma/client";
import { useMemo } from "react";

export default function TypeChips({
  types,
  selectedTypes,
  onTypeToggle,
  dictionary,
}: {
  types: Type[];
  categoryId: string;
  selectedTypes: string[];
  onTypeToggle: (typeId: string) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dictionary: any;
}) {
  useMemo(() => {
    const typesToDeselect = selectedTypes.filter(
      (typeId) => !types.some((type) => type.id === typeId)
    );

    typesToDeselect.forEach((typeId) => {
      onTypeToggle(typeId);
    });
  }, [types, selectedTypes, onTypeToggle]);

  if (types.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <span className="text-website-text/80 mt-1">
        {dictionary.mediaLibrary.filterByType}
      </span>
      {types.map((type) => {
        const isSelected = selectedTypes.includes(type.id);
        return (
          <Badge
            key={type.id}
            variant={isSelected ? "default" : "outline"}
            className={`text-[15px] border-0 cursor-pointer transition-all px-3 py-[5px] rounded-md flex items-center gap-1 ${
              isSelected
                ? "bg-website-accent/50 text-website-text"
                : "bg-website-secondary/15 text-website-text hover:bg-website-accent/30"
            }`}
            onClick={() => onTypeToggle(type.id)}
          >
            {type.label}
            {/* {isSelected && <X className="h-3 w-3 ml-1" />} */}
          </Badge>
        );
      })}
    </div>
  );
}
