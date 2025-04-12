// components/types/TypeFilters.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Category } from "@prisma/client";
import TwoColumns from "@/components/custom/TwoColumns";
import SearchInput from "@/components/custom/SearchInput";
import SelectFilter from "@/components/custom/SelectFilter";
import { TypeFilteringParams } from "@/hooks/use-type-filtering";

interface TypeFiltersProps {
  filters: TypeFilteringParams;
  setFilter: (key: keyof TypeFilteringParams, value: string | null) => void;
  categories: Category[];
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

export default function TypeFilters({
  filters,
  setFilter,
  categories,
  searchTerm,
  setSearchTerm,
}: TypeFiltersProps) {
  const handleCategoryChange = (value: string) => {
    setFilter("categoryId", value === "all" ? null : value);
  };

  return (
    <Card>
      <CardContent className="p-4">
        <TwoColumns>
          <SearchInput
            label="Recherche par nom ou description"
            placeholder="Rechercher par nom ou description"
            value={searchTerm}
            onChange={setSearchTerm}
          />
          <SelectFilter
            label="Catégorie"
            placeholder="Catégorie"
            value={filters.categoryId || "all"}
            onChange={handleCategoryChange}
            options={[
              { value: "all", label: "Toutes les catégories" },
              ...categories.map((category) => ({
                value: category.id,
                label: category.label,
              })),
            ]}
          />
        </TwoColumns>
      </CardContent>
    </Card>
  );
}