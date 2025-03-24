import { formatDate } from "@/lib/utils";
import { User, Calendar, Hash, Tag, MapPin } from "lucide-react";

interface ResourceMetadataProps {
  resource: {
    id: string;
    publishedAt: Date;
    views: bigint;
    upvotes: bigint;
    category: {
      label: string;
    };
    type: {
      label: string;
    };
    author?: {
      firstName: string;
      lastName: string;
    } | null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    metadata?: Record<string, any>;
  };
}

export default function ResourceMetadata({ resource }: ResourceMetadataProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
      {resource.author && (
        <div className="flex items-start">
          <User className="h-4 w-4 mr-3 mt-1 text-gray-500" />
          <div>
            <p className="text-sm font-medium">Author</p>
            <p className="text-sm text-gray-600">
              {resource.author.firstName} {resource.author.lastName}
            </p>
          </div>
        </div>
      )}

      <div className="flex items-start">
        <Calendar className="h-4 w-4 mr-3 mt-1 text-gray-500" />
        <div>
          <p className="text-sm font-medium">Published</p>
          <p className="text-sm text-gray-600">
            {formatDate(resource.publishedAt)}
          </p>
        </div>
      </div>

      <div className="flex items-start">
        <Tag className="h-4 w-4 mr-3 mt-1 text-gray-500" />
        <div>
          <p className="text-sm font-medium">Category</p>
          <p className="text-sm text-gray-600">{resource.category.label}</p>
        </div>
      </div>

      <div className="flex items-start">
        <Hash className="h-4 w-4 mr-3 mt-1 text-gray-500" />
        <div>
          <p className="text-sm font-medium">Type</p>
          <p className="text-sm text-gray-600">{resource.type.label}</p>
        </div>
      </div>

      {resource.metadata?.location && (
        <div className="flex items-start">
          <MapPin className="h-4 w-4 mr-3 mt-1 text-gray-500" />
          <div>
            <p className="text-sm font-medium">Location</p>
            <p className="text-sm text-gray-600">
              {resource.metadata.location}
            </p>
          </div>
        </div>
      )}

      <div className="flex items-start">
        <div className="h-4 w-4 mr-3 mt-1 text-gray-500">ID</div>
        <div>
          <p className="text-sm font-medium">Resource ID</p>
          <p className="text-sm text-gray-600 font-mono">{resource.id}</p>
        </div>
      </div>

      <div className="pt-2 mt-2 border-t border-gray-200">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Views</span>
          <span className="font-medium">
            {Number(resource.views).toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between text-sm mt-1">
          <span className="text-gray-600">Upvotes</span>
          <span className="font-medium">
            {Number(resource.upvotes).toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}
