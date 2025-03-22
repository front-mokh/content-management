import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

type Language = {
  code: string;
  names: {
    en: string;
    fr: string;
  };
  flag: string;
};

const languages: Language[] = [
  { 
    code: "en", 
    names: {
      en: "English",
      fr: "Anglais"
    }, 
    flag: "🇬🇧" 
  },
  { 
    code: "fr", 
    names: {
      en: "French",
      fr: "Français"
    }, 
    flag: "🇫🇷" 
  },
];

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Get current language from URL
  const currentLang = pathname?.split("/")[1] || "en";
  const currentLanguage = languages.find((lang) => lang.code === currentLang) || languages[0];

  // Helper function to get language name based on current language
  const getLocalizedName = (language: Language) => {
    return language.names[currentLang as keyof typeof language.names] || language.names.en;
  };

  const switchLanguage = (langCode: string) => {
    const newPathname = pathname?.replace(`/${currentLang}`, `/${langCode}`);
    router.push(newPathname);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-lg border bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        <span className="text-lg">{currentLanguage.flag}</span>
        <span>{getLocalizedName(currentLanguage)}</span>
        <ChevronDown
          className={`h-4 w-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => switchLanguage(language.code)}
                className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <span className="text-lg">{language.flag}</span>
                <span>{getLocalizedName(language)}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}