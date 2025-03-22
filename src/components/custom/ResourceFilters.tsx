import { Card, CardContent } from "@/components/ui/card";
import { Author, Category, Type, User } from "@prisma/client";
import TwoColumns from "./TwoColumns";
import SearchInput from "./SearchInput";
import SelectFilter from "./SelectFilter";
import { ResourceFilteringParams } from "@/hooks/use-resource-filtering";

interface ResourceFiltersProps {
  filters: ResourceFilteringParams;
  setFilter: (key: keyof ResourceFilteringParams, value: string | null) => void;
  categories: Category[];
  types: Type[];
  authors: Author[];
  handlers: User[];
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

export default function ResourceFilters({
  filters,
  setFilter,
  categories,
  types,
  authors,
  handlers,
  searchTerm,
  setSearchTerm,
}: ResourceFiltersProps) {
  const handleCategoryChange = (value: string) => {
    setFilter("categoryId", value === "all" ? null : value);
  };

  const handleTypeChange = (value: string) => {
    setFilter("typeId", value === "all" ? null : value);
  };

  const handleAuthorChange = (value: string) => {
    setFilter("authorId", value === "all" ? null : value);
  };

  const handleHandlerChange = (value: string) => {
    setFilter("handlerId", value === "all" ? null : value);
  };

  return (
    <Card>
      <CardContent className="p-4">
        <TwoColumns>
          <SearchInput
            label="Recherche par titre ou par description"
            placeholder="Rechercher par titre ou par description"
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
          <SelectFilter
            label="Type"
            placeholder="Type"
            value={filters.typeId || "all"}
            onChange={handleTypeChange}
            options={[
              { value: "all", label: "Tous les types" },
              ...types.map((type) => ({
                value: type.id,
                label: type.label,
              })),
            ]}
          />
          <SelectFilter
            label="Auteur"
            placeholder="Auteur"
            value={filters.authorId || "all"}
            onChange={handleAuthorChange}
            options={[
              { value: "all", label: "Tous les auteurs" },
              ...authors.map((author) => ({
                value: author.id,
                label: `${author.firstName} ${author.lastName}`,
              })),
            ]}
          />
          <SelectFilter
            label="Gestionnaire"
            placeholder="Gestionnaire"
            value={filters.handlerId || "all"}
            onChange={handleHandlerChange}
            options={[
              { value: "all", label: "Tous les gestionnaires" },
              ...handlers.map((handler) => ({
                value: handler.id,
                label: `${handler.lastName.toUpperCase()} ${handler.firstName}`,
              })),
            ]}
          />
        </TwoColumns>
      </CardContent>
    </Card>
  );
}
