import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Eye, ThumbsUp } from "lucide-react";
import { FullResource } from "@/lib/types";

interface ResourceListProps {
  resources: FullResource[];
}

export default function ResourceList({ resources }: ResourceListProps) {
  return (
    <div className="space-y-4">
      {resources.map((resource) => {
        const resourceUrl = `/media-library/${resource.category.label.toLowerCase()}/${
          resource.id
        }`;

        // Helper to get thumbnail based on resource type
        const getThumbnail = () => {
          const categoryLabel = resource.category.label.toLowerCase();

          if (categoryLabel === "images") {
            return resource.path;
          }

          const placeholders = {
            texts: "/images/placeholders/text.jpg",
            audio: "/images/placeholders/audio.jpg",
            videos: "/images/placeholders/video.jpg",
          };

          return (
            placeholders[categoryLabel as keyof typeof placeholders] ||
            "/images/placeholders/default.jpg"
          );
        };

        return (
          <div
            key={resource.id}
            className="flex flex-col sm:flex-row gap-4 p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <Link href={resourceUrl} className="block sm:w-48 flex-shrink-0">
              <div className="aspect-video relative rounded-md overflow-hidden">
                <img
                  src={getThumbnail()}
                  alt={resource.title}
                  className="object-cover w-full h-full"
                />
                <Badge className="absolute top-2 right-2 bg-indigo-700">
                  {resource.type.label}
                </Badge>
              </div>
            </Link>

            <div className="flex-grow flex flex-col">
              <div className="flex-grow">
                <Link href={resourceUrl}>
                  <h3 className="font-semibold text-lg mb-2 hover:text-indigo-700 transition-colors">
                    {resource.title}
                  </h3>
                </Link>

                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {resource.description}
                </p>
              </div>

              <div className="flex justify-between items-center text-xs text-gray-500">
                <div className="flex items-center gap-4">
                  {resource.author && (
                    <span>
                      By {resource.author.firstName} {resource.author.lastName}
                    </span>
                  )}
                  {resource.publishedAt && (
                    <span>{formatDistanceToNow(resource.publishedAt)} ago</span>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <span className="flex items-center">
                    <Eye className="h-3 w-3 mr-1" />
                    {Number(resource.views).toLocaleString()}
                  </span>
                  <span className="flex items-center">
                    <ThumbsUp className="h-3 w-3 mr-1" />
                    {Number(resource.upvotes).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
