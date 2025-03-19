"use client";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const NotFoundPage = () => {
  const router = useRouter();

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50/40 via-gray-100/40 to-gray-200/40 dark:from-gray-900 dark:via-gray-800 dark:to-gray-950">
      {/* Main content container with glass effect */}
      <div className="relative z-10 w-full max-w-2xl mx-auto px-8 py-12 text-center">
        <div className="p-8 rounded-2xl bg-white/10 dark:bg-black/10 backdrop-blur-sm border border-gray-200/20 dark:border-gray-800/20 shadow-2xl">
          {/* 404 heading with animated bounce */}
          <div className="relative mb-8">
            <h1 className="text-8xl md:text-9xl font-extrabold tracking-tighter bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400 bg-clip-text text-transparent animate-bounce">
              404
            </h1>
            {/* Glowing line under 404 */}
            <div className="absolute -bottom-4 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500 dark:via-blue-400 to-transparent" />
          </div>

          {/* Error message and description */}
          <div className="space-y-4 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
              Page non trouvée
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-md mx-auto">
              La page que vous cherchez semble avoir supprimée ou déplacée
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button
              variant="default"
              onClick={() => router.push("/admin")}
              className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 dark:from-blue-500 dark:to-violet-500 transition-all duration-200 ease-in-out"
            >
              <Home className="mr-2 w-4 h-4" />
              Accueil
            </Button>

            <Button
              variant="default"
              onClick={() => router.back()}
              className="w-full sm:w-auto  dark:border-gray-700 dark:hover:bg-gray-500 transition-all duration-200"
            >
              <ArrowLeft className="mr-2 w-4 h-4" />
              Retour
            </Button>
          </div>
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10">
        {/* Top left decorative circle */}
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-blue-500/10 dark:bg-blue-400/10 rounded-full blur-3xl" />

        {/* Bottom right decorative circle */}
        <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-violet-500/10 dark:bg-violet-400/10 rounded-full blur-3xl" />
      </div>
    </div>
  );
};

export default NotFoundPage;
