// components/Footer.tsx
"use client";

import Link from "next/link";
import { Facebook, Twitter, Instagram, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-blue-400">Tamazight</span>
              <span className="text-2xl font-bold text-amber-400">Treasures</span>
            </Link>
            <p className="text-sm">
              Preserving and sharing the rich cultural heritage of Kabylie for future generations.
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
            <h3 className="text-lg font-bold mb-4 text-white">Navigation</h3>
            <ul className="space-y-2">
              {[
                { label: "Home", href: "/" },
                { label: "About", href: "/about" },
                { label: "Database", href: "/database" },
                { label: "Contribute", href: "/contribution" }
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
              <h3 className="text-lg font-bold mb-4 text-white">Database</h3>
              <ul className="space-y-2">
                {[
                  { label: "Images", href: "/database?category=images" },
                  { label: "Audio", href: "/database?category=audio" },
                  { label: "Video", href: "/database?category=video" },
                  { label: "Recent Additions", href: "/database?sort=newest" }
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
              <h3 className="text-lg font-bold mb-4 text-white">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Tizi Ouzou, Algeria</li>
                <li>contact@tamazight-treasures.org</li>
                <li>+213 XX XXX XXXX</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
            <div>
              © {currentYear} Tamazight Treasures. All rights reserved.
            </div>
            <div className="mt-4 md:mt-0 space-x-6">
            
              <Link href="/en/terms-of-service" className="hover:text-blue-400 transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    );
  }