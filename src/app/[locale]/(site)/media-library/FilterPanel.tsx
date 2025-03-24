import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface FilterPanelProps {
  types: {
    id: string;
    label: string;
    count: number;
  }[];
  selectedType?: string;
  currentSort: string;
  categorySlug: string;
  constructUrl: (params: any) => string;
}

export default function FilterPanel({
  types,
  selectedType,
  currentSort,
  categorySlug,
  constructUrl,
}: FilterPanelProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Filter Resources</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-6">
          {/* Type Filter */}
          <div>
            <h3 className="font-medium mb-3">Resource Types</h3>
            <RadioGroup
              defaultValue={selectedType || "all"}
              className="space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="all" asChild>
                  <a href={constructUrl({ type: undefined, page: "1" })}>
                    <span className="sr-only">All types</span>
                  </a>
                </RadioGroupItem>
                <Label
                  htmlFor="all"
                  className="flex justify-between w-full text-sm font-normal"
                >
                  <span>All types</span>
                </Label>
              </div>

              {types.map((type) => (
                <div key={type.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={type.id} id={type.id} asChild>
                    <a href={constructUrl({ type: type.id, page: "1" })}>
                      <span className="sr-only">{type.label}</span>
                    </a>
                  </RadioGroupItem>
                  <Label
                    htmlFor={type.id}
                    className="flex justify-between w-full text-sm font-normal"
                  >
                    <span>{type.label}</span>
                    <span className="text-gray-500">({type.count})</span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Sort Options */}
          <div>
            <h3 className="font-medium mb-3">Sort By</h3>
            <Select
              defaultValue={currentSort}
              onValueChange={(value) => {
                window.location.href = constructUrl({ sort: value, page: "1" });
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select sorting" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="views">Most Viewed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
