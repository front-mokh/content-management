export type CategoryColorIndex =
  | "images"
  | "vidéos"
  | "audio"
  | "texte"
  | "default";

export type ExtensionStylesIndex =
  | "doc"
  | "docx"
  | "pdf"
  | "txt"
  | "ppt"
  | "pptx"
  | "xls"
  | "xlsx"
  | "default";
export const CATEGORY_COLORS = {
  images: {
    border: "border-indigo-200",
    badge: "bg-indigo-100 text-indigo-800",
    hover: "hover:border-indigo-300",
    icon: "text-indigo-500",
    gradient: "from-indigo-500 to-purple-600",
  },
  vidéos: {
    border: "border-red-200",
    badge: "bg-red-100 text-red-800",
    hover: "hover:border-red-300",
    icon: "text-red-500",
    gradient: "from-red-500 to-orange-500",
  },
  audio: {
    border: "border-purple-200",
    badge: "bg-website-accent-1/40 text-[#a47600]",
    hover: "hover:border-purple-300",
    icon: "text-[#a47600]",
    gradient: "from-website-secondary/85 to-website-secondary/90",
  },
  texte: {
    border: "border-green-200",
    badge: "bg-green-100 text-green-800",
    hover: "hover:border-green-300",
    icon: "text-green-500",
    gradient: "from-website-secondary/85 to-website-secondary/90",
  },
  default: {
    border: "border-gray-200",
    badge: "bg-gray-100 text-gray-800",
    hover: "hover:border-gray-300",
    icon: "text-gray-500",
    gradient: "from-gray-500 to-slate-600",
  },
};
