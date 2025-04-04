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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
         
          <Link href={`/${locale}/home`} className="flex items-center">
              <span className="text-2xl font-bold text-blue-400">{dictionary.footer.logo_1}</span>
              <span className="text-2xl font-bold text-amber-400">{dictionary.footer.logo_2}</span>
            </Link>
            <p className="text-sm">
              {dictionary.footer.tagline}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">{dictionary.footer.navigation}</h3>
            <ul className="space-y-2">
              {[
                  // <Link href={`/${locale}/home`}
                { label: dictionary.footer.navHome, href: `/${locale}/home` },
                { label: dictionary.footer.navAbout, href: `/${locale}/about` },
                { label: dictionary.footer.navDatabase, href:  `/${locale}/media-library` },
                { label: dictionary.footer.navContribute, href: `/${locale}/contribution` }
              ].map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href}
                    className="text-gray-400 hover:text-blue-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li> 
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4 text-white">{dictionary.footer.databaseTitle}</h3>
              <ul className="space-y-2">
                {[
                  { label: dictionary.footer.dbImages, href: `/${locale}/media-library?category=ebe0731e-229f-40fe-b72e-834c4be7ecbc&page=1` },
                  { label: dictionary.footer.dbAudio, href: `/${locale}/media-library?category=b70baeea-3398-4967-9d67-6c1430deb500&page=1` },
                  { label: dictionary.footer.dbVideo, href: `/${locale}/media-library?category=b70baeea-3398-4967-9d67-6c1430deb500&page=1` },
                  { label: dictionary.footer.dbText, href: `/${locale}/media-library?category=b70baeea-3398-4967-9d67-6c1430deb500&page=1` }
                ].map((link, index) => (
                  <li key={index}>
                    <Link 
                      href={link.href}
                      className="text-gray-400 hover:text-blue-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4 text-white">{dictionary.footer.contactTitle}</h3>
              <ul className="space-y-2 text-gray-400">
                <li>{dictionary.footer.contactAddress}</li>
                <li>{dictionary.footer.contactEmail}</li>
                <li>{dictionary.footer.contactPhone}</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
            <div>
              {dictionary.footer.copyright.replace('{year}', currentYear.toString())}
            </div>
            <div className="mt-4 md:mt-0 space-x-6">
              <Link href={`/${locale}/terms-of-service`} className="hover:text-blue-400 transition-colors">
                {dictionary.footer.termsOfService}
              </Link>
            </div>
          </div>
        </div>
      </footer>
    );
  }