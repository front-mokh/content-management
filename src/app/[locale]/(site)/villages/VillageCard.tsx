"use client";

import Image from "next/image";
import { format } from "date-fns";
import { enUS, fr, arSA } from "date-fns/locale";
import { MapPin, Calendar, Eye } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

// Helper function to get the correct API path
const getApiPath = (path: string) => {
  // Extract the filename from the original path
  const filename = path.split("/").pop();
  // Return the API path
  return `/api/uploads/images/${filename}`;
};

interface Village {
  id: string;
  title: string;
  description?: string;
  mediaPath: string;
  createdAt: Date;
  updatedAt: Date;
}

interface VillageCardProps {
  village: Village;
  className?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dictionary?: any; // Made dictionary optional
}

export function VillageCard({
  village,
  className = "",
  dictionary,
}: VillageCardProps) {
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
    village: "Village",
    addedOn: "Added on",
    viewDetails: "View Details",
    explore: "Explore",
  };

  const formattedDate = format(
    new Date(village.updatedAt || village.createdAt),
    locale === "ar" ? "dd MMMM yyyy" : "d MMMM yyyy",
    { locale: dateLocale }
  );

  const [mediaUrl, setMediaUrl] = useState<string>(village.mediaPath);

  // Process the path on component mount
  useEffect(() => {
    if (village.mediaPath) {
      const apiPath = getApiPath(village.mediaPath);
      setMediaUrl(apiPath);
    }
  }, [village.mediaPath]);

  // Truncate description to show small portion followed by ...
  const truncateDescription = (text: string | undefined, maxLength = 100) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + "...";
  };

  return (
    <Link href={`/${locale}/villages/${village.id}`}>
      <Card
        className={`text-website-text group h-full overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 bg-white border ${className}`}
      >
        <div className="p-3">
          {/* Media Preview */}
          <div className="border aspect-video rounded-md flex items-center justify-center text-white p-0 relative overflow-hidden">
            <Image
              src={mediaUrl}
              alt={village.title}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-500 group-hover:scale-105"
            />
            
            {/* Village overlay indicator */}
            <div className="absolute top-2 left-2 bg-black/70 px-2 py-1 rounded text-xs font-medium flex items-center">
              <MapPin className="h-3 w-3 mr-1" />
              {dictionary?.villages?.type || translations.village}
            </div>
          </div>

          <CardContent className="p-0 pt-3">
            <div className="flex items-start justify-between mb-2">
              <h3
                className="font-semibold line-clamp-1 pr-2 text-lg"
                title={village.title}
              >
                {village.title}
              </h3>
              <Badge className="bg-website-primary/10 text-website-primary text-xs">
                {dictionary?.villages?.type || translations.village}
              </Badge>
            </div>

            {village.description && (
              <p
                className="text-sm text-website-text/80 line-clamp-3 mb-3"
                title={village.description}
              >
                {truncateDescription(village.description)}
              </p>
            )}
          </CardContent>

          <CardFooter className="border-t border-website-primary/30 mt-3 pt-3 pb-1 text-sm text-website-text/80 flex justify-between">
            <div className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              <span>
                {dictionary?.villages?.postedOn || translations.addedOn}:{" "}
                {formattedDate}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-website-primary hover:text-website-primary/80 transition-colors">
                <Eye className="h-3.5 w-3.5" />
                <span>
                  {dictionary?.villages?.viewDetails || translations.explore}
                </span>
              </span>
            </div>
          </CardFooter>
        </div>
      </Card>
    </Link>
  );
}