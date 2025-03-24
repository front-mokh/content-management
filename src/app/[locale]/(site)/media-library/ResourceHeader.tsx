import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Calendar, User } from "lucide-react";
import { FullResource } from "@/lib/types";

interface ResourceHeaderProps {
  resource: FullResource;
}

export default function ResourceHeader({ resource }: ResourceHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex flex-wrap gap-2 mb-2">
        <Badge
          variant="outline"
          className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200"
        >
          {resource.category.label}
        </Badge>
        <Badge
          variant="outline"
          className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
        >
          {resource.type.label}
        </Badge>
      </div>

      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        {resource.title}
      </h1>

      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
        {resource.author && (
          <div className="flex items-center">
            <User className="h-4 w-4 mr-2" />
            {resource.author.firstName} {resource.author.lastName}
          </div>
        )}

        {resource.publishedAt && (
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            {formatDate(resource.publishedAt)}
          </div>
        )}
      </div>
    </div>
  );
}
