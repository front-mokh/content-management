/* eslint-disable @typescript-eslint/no-explicit-any */
// components/ContactForm.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { createContact } from "@/lib/services/contactService";


export default function ContactForm({ dictionary }: { dictionary: any }){
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactSchema = z.object({
    firstName: z.string().min(1, dictionary.contact.form.validation.firstNameRequired),
    lastName: z.string().min(1, dictionary.contact.form.validation.lastNameRequired),
    email: z.string().email(dictionary.contact.form.validation.emailValid).optional(),
    phoneNumber: z.string().min(1, dictionary.contact.form.validation.phoneRequired),
    message: z.string().min(1, dictionary.contact.form.validation.messageRequired),
  });

  type ContactFormInput = z.infer<typeof contactSchema>;
  const form = useForm<ContactFormInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      message: "",
    },
  });

  const onSubmit = async (values: ContactFormInput) => {
    setIsSubmitting(true);
    try {
      // Using our contact service to save to database
      await createContact(values);
      toast.success(dictionary.contact.form.notifications.success);
      form.reset();
      router.refresh();
    } catch (error) {
      console.error("Error submitting contact form:", error);
      toast.error(dictionary.contact.form.notifications.error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputVariants = {
    focus: { scale: 1.02, borderColor: "#f59e0b", transition: { duration: 0.2 } },
    blur: { scale: 1, borderColor: "#e5e7eb", transition: { duration: 0.2 } },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full border border-gray-100"
    >
      <div className="text-center mb-8">
      <h3 className="text-2xl font-semibold text-gray-900">{dictionary.contact.form.subtitle}</h3>
      <p className="text-gray-500 mt-2">{dictionary.contact.form.description}</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div variants={inputVariants} whileFocus="focus" animate="blur">
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
              {dictionary.contact.form.fields.firstName.label}
              </label>
              <Input
                id="firstName"
                {...form.register("firstName")}
                placeholder="Your first name"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-0 focus:border-amber-500 transition-all duration-300 shadow-sm hover:shadow-md"
                disabled={isSubmitting}
              />
              {form.formState.errors.firstName && (
                <p className="text-sm text-red-500 mt-1">{form.formState.errors.firstName.message}</p>
              )}
            </motion.div>
            <motion.div variants={inputVariants} whileFocus="focus" animate="blur">
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
              {dictionary.contact.form.fields.lastName.label}
              </label>
              <Input
                id="lastName"
                {...form.register("lastName")}
                placeholder="Your last name"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-0 focus:border-amber-500 transition-all duration-300 shadow-sm hover:shadow-md"
                disabled={isSubmitting}
              />
              {form.formState.errors.lastName && (
                <p className="text-sm text-red-500 mt-1">{form.formState.errors.lastName.message}</p>
              )}
            </motion.div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div variants={inputVariants} whileFocus="focus" animate="blur">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              {dictionary.contact.form.fields.email.label}
              </label>
              <Input
                id="email"
                {...form.register("email")}
                placeholder="your.email@example.com"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-0 focus:border-amber-500 transition-all duration-300 shadow-sm hover:shadow-md"
                disabled={isSubmitting}
              />
              {form.formState.errors.email && (
                <p className="text-sm text-red-500 mt-1">{form.formState.errors.email.message}</p>
              )}
            </motion.div>
            <motion.div variants={inputVariants} whileFocus="focus" animate="blur">
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
              {dictionary.contact.form.fields.phoneNumber.label}
              </label>
              <Input
                id="phoneNumber"
                {...form.register("phoneNumber")}
                placeholder="Your phone number"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-0 focus:border-amber-500 transition-all duration-300 shadow-sm hover:shadow-md"
                disabled={isSubmitting}
              />
              {form.formState.errors.phoneNumber && (
                <p className="text-sm text-red-500 mt-1">{form.formState.errors.phoneNumber.message}</p>
              )}
            </motion.div>
          </div>
          <motion.div variants={inputVariants} whileFocus="focus" animate="blur">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            {dictionary.contact.form.fields.message.label}
            </label>
            <Textarea
              id="message"
              {...form.register("message")}
              placeholder="Type your message here"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-0 focus:border-amber-500 transition-all duration-300 shadow-sm hover:shadow-md min-h-[150px] resize-none"
              disabled={isSubmitting}
            />
            {form.formState.errors.message && (
              <p className="text-sm text-red-500 mt-1">{form.formState.errors.message.message}</p>
            )}
          </motion.div>
          <div className="flex justify-end gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={isSubmitting}
              className="px-6 py-2 border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400 rounded-lg transition-all duration-300 shadow-sm"
            >
              {dictionary.contact.form.buttons.cancel}
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center"
            >
              {isSubmitting ? "Sending..." : (
                <>
                   {dictionary.contact.form.buttons.submit}
                  <Send className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </motion.div>
  );
}