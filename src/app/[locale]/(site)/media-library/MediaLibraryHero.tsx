"use client";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import SearchBar from "./SearchBar";

interface MediaLibraryHeroProps {
  dictionary: any;
  locale: string;
}

export default function MediaLibraryHero({ dictionary, locale }: MediaLibraryHeroProps) {
  return (
    <>
      <section className="relative bg-[url('/new_hero2.png')] bg-cover bg-center bg-no-repeat rounded-2xl overflow-hidden mb-16 shadow-2xl border border-amber-900/20">
        {/* Sophisticated gradient overlay */}
        {/* <div className="absolute inset-0 bg-gradient-to-br from-amber-900/85 via-orange-900/75 to-red-900/80"></div> */}
        <div className="absolute inset-0 bg-black/50"></div>
    
        {/* Subtle cultural pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/pattern-kabyle.svg')] bg-repeat-x bg-bottom opacity-30"></div>
        </div>
        
        {/* Elegant geometric accents */}
        <div className="absolute top-12 right-12 w-20 h-20 border-2 border-amber-400/40 rounded-lg rotate-45 opacity-60"></div>
        <div className="absolute bottom-12 left-12 w-16 h-16 border-2 border-orange-400/30 rounded-full opacity-50"></div>
        <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-amber-400/60 rounded-full"></div>
        <div className="absolute top-1/3 left-1/4 w-1 h-1 bg-orange-400/50 rounded-full"></div>

        <div className="relative z-10 text-center py-24 px-8 md:py-32 md:px-16">
          {/* Premium Typography Section */}
          <div className="mb-16">
            <h1 className="text-white text-5xl md:text-6xl lg:text-7xl font-black mb-8 leading-tight tracking-tight drop-shadow-2xl">
              <span className="bg-gradient-to-r from-white via-amber-100 to-white bg-clip-text text-transparent">
                {dictionary.mediaLibrary.title}
              </span>
            </h1>
            
            {/* Sophisticated divider */}
            <div className="flex items-center justify-center mb-8">
              <div className="w-8 h-px bg-gradient-to-r from-transparent to-amber-400"></div>
              <div className="w-3 h-3 bg-amber-400 rounded-full mx-4 shadow-lg"></div>
              <div className="w-16 h-px bg-gradient-to-r from-amber-400 to-orange-400"></div>
              <div className="w-3 h-3 bg-orange-400 rounded-full mx-4 shadow-lg"></div>
              <div className="w-8 h-px bg-gradient-to-r from-orange-400 to-transparent"></div>
            </div>
            
            <p className="text-amber-50 text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed font-light tracking-wide drop-shadow-lg">
              {dictionary.mediaLibrary.description}
            </p>
          </div>

          {/* Native-Looking Search Bar */}
          <div className="max-w-3xl mx-auto">
            <div className="relative group">
              {/* Glowing background effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
              
              {/* Main search container */}
              <div className="relative bg-gradient-to-br from-amber-900/40 via-orange-900/30 to-red-900/40 backdrop-blur-xl rounded-2xl border border-amber-400/30 shadow-2xl p-8">
                {/* Inner glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-orange-500/10 rounded-2xl"></div>
                
                {/* Search content */}
                <div className="relative">
                  <Suspense fallback={
                    <div className="flex items-center space-x-4">
                      <Skeleton className="h-14 flex-1 rounded-xl bg-amber-800/30" />
                      <Skeleton className="h-14 w-32 rounded-xl bg-orange-800/30" />
                    </div>
                  }>
                    <div className="search-bar-wrapper">
                      <SearchBar dictionary={dictionary} />
                    </div>
                  </Suspense>
                </div>
                
                {/* Decorative corner elements */}
                <div className="absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 border-amber-400/40 rounded-tl-lg"></div>
                <div className="absolute top-2 right-2 w-6 h-6 border-r-2 border-t-2 border-amber-400/40 rounded-tr-lg"></div>
                <div className="absolute bottom-2 left-2 w-6 h-6 border-l-2 border-b-2 border-orange-400/40 rounded-bl-lg"></div>
                <div className="absolute bottom-2 right-2 w-6 h-6 border-r-2 border-b-2 border-orange-400/40 rounded-br-lg"></div>
              </div>
            </div>
          </div>
          
          {/* Elegant bottom accent */}
          <div className="mt-12 flex justify-center items-center">
            <div className="w-3 h-3 bg-amber-400/60 rounded-full"></div>
            <div className="w-24 h-px bg-gradient-to-r from-amber-400/60 to-orange-400/60 mx-4"></div>
            <div className="w-2 h-2 bg-orange-400/60 rounded-full"></div>
            <div className="w-24 h-px bg-gradient-to-r from-orange-400/60 to-amber-400/60 mx-4"></div>
            <div className="w-3 h-3 bg-amber-400/60 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Enhanced search bar styles */}
      <style jsx>{`
        .search-bar-wrapper :global(input) {
          background: rgba(251, 191, 36, 0.1) !important;
          border: 2px solid rgba(251, 191, 36, 0.3) !important;
          color: white !important;
          font-size: 1.125rem !important;
          font-weight: 500 !important;
          padding: 1rem 1.5rem !important;
          border-radius: 0.75rem !important;
          backdrop-filter: blur(10px) !important;
          transition: all 0.3s ease !important;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3) !important;
        }
        
        .search-bar-wrapper :global(input:focus) {
          background: rgba(251, 191, 36, 0.15) !important;
          border-color: rgba(251, 191, 36, 0.6) !important;
          outline: none !important;
          box-shadow: 0 0 0 4px rgba(251, 191, 36, 0.2), 0 10px 25px rgba(0, 0, 0, 0.3) !important;
          transform: translateY(-1px) !important;
        }
        
        .search-bar-wrapper :global(input::placeholder) {
          color: rgba(251, 191, 36, 0.7) !important;
          font-weight: 400 !important;
        }
        
        .search-bar-wrapper :global(button) {
          background: linear-gradient(135deg, #f59e0b, #ea580c) !important;
          color: white !important;
          font-weight: 600 !important;
          padding: 1rem 2rem !important;
          border-radius: 0.75rem !important;
          border: none !important;
          box-shadow: 0 4px 15px rgba(245, 158, 11, 0.4) !important;
          transition: all 0.3s ease !important;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3) !important;
        }
        
        .search-bar-wrapper :global(button:hover) {
          background: linear-gradient(135deg, #ea580c, #dc2626) !important;
          transform: translateY(-2px) !important;
          box-shadow: 0 6px 20px rgba(245, 158, 11, 0.6) !important;
        }
        
        .search-bar-wrapper :global(button:active) {
          transform: translateY(0) !important;
        }
      `}</style>
    </>
  );
}