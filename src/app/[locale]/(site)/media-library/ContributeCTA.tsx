"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ContributeCTA({ dictionary }: { dictionary: any }) {
  const params = useParams();
  const contributionUrl = `/${params.locale}/contribution`;

  return (
    <div className="bg-gradient-to-br from-website-secondary to-website-secondary/90 rounded-lg border border-website-primary/20 shadow-lg">
      <div className="px-6 py-8 md:py-12 md:px-12 flex flex-col  items-center justify-between">
        <h2 className="heading text-2xl md:text-3xl font-bold text-white mb-3">
          {dictionary.contributeCTA.title}
        </h2>
        <p className="text-[18px] text-white/80 ">
          {dictionary.contributeCTA.description}
        </p>

        <Button
          asChild
          size="lg"
          className="mt-12 bg-website-primary hover:bg-website-primary/90 text-white px-6 py-3"
        >
          <Link href={contributionUrl}>{dictionary.contributeCTA.button}</Link>
        </Button>
      </div>
    </div>
  );
}
