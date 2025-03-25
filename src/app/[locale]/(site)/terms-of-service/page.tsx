// app/terms-of-service/page.tsx
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function TermsOfServicePage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-blue-700 to-blue-900 py-24 overflow-hidden">
          <div className="absolute inset-0 opacity-15">
            <div className="absolute inset-0 bg-[url('/pattern-kabyle.svg')] bg-repeat opacity-20 animate-pulse"></div>
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 50 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                <span className="inline-block relative">
                  Terms of
                  <span className="absolute -bottom-1 left-0 w-full h-1 bg-amber-500 transform scale-x-0 origin-left animate-expand"></span>
                </span>{" "}
                <span className="text-amber-400">Service</span>
              </h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl text-blue-100"
              >
                Please read these terms carefully before using our platform.
              </motion.p>
            </motion.div>
          </div>

          {/* Floating decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-amber-500 opacity-10 animate-float-slow"
                style={{
                  width: `${Math.random() * 80 + 40}px`,
                  height: `${Math.random() * 80 + 40}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 10}s`,
                  animationDuration: `${Math.random() * 20 + 15}s`,
                }}
              />
            ))}
          </div>
        </section>

        {/* Terms Content Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
              className="max-w-4xl mx-auto"
            >
              <motion.div variants={itemVariants} className="space-y-12">
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Terms of Service</h2>
                  <p className="text-gray-600">Last Updated: March 24, 2025</p>
                </div>

                <div className="space-y-10 text-gray-700">
                  {/* Introduction */}
                  <div className="border-b border-gray-200 pb-6">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-3">1. Introduction</h3>
                    <p className="leading-relaxed">
                      Welcome to Tamazight Treasures ("we," "us," or "our"), a platform dedicated to preserving Kabyle cultural heritage. By accessing or using our website and services (collectively, the "Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree, please do not use our Service.
                    </p>
                  </div>

                  {/* Eligibility */}
                  <div className="border-b border-gray-200 pb-6">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-3">2. Eligibility</h3>
                    <p className="leading-relaxed">
                      You must be at least 13 years old to use our Service. By using the Service, you represent and warrant that you meet this age requirement and have the legal capacity to enter into these Terms.
                    </p>
                  </div>

                  {/* User Content */}
                  <div className="border-b border-gray-200 pb-6">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-3">3. User Content</h3>
                    <p className="leading-relaxed">
                      You may submit content such as videos, audio, images, or documents ("User Content") to our Service. By submitting User Content, you grant us a non-exclusive, worldwide, royalty-free license to use, reproduce, modify, and distribute it solely for the purpose of operating and promoting the Service. You represent that you own or have the necessary rights to submit such content and that it does not violate any laws or third-party rights.
                    </p>
                  </div>

                  {/* Acceptable Use */}
                  <div className="border-b border-gray-200 pb-6">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-3">4. Acceptable Use</h3>
                    <p className="leading-relaxed">
                      You agree not to use the Service to:
                      <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>Upload content that is illegal, harmful, offensive, or infringes on others’ rights.</li>
                        <li>Engage in any activity that disrupts or interferes with the Service.</li>
                        <li>Attempt to gain unauthorized access to our systems or data.</li>
                      </ul>
                    </p>
                  </div>

                  {/* Intellectual Property */}
                  <div className="border-b border-gray-200 pb-6">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-3">5. Intellectual Property</h3>
                    <p className="leading-relaxed">
                      All content and materials on the Service, excluding User Content, are owned by Tamazight Treasures or our licensors and are protected by copyright, trademark, and other laws. You may not reproduce, distribute, or create derivative works from our content without prior written permission.
                    </p>
                  </div>

                  {/* Termination */}
                  <div className="border-b border-gray-200 pb-6">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-3">6. Termination</h3>
                    <p className="leading-relaxed">
                      We reserve the right to suspend or terminate your access to the Service at our discretion, with or without notice, for any violation of these Terms or for any other reason we deem appropriate.
                    </p>
                  </div>

                  {/* Disclaimer of Warranties */}
                  <div className="border-b border-gray-200 pb-6">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-3">7. Disclaimer of Warranties</h3>
                    <p className="leading-relaxed">
                      The Service is provided "as is" and "as available" without warranties of any kind, express or implied, including but not limited to fitness for a particular purpose or non-infringement.
                    </p>
                  </div>

                  {/* Limitation of Liability */}
                  <div className="border-b border-gray-200 pb-6">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-3">8. Limitation of Liability</h3>
                    <p className="leading-relaxed">
                      To the fullest extent permitted by law, Tamazight Treasures shall not be liable for any indirect, incidental, or consequential damages arising from your use of the Service.
                    </p>
                  </div>

                  {/* Changes to Terms */}
                  <div className="border-b border-gray-200 pb-6">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-3">9. Changes to Terms</h3>
                    <p className="leading-relaxed">
                      We may update these Terms from time to time. The updated version will be posted on this page with a revised "Last Updated" date. Your continued use of the Service after such changes constitutes acceptance of the new Terms.
                    </p>
                  </div>

                  {/* Governing Law */}
                  <div className="border-b border-gray-200 pb-6">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-3">10. Governing Law</h3>
                    <p className="leading-relaxed">
                      These Terms shall be governed by and construed in accordance with the laws of Algeria, without regard to its conflict of law principles.
                    </p>
                  </div>

                  {/* Contact Us */}
                  <div className="pb-6">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-3">11. Contact Us</h3>
                    <p className="leading-relaxed">
                      If you have any questions about these Terms, please contact us at{" "}
                      <a
                        href="mailto:contact@tamazight-treasures.org"
                        className="text-amber-600 hover:underline transition-colors duration-200"
                      >
                        contact@tamazight-treasures.org
                      </a>.
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}