/* eslint-disable @typescript-eslint/no-explicit-any */
// components/pages/contribution/contributionPage.tsx
"use client";

import { Upload, CheckCircle, Clock } from "lucide-react";
import SubmissionForm from "@/components/submission/SubmissionForm";

export default function ContributionPage({ dictionary }: { dictionary: any }) {
  const { contribution } = dictionary;

  const icons = [
    <Upload key="upload" className="h-12 w-12 text-amber-500" />,
    <CheckCircle key="check" className="h-12 w-12 text-amber-500" />,
    <Clock key="clock" className="h-12 w-12 text-amber-500" />
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-website-secondary to-website-secondary/90 shadow-lg py-24 overflow-hidden">
          <div className="absolute inset-0 opacity-15">
            <div className="absolute inset-0 bg-[url('/pattern-kabyle.svg')] bg-repeat opacity-20 animate-pulse"></div>
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                <span className="inline-block relative">
                  {contribution.hero.title}
                  <span className="absolute -bottom-1 left-0 w-full h-1 bg-amber-500"></span>
                </span>{" "}
                <span className="text-amber-400">{contribution.hero.titleHighlight}</span>
              </h1>
              <p className="text-xl text-blue-100">
                {contribution.hero.description}
              </p>
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
                  animation: `float ${Math.random() * 20 + 15}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 10}s`,
                }}
              />
            ))}
          </div>
        </section>

        {/* Contribution Rules Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                {contribution.howTo.title}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-12">
                {contribution.howTo.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {contribution.rules.map((rule, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-r from-blue-50 to-amber-50 rounded-xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center bg-amber-50 rounded-full">
                    {icons[index]}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{rule.title}</h3>
                  <p className="text-gray-600">{rule.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Review Process Section */}
        <section className="py-20 bg-gradient-to-r from-blue-50 to-amber-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                {contribution.review.title}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-12">
                {contribution.review.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {contribution.steps.map((process, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 relative"
                >
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 mt-6">{process.step}</h3>
                  <p className="text-gray-600">{process.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Submission Form Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
                {contribution.form.title}
              </h2>
              <div>
                <SubmissionForm dictionary={contribution} />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}