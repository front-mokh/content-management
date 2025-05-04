// components/pages/authors/static-featured-author-hero.tsx
import Image from "next/image";
import { motion } from "framer-motion";

export function StaticFeaturedAuthorHero({
  dictionary,
  locale,
}: {
  dictionary: any;
  locale: string;
}) {
  return (
    <section className="relative bg-gradient-to-br from-website-secondary to-website-secondary/90 shadow-lg py-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-15">
        <div className="absolute inset-0 bg-[url('/pattern-kabyle.svg')] bg-repeat opacity-20 animate-pulse"></div>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Hero Image */}
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="relative rounded-2xl overflow-hidden shadow-2xl"
            >
              <div className="aspect-[16/9] relative">
                <Image
                   src="/author_image.png"
                  alt="Tamazight Authors"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </motion.div>
          </div>
          {/* Hero Content */}
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-white"
            >
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                {dictionary.authors.pageTitle}
              </h1>
              <p className="text-lg text-blue-100 mb-8 leading-relaxed">
                {dictionary.authors.allAuthorsDescription}
              </p>
              <p className="text-lg text-blue-100 mb-8 leading-relaxed">
                {dictionary.authors.heroDescription ||
                  "Meet the talented authors who contribute to preserving and sharing Tamazight culture through their writings, research, and creative work."}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
      {/* Floating decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-amber-500 opacity-10"
            style={{
              width: `${Math.random() * 80 + 40}px`,
              height: `${Math.random() * 80 + 40}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${
                Math.random() * 20 + 15
              }s ease-in-out infinite`,
              animationDelay: `${Math.random() * 10}s`,
            }}
          />
        ))}
      </div>
    </section>
  );
}