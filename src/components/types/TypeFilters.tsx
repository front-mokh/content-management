// components/types/TypeFilters.tsx
import { Card, CardContent } from "@/components/ui/card";
import TwoColumns from "@/components/custom/TwoColumns";
import SearchInput from "@/components/custom/SearchInput";

interface TypeFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

export default function TypeFilters({
  searchTerm,
  setSearchTerm,
}: TypeFiltersProps) {
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
        </TwoColumns>
      </CardContent>
    </Card>
  );
}
