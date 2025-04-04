// components/Navbar.tsx
"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X, Globe, ChevronDown } from "lucide-react";
import { useParams, usePathname } from "next/navigation";

export default function Navbar({ dictionary }: { dictionary: any }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const params = useParams();
  const pathname = usePathname();
  const locale = params.locale || "en"; // Default to English if no locale found
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const toggleLanguageMenu = () => {
    setIsLanguageMenuOpen(!isLanguageMenuOpen);
  };
  
  // Function to get the equivalent path in another language
  const getLocalizedPath = (newLocale: string) => {
    // Remove the current locale from the path and add the new one
    const pathWithoutLocale = pathname.replace(`/${locale}`, '');
    return `/${newLocale}${pathWithoutLocale || '/home'}`;
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href={`/${locale}/home`} className="flex items-center">
              <span className="text-2xl font-bold text-blue-600"> {dictionary.navbar.logo_1}</span>
              <span className="text-2xl font-bold text-amber-500">{dictionary.navbar.logo_2}</span>
            </Link>
          </div>
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href={`/${locale}/home`}
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              {dictionary.navbar.home}
            </Link>
            <Link
              href={`/${locale}/about`}
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              {dictionary.navbar.about}
            </Link>
            <Link
              href={`/${locale}/media-library`}
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              {dictionary.navbar.database}
            </Link>
            <Link
              href={`/${locale}/contribution`}
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              {dictionary.navbar.contribute}
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              {dictionary.navbar.contact}
            </Link>
            
            {/* Language Switcher - Desktop */}
            <div className="relative">
              <button 
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 font-medium transition-colors focus:outline-none"
                onClick={toggleLanguageMenu}
              >
                <Globe size={18} />
                <span>{locale === 'en' ? 'English' : locale === 'fr' ? 'Français' : 'العربية'}</span>
                <ChevronDown size={16} className={`transform transition-transform ${isLanguageMenuOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isLanguageMenuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-1 z-50 ring-1 ring-black ring-opacity-5">
                  <Link 
                    href={getLocalizedPath('en')}
                    className={`block px-4 py-2 text-sm ${locale === 'en' ? 'bg-gray-100 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}
                    onClick={() => setIsLanguageMenuOpen(false)}
                  >
                    English
                  </Link>
                  <Link 
                    href={getLocalizedPath('fr')}
                    className={`block px-4 py-2 text-sm ${locale === 'fr' ? 'bg-gray-100 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}
                    onClick={() => setIsLanguageMenuOpen(false)}
                  >
                    Français
                  </Link>
                  <Link 
                    href={getLocalizedPath('ar')}
                    className={`block px-4 py-2 text-sm ${locale === 'ar' ? 'bg-gray-100 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}
                    onClick={() => setIsLanguageMenuOpen(false)}
                  >
                    العربية
                  </Link>
                </div>
              )}
            </div>
          </nav>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            {/* Language Toggle - Mobile */}
            <div className="relative">
              <button 
                className="p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none"
                onClick={toggleLanguageMenu}
              >
                <Globe size={20} />
              </button>
              
              {isLanguageMenuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-1 z-50 ring-1 ring-black ring-opacity-5">
                  <Link 
                    href={getLocalizedPath('en')}
                    className={`block px-4 py-2 text-sm ${locale === 'en' ? 'bg-gray-100 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}
                    onClick={() => setIsLanguageMenuOpen(false)}
                  >
                    English
                  </Link>
                  <Link 
                    href={getLocalizedPath('fr')}
                    className={`block px-4 py-2 text-sm ${locale === 'fr' ? 'bg-gray-100 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}
                    onClick={() => setIsLanguageMenuOpen(false)}
                  >
                    Français
                  </Link>
                  <Link 
                    href={getLocalizedPath('ar')}
                    className={`block px-4 py-2 text-sm ${locale === 'ar' ? 'bg-gray-100 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}
                    onClick={() => setIsLanguageMenuOpen(false)}
                  >
                    العربية
                  </Link>
                </div>
              )}
            </div>
            
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
            <Link
              href={`/${locale}/home`}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              onClick={toggleMenu}
            >
              {dictionary.navbar.home}
            </Link>
            <Link
              href={`/${locale}/about`}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              onClick={toggleMenu}
            >
              {dictionary.navbar.about}
            </Link>
            <Link
              href={`/${locale}/media-library`}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              onClick={toggleMenu}
            >
              {dictionary.navbar.database}
            </Link>
            <Link
              href={`/${locale}/contribution`}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              onClick={toggleMenu}
            >
              {dictionary.navbar.contribute}
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              onClick={toggleMenu}
            >
              {dictionary.navbar.contact}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}