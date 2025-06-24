// components/ui/CategoryTag.tsx

import { getCategoryDisplay, AuthorCategory } from "@/utils/authorUtils";

interface CategoryTagProps {
  category: AuthorCategory;
}

export const CategoryTag = ({ category }: CategoryTagProps) => {
  const display = getCategoryDisplay(category);
  
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${display.color} ${display.bgColor}`}>
      {display.icon && <span>{display.icon}</span>}
      {display.label}
    </span>
  );
};

export default CategoryTag;