import { Menu } from "@/types/menu";

// Updated type to make path optional when submenu exists
type MultilingualMenu = {
  id: number;
  titles: {
    en: string;
    fr: string;
  };
  newTab: boolean;
  path?: string; // Make path optional
  submenu?: MultilingualMenu[];
} & (
  | { submenu: MultilingualMenu[]; path?: string } // If submenu exists, path is optional
  | { submenu?: never; path: string }
); // If no submenu, path is required

const menuData: MultilingualMenu[] = [
  {
    id: 1,
    titles: {
      en: "Home",
      fr: "Accueil",
    },
    newTab: false,
    path: "/",
  },
  {
    id: 2,
    titles: {
      en: "About us",
      fr: "À propos",
    },
    newTab: false,
    path: "/#about",
  },
  {
    id: 2,
    titles: {
      en: "Services",
      fr: "Nos Services",
    },
    newTab: false,
    path: "/#services",
  },
  {
    id: 2,
    titles: {
      en: "FAQ",
      fr: "FAQ",
    },
    newTab: false,
    path: "/#faq",
  },
  {
    id: 2,
    titles: {
      en: "Contact Us",
      fr: "Contactez-Nous",
    },
    newTab: false,
    path: "/#contact",
  },
];

export default menuData;
