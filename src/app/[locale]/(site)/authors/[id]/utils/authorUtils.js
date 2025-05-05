// Helper function to get the correct API path for author images
export const getApiPath = (path) => {
    if (!path) return "/placeholder-author.jpg";
    // Extract the filename from the original path
    const filename = path.split("/").pop();
    // Return the API path
    return `/api/uploads/authors/${filename}`;
  };
  
  // Helper function to get the date locale
  export const getDateLocale = (locale) => {
    switch (locale) {
      case "ar":
        return import("date-fns/locale/ar-SA").then((module) => module.arSA);
      case "fr":
        return import("date-fns/locale/fr").then((module) => module.fr);
      case "en":
      default:
        return import("date-fns/locale/en-US").then((module) => module.enUS);
    }
  };
  
  // Animation variants
  export const createAnimationVariants = (isRTL) => {
    return {
      fadeUp: {
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5 },
        },
      },
      slideIn: {
        hidden: { opacity: 0, x: isRTL ? 20 : -20 },
        visible: {
          opacity: 1,
          x: 0,
          transition: { duration: 0.4 },
        },
      },
      fadeScale: {
        hidden: { opacity: 0, scale: 0.9 },
        animate: { 
          opacity: 1, 
          scale: 1,
          transition: { duration: 0.5 }
        }
      }
    };
  };