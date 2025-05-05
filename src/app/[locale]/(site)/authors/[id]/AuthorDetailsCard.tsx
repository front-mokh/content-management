"use client";

import { motion } from "framer-motion";
import { UserCheck, CalendarDays, BookOpen, MapPin, Mail, Globe, ExternalLink } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const DetailItem = ({ icon: Icon, label, value, isRTL, isLink, href }) => {
  return (
    <div className="flex items-start">
      <Icon
        className={`h-5 w-5 text-website-secondary mt-0.5 ${
          isRTL ? "ml-4" : "mr-4"
        } flex-shrink-0`}
      />
      <div>
        <span className="block text-sm text-gray-500">
          {label}
        </span>
        {isLink ? (
          <a 
            href={href} 
            target={href.startsWith('mailto:') ? '_self' : '_blank'}
            rel="noopener noreferrer"
            className="font-medium text-website-primary hover:underline flex items-center"
          >
            {value}
            {!href.startsWith('mailto:') && <ExternalLink className="h-3 w-3 ml-1" />}
          </a>
        ) : (
          <span className="font-medium">{value}</span>
        )}
      </div>
    </div>
  );
};

const AuthorDetailsCard = ({ author, formattedJoinDate, resourcesCount, translations, isRTL, variants }) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      transition={{ delay: 0.2 }}
    >
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center text-lg text-website-primary">
            <UserCheck className={`h-5 w-5 ${isRTL ? "ml-2" : "mr-2"}`} />
            {translations.authorDetails}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <DetailItem
            icon={CalendarDays}
            label={translations.joinedOn}
            value={formattedJoinDate}
            isRTL={isRTL}
          />

          <DetailItem
            icon={BookOpen}
            label={translations.resourcesCount}
            value={resourcesCount}
            isRTL={isRTL}
          />

          {author.location && (
            <DetailItem
              icon={MapPin}
              label={translations.location}
              value={author.location}
              isRTL={isRTL}
            />
          )}

          {author.email && (
            <DetailItem
              icon={Mail}
              label={translations.email}
              value={author.email}
              isRTL={isRTL}
              isLink={true}
              href={`mailto:${author.email}`}
            />
          )}
          
          {author.website && (
            <DetailItem
              icon={Globe}
              label={translations.website}
              value={author.website}
              isRTL={isRTL}
              isLink={true}
              href={author.website}
            />
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AuthorDetailsCard;