/* eslint-disable @typescript-eslint/no-explicit-any */
// components/Footer.tsx
"use client";

import Link from "next/link";
import { Facebook, Twitter, Instagram, Mail } from "lucide-react";
import { useParams } from "next/navigation";

export default function Footer({ dictionary }: { dictionary: any }) {
  const currentYear = new Date().getFullYear();

  const params = useParams();
  const locale = params.locale || "en";
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Logo and social section */}
          <div className="space-y-6">
            <Link href={`/${locale}/home`} className="flex items-center">
              <span className="text-3xl font-bold text-blue-400">
                {dictionary.footer.logo_1}
              </span>
              <span className="text-3xl font-bold text-amber-400">
                {dictionary.footer.logo_2}
              </span>
            </Link>
            <p className="text-sm text-gray-400 max-w-md">
              {dictionary.footer.tagline}
            </p>
            <div className="flex space-x-5 pt-2">
              <a
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
              >
                <Twitter className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
              >
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Navigation section */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white border-b border-gray-800 pb-2">
              {dictionary.footer.navigation}
            </h3>
            <ul className="space-y-3">
              {[
                { label: dictionary.footer.navHome, href: `/${locale}/home` },
                { label: dictionary.footer.navAbout, href: `/${locale}/about` },
                {
                  label: dictionary.footer.navDatabase,
                  href: `/${locale}/media-library`,
                },
                {
                  label: dictionary.footer.events,
                  href: `/${locale}/events`,
                },
                {
                  label: dictionary.footer.authors,
                  href: `/${locale}/events`,
                },
                
                {
                  label: dictionary.footer.navContribute,
                  href: `/${locale}/contribution`,
                },
              ].map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-blue-400 transition-colors flex items-center"
                  >
                    <span className="mr-2">•</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact section */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white border-b border-gray-800 pb-2">
              {dictionary.footer.contactTitle}
            </h3>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-start">
                <span className="mr-2 mt-1">📍</span>
                <span>{dictionary.footer.contactAddress}</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2">✉️</span>
                <span>{dictionary.footer.contactEmail}</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2">📞</span>
                <span>{dictionary.footer.contactPhone}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright section */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <div>
            {dictionary.footer.copyright.replace(
              "{year}",
              currentYear.toString()
            )}
          </div>
          <div className="mt-4 md:mt-0">
            <Link
              href={`/${locale}/terms-of-service`}
              className="hover:text-blue-400 transition-colors"
            >
              {dictionary.footer.termsOfService}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
