"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FileQuestion, ArrowLeft, Search, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export default function ResourceNotFound() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [animateIcon, setAnimateIcon] = useState(false);

  // Add animation effect to the icon
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimateIcon((prev) => !prev);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/resources?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="container max-w-5xl mx-auto py-16 px-4">
      <div className="bg-gradient-to-b from-blue-50 to-white rounded-2xl p-8 border border-blue-100 shadow-sm">
        <div className="flex flex-col items-center text-center">
          <div
            className={`relative w-32 h-32 mb-6 transition-all duration-500 ${
              animateIcon ? "scale-110" : "scale-100"
            }`}
          >
            <div className="absolute inset-0 bg-blue-100 rounded-full opacity-50 animate-pulse"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <FileQuestion className="h-20 w-20 text-blue-500" />
            </div>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Ressource introuvable
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mb-8">
            Désolé, nous n'avons pas pu trouver la ressource que vous cherchez.
            Elle a peut-être été supprimée ou déplacée.
          </p>

          <div className="grid gap-6 md:grid-cols-2 w-full max-w-2xl mb-8">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center text-center">
              <BookOpen className="h-10 w-10 text-blue-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                Explorer la bibliothèque
              </h3>
              <p className="text-gray-600 mb-4">
                Découvrez toutes nos ressources disponibles dans notre
                bibliothèque.
              </p>
              <Button
                variant="outline"
                className="mt-auto"
                onClick={() => router.push("/resources")}
              >
                Voir toutes les ressources
              </Button>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center text-center">
              <Search className="h-10 w-10 text-blue-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                Rechercher une ressource
              </h3>
              <p className="text-gray-600 mb-2">
                Vous cherchez quelque chose de spécifique ?
              </p>
              <form onSubmit={handleSearch} className="w-full mt-auto">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Rechercher..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Button type="submit">Rechercher</Button>
                </div>
              </form>
            </div>
          </div>

          <Link
            href="/resources"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour à la liste des ressources
          </Link>
        </div>
      </div>
    </div>
  );
}
