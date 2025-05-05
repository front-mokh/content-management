"use client";

import Link from "next/link";

const CTASection = ({ translations, locale }) => {
  return (
    <div className="bg-gradient-to-r from-website-primary/5 to-website-accent/5 py-16 mt-12">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-website-primary mb-6">
          {translations.joinCommunity}
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-8">
          {translations.communityDescription}
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href={`/${locale}/contribution`}
            className="bg-website-accent hover:bg-website-accent/90 text-white px-6 py-3 rounded-lg font-medium inline-block shadow-md transition-all duration-300 transform hover:-translate-y-1"
          >
            {translations.contributeButton}
          </Link>
          <Link
            href={`/${locale}/contact`}
            className="border border-website-secondary text-website-secondary hover:bg-website-secondary/10 px-6 py-3 rounded-lg font-medium inline-block transition-all duration-300 transform hover:-translate-y-1"
          >
            {translations.contactButton}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CTASection;