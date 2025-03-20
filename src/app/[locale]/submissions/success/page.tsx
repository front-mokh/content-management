import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SubmissionSuccessPage() {
  return (
    <div className="container py-12 max-w-3xl mx-auto text-center">
      <div className="bg-green-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-8 w-8 text-green-500" 
          viewBox="0 0 20 20" 
          fill="currentColor"
        >
          <path 
            fillRule="evenodd" 
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
            clipRule="evenodd" 
          />
        </svg>
      </div>
      <h1 className="text-2xl font-bold mb-4">Soumission envoyée avec succès!</h1>
      <p className="text-gray-600 mb-8">
        Merci pour votre soumission. Nous l&apos;examinerons dans les plus brefs délais.
        Vous recevrez une notification par email dès que votre document aura été traité.
      </p>
      <Link href="/" passHref>
        <Button>Retour à l&apos;accueil</Button>
      </Link>
    </div>
  );
}