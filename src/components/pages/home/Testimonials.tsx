/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from 'react';
import { Quote, MapPin } from "lucide-react";
import { motion } from 'framer-motion';

export default function Testimonials({ dictionary }: { dictionary: any }) {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5 tracking-tight">
            <span className="text-blue-600">{dictionary.testimonials.titleHighlight}</span> {dictionary.testimonials.titlePart2}
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {dictionary.testimonials.description}
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {dictionary.testimonials.items.map((testimonial: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.2
              }}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
              className="group flex"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl flex flex-col h-full">
                <div className="flex items-start mb-6 flex-grow">
                  <Quote className="h-10 w-10 text-blue-600 mr-4 opacity-20 group-hover:opacity-40 transition-opacity flex-shrink-0" />
                  <blockquote className="text-gray-700 text-lg italic leading-relaxed flex-grow">
                    {testimonial.quote}
                  </blockquote>
                </div>
                <div className="border-t border-gray-100 pt-6 mt-auto">
                  <div className="flex items-center">
                    <div className="flex-grow">
                      <div className="font-bold text-gray-900 text-lg">{testimonial.author}</div>
                      <div className="text-sm text-gray-600">{testimonial.role}</div>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="h-4 w-4 mr-2 text-blue-500" />
                      {testimonial.location}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}