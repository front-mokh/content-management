import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

export default function ContributeCTA() {
  return (
    <div className="bg-gradient-to-r from-website-secondary/80 to-website-secondary rounded-lg overflow-hidden">
      <div className="px-6 py-8 md:py-12 md:px-12 flex flex-col md:flex-row items-center justify-between">
        <div className="text-center md:text-left mb-6 md:mb-0">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Contribute to Kabyle Heritage
          </h2>
          <p className="text-indigo-200 max-w-xl">
            Help preserve and share the richness of Kabyle culture by
            contributing your own resources to our digital library.
          </p>
        </div>

        <Button
          asChild
          size="lg"
          className="bg-website-primary hover:bg-indigo-100"
        >
          <Link href="/contribute">
            <Upload className="h-5 w-5 mr-2" />
            Contribute Now
          </Link>
        </Button>
      </div>
    </div>
  );
}
