"use client";

import Image from "next/image";
import { format } from "date-fns";
import { enUS, fr, arSA } from "date-fns/locale";
import { User, BookOpen } from "lucide-react";
import { Author } from "@prisma/client";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

// Helper function to get the correct API path
const getApiPath = (path) => {
  if (!path) return "/placeholder-author.jpg";
  // Extract the filename from the original path
  const filename = path.split("/").pop();
  // Return the API path
  return `/api/uploads/authors/${filename}`;
};

interface AuthorCardProps {
  author: Author & { resourceCount: number };
  className?: string;
  dictionary?: any; // Made dictionary optional
}

export function AuthorCard({
  author,
  className = "",
  dictionary,
}: AuthorCardProps) {
  const params = useParams();
  const locale = params.locale || "en";

  // Get the correct date locale based on the application locale
  const getDateLocale = () => {
    switch (locale) {
      case "fr":
        return fr;
      case "ar":
        return arSA;
      default:
        return enUS;
    }
  };

  const dateLocale = getDateLocale();

  const translations = {
    resources: "Resources",
    joinedOn: "Joined on",
    viewProfile: "View Profile",
  };

  const formattedDate = format(
    new Date(author.createdAt),
    locale === "ar" ? "dd MMMM yyyy" : "d MMMM yyyy",
    { locale: dateLocale }
  );
  
  const [imageUrl, setImageUrl] = useState<string>("/placeholder-author.jpg");

  // Process the path on component mount
  useEffect(() => {
    if (author.imagePath) {
      const apiPath = getApiPath(author.imagePath);
      setImageUrl(apiPath);
    }
  }, [author.imagePath]);

  // Truncate description to show small portion followed by ...
  const truncateDescription = (text, maxLength = 80) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + "...";
  };

  return (
    <Link href={`/${locale}/authors/${author.id}`}>
      <Card
        className={`text-website-text group h-full overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 bg-white border ${className}`}
      >
        <div className="p-3">
          {/* Author Image */}
          <div className="aspect-[1/1] rounded-md flex items-center justify-center text-white p-0 relative overflow-hidden">
            <Image
              src={imageUrl}
              alt={`${author.firstName} ${author.lastName}`}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          <CardContent className="p-0 pt-3">
            <div className="flex items-start justify-between mb-2">
              <h3
                className="font-semibold line-clamp-1 pr-2"
                title={`${author.firstName} ${author.lastName}`}
              >
                {author.firstName} {author.lastName}
              </h3>
              <Badge className="bg-website-primary/10 text-website-primary text-xs">
                {author.resourceCount} {dictionary?.authors?.resources || translations.resources}
              </Badge>
            </div>

            {author.description && (
              <p
                className="text-sm text-website-text/80 line-clamp-2 mb-3"
                title={author.description}
              >
                {truncateDescription(author.description)}
              </p>
            )}
          </CardContent>

          <CardFooter className="border-t border-website-primary/30 mt-3 pt-3 pb-1 text-sm text-website-text/80 flex justify-between">
            <div className="flex items-center gap-1">
              <User className="h-3.5 w-3.5" />
              <span>
                {dictionary?.authors?.joinedOn || translations.joinedOn}: {formattedDate}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <BookOpen className="h-3.5 w-3.5" />
                <span>
                  {dictionary?.authors?.viewProfile || translations.viewProfile}
                </span>
              </span>
            </div>
          </CardFooter>
        </div>
      </Card>
    </Link>
  );
}