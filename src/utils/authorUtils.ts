// utils/authorUtils.ts

export enum AuthorCategory {
    ECRIVAINS = "ECRIVAINS",
    POETES = "POETES", 
    CHANTEURS = "CHANTEURS",
    PERSONNAGES_DE_GUERRES = "PERSONNAGES_DE_GUERRES",
    PERSONNAGES_LEGENDS = "PERSONNAGES_LEGENDS"
  }
  
  export interface CategoryDisplay {
    label: string;
    color: string;
    bgColor: string;
    icon?: string;
  }
  
  export const getCategoryDisplay = (category: AuthorCategory): CategoryDisplay => {
    const categoryMap: Record<AuthorCategory, CategoryDisplay> = {
      [AuthorCategory.ECRIVAINS]: {
        label: "Écrivains",
        color: "text-blue-700",
        bgColor: "bg-blue-100",
        icon: "📚"
      },
      [AuthorCategory.POETES]: {
        label: "Poètes", 
        color: "text-purple-700",
        bgColor: "bg-purple-100",
        icon: "🎭"
      },
      [AuthorCategory.CHANTEURS]: {
        label: "Chanteurs",
        color: "text-green-700", 
        bgColor: "bg-green-100",
        icon: "🎵"
      },
      [AuthorCategory.PERSONNAGES_DE_GUERRES]: {
        label: "Personnages de Guerres",
        color: "text-red-700",
        bgColor: "bg-red-100", 
        icon: "⚔️"
      },
      [AuthorCategory.PERSONNAGES_LEGENDS]: {
        label: "Personnages Légendaires",
        color: "text-amber-700",
        bgColor: "bg-amber-100",
        icon: "🌟"
      }
    };
  
    return categoryMap[category] || {
      label: category,
      color: "text-gray-700",
      bgColor: "bg-gray-100"
    };
  };