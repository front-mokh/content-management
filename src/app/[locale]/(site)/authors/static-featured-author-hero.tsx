// components/pages/authors/static-featured-author-hero.tsx
import { motion } from "framer-motion";

export function StaticFeaturedAuthorHero({
  dictionary,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  locale,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dictionary: any;
  locale: string;
}) {
  return (
    <section className="relative bg-[url('/new_hero2.png')] bg-cover bg-center shadow-lg py-20 overflow-hidden">
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/50"></div>
      
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-15">
        <div className="absolute inset-0 bg-[url('/pattern-kabyle.svg')] bg-repeat opacity-20 animate-pulse"></div>
        <svg className="h-full w-full" viewBox="0 0 800 800">
          <defs>
            <pattern id="author-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <rect x="0" y="0" width="4" height="4" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="800" height="800" fill="url(#author-pattern)" />
        </svg>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-white"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="inline-block relative">
                {dictionary.authors.pageTitle}
                <span className="absolute -bottom-1 left-0 w-full h-1 bg-amber-500 transform scale-x-0 origin-left animate-expand"></span>
              </span>
            </h1>
            <p className="text-xl text-blue-100 mb-6 leading-relaxed max-w-3xl">
              {dictionary.authors.allAuthorsDescription}
            </p>
            <p className="text-lg text-blue-100 leading-relaxed max-w-3xl">
              {dictionary.authors.heroDescription ||
                "Meet the talented authors who contribute to preserving and sharing Tamazight culture through their writings, research, and creative work."}
            </p>
          </motion.div>
          
          {/* Decorative elements around content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8 flex justify-center items-center gap-8"
          >
            <div className="w-16 h-1 bg-amber-500 rounded-full"></div>
            <div className="w-4 h-4 bg-amber-400 rounded-full animate-pulse"></div>
            <div className="w-16 h-1 bg-amber-500 rounded-full"></div>
          </motion.div>
        </div>
      </div>
      
      {/* Floating decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-amber-500 opacity-10 animate-float-slow"
            style={{
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${Math.random() * 20 + 15}s`,
            }}
          />
        ))}
      </div>
      
      {/* Additional decorative floating circles for more visual appeal */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={`circle-${i}`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.1, scale: 1 }}
            transition={{ duration: 2, delay: i * 0.3 }}
            className="absolute border-2 border-amber-400 rounded-full"
            style={{
              width: `${Math.random() * 150 + 100}px`,
              height: `${Math.random() * 150 + 100}px`,
              top: `${Math.random() * 80 + 10}%`,
              left: `${Math.random() * 80 + 10}%`,
              animation: `float ${Math.random() * 25 + 20}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 15}s`,
            }}
          />
        ))}
      </div>
    </section>
  );
}