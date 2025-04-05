"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useParams } from "next/navigation";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function SubmissionSuccessPage({ dictionary }: { dictionary: any }) {
  const params = useParams();
  const locale = params.locale || "en";
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-b from-white to-green-50 px-4">
      <div className="text-center max-w-4xl mx-auto">
        <div className="bg-green-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-8 shadow-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-green-600"
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
        <h1 className="text-4xl font-bold mb-6 text-gray-800">
          {dictionary.submission.success.title}
        </h1>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          {dictionary.submission.success.message}
        </p>
        <Link href={`/${locale}/home`} passHref>
          <Button className="px-8 py-6 text-lg rounded-lg">
            {dictionary.submission.success.buttonText}
          </Button>
        </Link>
      </div>
    </div>
  );
}