"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";

export default function ContributeCTA() {
  const params = useParams();
  const contributionUrl = `/${params.locale}/contribution`;

  return (
    <div className="bg-gradient-to-br from-website-secondary to-website-secondary/90 rounded-lg border border-website-primary/20 shadow-lg">
      <div className="px-6 py-8 md:py-12 md:px-12 flex flex-col  items-center justify-between">
        <h2 className="heading text-2xl md:text-3xl font-bold text-white mb-3">
          Contribute to Kabyle Heritage
        </h2>
        <p className="text-[18px] text-white/80 ">
          Help preserve and share the richness of Kabyle culture by contributing
          your own resources to our digital library.
        </p>

        <Button
          asChild
          size="lg"
          className="mt-12 bg-website-primary hover:bg-website-primary/90 text-white px-6 py-3"
        >
          <Link href={contributionUrl}>Contribute Now !</Link>
        </Button>
      </div>
    </div>
  );
}
