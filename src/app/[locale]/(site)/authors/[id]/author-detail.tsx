"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";

// Utility imports
import { getApiPath, getDateLocale, createAnimationVariants} from "./utils/authorUtils";
import { getAuthorTranslations } from "./utils/authorTranslations";
// Component imports
import BackNavigation from "./BackNavigation";
import AuthorBanner from "./AuthorBanner";
import AuthorAboutSection from "./AuthorAboutSection";
import AuthorDetailsCard from "./AuthorDetailsCard";
import AuthorResourcesSection from "./AuthorResourcesSection";
import CTASection from "./CTASection";

export default function AuthorDetailPage({
  author,
  resources,
  dictionary,
  locale,
}) {
  const isRTL = locale === "ar";
  const [dateLocale, setDateLocale] = useState(null);
  const [formattedJoinDate, setFormattedJoinDate] = useState("");
  
  // Get translations
  const translations = getAuthorTranslations(dictionary);
  
  // Animation variants
  const animations = createAnimationVariants(isRTL);
  
  // Process author image path
  author.imagePath = getApiPath(author.imagePath);

  // Handle date formatting with dynamic imports
  useEffect(() => {
    const loadLocale = async () => {
      const localeData = await getDateLocale(locale);
      setDateLocale(localeData);
      
      // Format date once locale is loaded
      const formatted = format(
        new Date(author.createdAt),
        isRTL ? "dd MMMM yyyy" : "d MMMM yyyy",
        { locale: localeData }
      );
      setFormattedJoinDate(formatted);
    };
    
    loadLocale();
  }, [author.createdAt, locale, isRTL]);

  // Don't render until date formatting is ready
  if (!formattedJoinDate) {
    return null; // Or a loading state
  }

  return (  
    <div className="min-h-screen bg-gray-50" dir={isRTL ? "rtl" : "ltr"}>
      {/* Back Navigation */}
      <BackNavigation 
        backLink={`/${locale}/authors`}
        label={translations.backToAuthors}
        isRTL={isRTL}
        variants={animations.slideIn}
      />

      {/* Hero Section */}
      <AuthorBanner 
        author={author}
        formattedJoinDate={formattedJoinDate}
        resourcesCount={resources.length}
        translations={translations}
        isRTL={isRTL}
      />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          {/* About Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Main Content Area - Takes 2/3 of the grid */}
            <div className="lg:col-span-2 space-y-8">
              <AuthorAboutSection 
                author={author} 
                translations={translations}
                variants={animations.fadeUp}
              />
            </div>

            {/* Sidebar - Takes 1/3 of the grid */}
            <AuthorDetailsCard 
              author={author}
              formattedJoinDate={formattedJoinDate}
              resourcesCount={resources.length}
              translations={translations}
              isRTL={isRTL}
              variants={animations.fadeUp}
            />
          </div>

          {/* Resources Section */}
          {/* <AuthorResourcesSection 
            resources={resources}
            translations={translations}
            variants={animations.fadeUp}
          /> */}
        </div>
      </div>
      
      {/* Call to Action Section */}
      <CTASection 
        translations={translations}
        locale={locale}
      />
    </div>
  );
}