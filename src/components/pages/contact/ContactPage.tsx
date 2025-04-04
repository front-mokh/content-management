/* eslint-disable @typescript-eslint/no-explicit-any */
// app/contact/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram } from "lucide-react";

import ContactForm from "@/components/pages/contact/ContactForm";

export default function ContactPage({ dictionary }: { dictionary: any }) {
  const [, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

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
                {dictionary.contact.hero.title}
                  <span className="absolute -bottom-1 left-0 w-full h-1 bg-amber-500 transform scale-x-0 origin-left animate-expand"></span>
                </span>{" "}
                <span className="text-amber-400">{dictionary.contact.hero.titleHighlight}</span>
              </h1>
              <p className="text-xl text-blue-100">
                {dictionary.contact.hero.description}
              </p>
            </div>
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

        {/* Contact Information Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                {dictionary.contact.infoSection.title}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-12">
                {dictionary.contact.infoSection.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Mail className="h-12 w-12 text-amber-500" />,
                  title: dictionary.contact.contactDetails.email.title,
                  detail: dictionary.contact.contactDetails.email.value,
                  href: `mailto:${dictionary.contact.contactDetails.email.value}`,
                },
                {
                  icon: <Phone className="h-12 w-12 text-amber-500" />,
                  title: dictionary.contact.contactDetails.phone.title,
                  detail: dictionary.contact.contactDetails.phone.value,
                  href: `tel:${dictionary.contact.contactDetails.phone.value.replace(/\s/g, '')}`,
                },
                {
                  icon: <MapPin className="h-12 w-12 text-amber-500" />,
                  title: dictionary.contact.contactDetails.location.title,
                  detail: dictionary.contact.contactDetails.location.value,
                  href: "#",
                },
              ].map((contact, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-r from-blue-50 to-amber-50 rounded-xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center bg-amber-50 rounded-full">
                    {contact.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{contact.title}</h3>
                  <a
                    href={contact.href}
                    className="text-gray-600 hover:text-amber-600 transition-colors"
                  >
                    {contact.detail}
                  </a>
                </div>
              ))}
            </div>

            {/* Social Media Links */}
            <div className="mt-12 flex justify-center gap-6">
              {[
                { icon: <Facebook className="h-8 w-8" />, href: dictionary.contact.socialMedia.facebook || "#" },
                { icon: <Twitter className="h-8 w-8" />, href: dictionary.contact.socialMedia.twitter || "#" },
                { icon: <Instagram className="h-8 w-8" />, href: dictionary.contact.socialMedia.instagram || "#" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="text-gray-600 hover:text-amber-500 transition-colors duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-20 bg-gradient-to-r from-blue-50 to-amber-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
                {dictionary.contact.formSection.title}
              </h2>
              <ContactForm dictionary={dictionary} />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}