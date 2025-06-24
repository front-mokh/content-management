// components/Navbar.tsx
"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { useParams, usePathname } from "next/navigation";

interface LocaleInfo {
  code: "en" | "fr" | "ar";
  flag: string; 
  name: string; 
}

enum AuthorCategory {
  ECRIVAINS = "ECRIVAINS",
  POETES = "POETES",
  CHANTEURS = "CHANTEURS",
  PERSONNAGES_DE_GUERRES = "PERSONNAGES_DE_GUERRES",
  PERSONNAGES_LEGENDS = "PERSONNAGES_LEGENDS"
}

const availableLocales: LocaleInfo[] = [
  { code: "en", flag: "🇺🇸", name: "English" },
  { code: "fr", flag: "🇫🇷", name: "Français" },
  { code: "ar", flag: "🇩🇿", name: "العربية" },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Navbar({ dictionary }: { dictionary: any }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [isAuthorsMenuOpen, setIsAuthorsMenuOpen] = useState(false);
  const [isAuthorsMenuOpenMobile, setIsAuthorsMenuOpenMobile] = useState(false);
  const params = useParams();
  const pathname = usePathname();
  const locale = (params.locale || "en") as "en" | "fr" | "ar";

  const languageMenuRefDesktop = useRef<HTMLDivElement>(null);
  const languageMenuRefMobile = useRef<HTMLDivElement>(null);
  const authorsMenuRefDesktop = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      setIsLanguageMenuOpen(false);
      setIsAuthorsMenuOpenMobile(false);
    }
  };

  const toggleLanguageMenu = () => {
    setIsLanguageMenuOpen(!isLanguageMenuOpen);
  };

  const toggleAuthorsMenu = () => {
    setIsAuthorsMenuOpen(!isAuthorsMenuOpen);
  };

  const toggleAuthorsMenuMobile = () => {
    setIsAuthorsMenuOpenMobile(!isAuthorsMenuOpenMobile);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Language menu
      if (
        languageMenuRefDesktop.current &&
        !languageMenuRefDesktop.current.contains(event.target as Node) &&
        languageMenuRefMobile.current &&
        !languageMenuRefMobile.current.contains(event.target as Node)
      ) {
        setIsLanguageMenuOpen(false);
      }

      // Authors menu
      if (
        authorsMenuRefDesktop.current &&
        !authorsMenuRefDesktop.current.contains(event.target as Node)
      ) {
        setIsAuthorsMenuOpen(false);
      }
    };

    if (isLanguageMenuOpen || isAuthorsMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isLanguageMenuOpen, isAuthorsMenuOpen]);

  const getLocalizedPath = (newLocale: string) => {
    const pathWithoutLocale = pathname.replace(`/${locale}`, "");
    const cleanPath =
      pathWithoutLocale === "/" || pathWithoutLocale === ""
        ? "/home"
        : pathWithoutLocale;
    return `/${newLocale}${cleanPath}`;
  };

  const isLinkActive = (pathSegment: string) => {
    const currentPathSegment =
      pathname === `/${locale}` ? "/home" : pathname.replace(`/${locale}`, "");
    const targetPathSegment =
      pathSegment === "home" ? "/home" : `/${pathSegment}`;
    return currentPathSegment === targetPathSegment;
  };

  const isAuthorsActive = () => {
    return pathname.includes('/authors');
  };

  const navItems = [
    { hrefKey: "home", labelKey: "home" },
    { hrefKey: "media-library", labelKey: "database" },
    { hrefKey: "events", labelKey: "events" },
    { hrefKey: "authors", labelKey: "authors", isDropdown: true },
    { hrefKey: "contribution", labelKey: "contribute" },
    { hrefKey: "about", labelKey: "about" },
    { hrefKey: "contact", labelKey: "contact" },
  ];

  const authorCategories = Object.values(AuthorCategory);

  const currentLocaleInfo =
    availableLocales.find((l) => l.code === locale) || availableLocales[0];

  const LanguageMenuItems = () => (
    <>
      {availableLocales.map((langInfo) => {
        const isCurrent = locale === langInfo.code;
        if (isCurrent) {
          return (
            <div
              key={langInfo.code}
              className="flex justify-center items-center px-4 py-2 text-sm bg-blue-50 opacity-70 cursor-default" 
              aria-label={`Current language: ${langInfo.name}`}
              title={`Current language: ${langInfo.name}`}
            >
              <span className="text-2xl">{langInfo.flag}</span>
            </div>
          );
        } else {
          return (
            <Link
              key={langInfo.code}
              href={getLocalizedPath(langInfo.code)}
              className="flex justify-center items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors" 
              onClick={() => setIsLanguageMenuOpen(false)} 
              aria-label={`Switch to ${langInfo.name}`}
              title={`Switch to ${langInfo.name}`} 
            >
              <span className="text-2xl">{langInfo.flag}</span>
            </Link>
          );
        }
      })}
    </>
  );

  const AuthorsMenuItems = ({ onClose }: { onClose: () => void }) => (
    <>
      {authorCategories.map((category) => (
        <Link
          key={category}
          href={`/${locale}/authors/${category.toLowerCase()}`}
          className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
          onClick={onClose}
        >
          {dictionary.authorCategories?.[category] || category}
        </Link>
      ))}
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href={`/${locale}/home`} className="flex items-center">
              <span className="text-2xl font-bold text-blue-600">
                {dictionary.navbar.logo_1 || "Logo"}
              </span>
              <span className="text-2xl font-bold text-amber-500">
                {dictionary.navbar.logo_2 || "Part2"}
              </span>
            </Link>
          </div>       

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navItems.map((item) => {
              if (item.isDropdown && item.hrefKey === "authors") {
                // Authors Dropdown
                return (
                  <div key={item.hrefKey} className="relative" ref={authorsMenuRefDesktop}>
                    <button
                      className={`flex items-center space-x-1 font-medium transition-colors py-2 border-b-2 ${
                        isAuthorsActive()
                          ? "text-blue-600 font-semibold border-blue-600"
                          : "text-gray-700 hover:text-blue-600 border-transparent"
                      }`}
                      onClick={toggleAuthorsMenu}
                      aria-haspopup="true"
                      aria-expanded={isAuthorsMenuOpen}
                      aria-label="Authors menu"
                    >
                      <span>{dictionary.navbar[item.labelKey] || "Authors"}</span>
                      <ChevronDown
                        size={16}
                        className={`text-gray-600 transform transition-transform duration-200 ${
                          isAuthorsMenuOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Authors Dropdown Menu */}
                    {isAuthorsMenuOpen && (
                      <div className="absolute left-0 mt-2 w-56 bg-white rounded-md shadow-lg py-2 z-50 ring-1 ring-black ring-opacity-5">
                        <AuthorsMenuItems onClose={() => setIsAuthorsMenuOpen(false)} />
                      </div>
                    )}
                  </div>
                );
              } else {
                // Regular nav items
                const isActive = isLinkActive(item.hrefKey);
                return (
                  <Link
                    key={item.hrefKey}
                    href={`/${locale}/${
                      item.hrefKey === "home" ? "home" : item.hrefKey
                    }`}
                    className={`font-medium transition-colors py-2 ${
                      isActive
                        ? "text-blue-600 font-semibold border-b-2 border-blue-600"
                        : "text-gray-700 hover:text-blue-600 border-b-2 border-transparent"
                    }`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {dictionary.navbar[item.labelKey]}
                  </Link>
                );
              }
            })}

            {/* Language Dropdown */}
            <div className="relative" ref={languageMenuRefDesktop}>
              <button
                className="flex items-center space-x-1 px-3 py-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 transition-colors"
                onClick={toggleLanguageMenu}
                aria-haspopup="true"
                aria-expanded={isLanguageMenuOpen}
                aria-label={`Current language: ${currentLocaleInfo.name}, Change language`}
              >
                <span className="text-xl">{currentLocaleInfo.flag}</span>
                <ChevronDown
                  size={16}
                  className={`text-gray-600 transform transition-transform duration-200 ${
                    isLanguageMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Language Dropdown Menu */}
              {isLanguageMenuOpen && (
                <div className="absolute right-0 mt-2 w-auto bg-white rounded-md shadow-lg py-1 z-50 ring-1 ring-black ring-opacity-5 min-w-[60px]">
                  <LanguageMenuItems />
                </div>
              )}
            </div>
          </nav>

          {/* Mobile Menu Button and Language Selector */}
          <div className="md:hidden flex items-center space-x-2">
            <div className="relative" ref={languageMenuRefMobile}>
              <button
                className="flex items-center space-x-1 p-2 rounded-md hover:bg-gray-100 focus:outline-none transition-colors"
                onClick={toggleLanguageMenu}
                aria-haspopup="true"
                aria-expanded={isLanguageMenuOpen}
                aria-label={`Current language: ${currentLocaleInfo.name}, Change language`}
              >
                <span className="text-xl">{currentLocaleInfo.flag}</span>
                <ChevronDown
                  size={16}
                  className={`text-gray-600 transform transition-transform duration-200 ${
                    isLanguageMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isLanguageMenuOpen && (
                <div className="absolute right-0 mt-2 w-auto bg-white rounded-md shadow-lg py-1 z-50 ring-1 ring-black ring-opacity-5 min-w-[60px]">
                  <LanguageMenuItems />
                </div>
              )}
            </div>         

            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none"
              onClick={toggleMenu}
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
            {navItems.map((item) => {
              if (item.isDropdown && item.hrefKey === "authors") {
                // Mobile Authors Dropdown
                return (
                  <div key={item.hrefKey} className="space-y-1">
                    <button
                      className={`flex items-center justify-between w-full px-3 py-2 rounded-md text-base font-medium ${
                        isAuthorsActive()
                          ? "bg-blue-50 text-blue-700 font-semibold"
                          : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                      }`}
                      onClick={toggleAuthorsMenuMobile}
                      aria-expanded={isAuthorsMenuOpenMobile}
                    >
                      <span>{dictionary.navbar[item.labelKey] || "Authors"}</span>
                      <ChevronDown
                        size={16}
                        className={`transform transition-transform duration-200 ${
                          isAuthorsMenuOpenMobile ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {isAuthorsMenuOpenMobile && (
                      <div className="pl-4 space-y-1">
                        {authorCategories.map((category) => (
                          <Link
                            key={category}
                            href={`/${locale}/authors/${category.toLowerCase()}`}
                            className="block px-3 py-2 rounded-md text-sm text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                            onClick={toggleMenu}
                          >
                            {dictionary.authorCategories?.[category] || category}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              } else {
                // Regular mobile nav items
                const isActive = isLinkActive(item.hrefKey);
                return (
                  <Link
                    key={item.hrefKey}
                    href={`/${locale}/${
                      item.hrefKey === "home" ? "home" : item.hrefKey
                    }`}
                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                      isActive
                        ? "bg-blue-50 text-blue-700 font-semibold"
                        : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                    }`}
                    onClick={toggleMenu}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {dictionary.navbar[item.labelKey]}
                  </Link>
                );
              }
            })}
          </div>
        </div>
      )}
    </header>
  );
}