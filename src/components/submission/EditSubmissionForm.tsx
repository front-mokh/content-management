"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TextField from "@/components/custom/TextField";
import TextAreaField from "@/components/custom/TextAreaField";
import { FileUpload } from "@/components/custom/FileUpload";
import { updateSubmissionWithFile } from "@/lib/updateSubmission";

const editSubmissionSchema = z.object({
  id: z.string(),
  firstName: z.string().min(1, "Le prénom est obligatoire"),
  lastName: z.string().min(1, "Le nom est obligatoire"),
  email: z.string().email("L'adresse email doit être valide"),
  phone: z.string().optional(),
  message: z.string().optional(),
  author: z.string().min(1, "Le nom de l'auteur est obligatoire"),
  status: z.enum(["PENDING", "ACCEPTED", "REJECTED"]).optional(),
});

export type EditSubmissionInput = z.infer<typeof editSubmissionSchema>;

interface EditSubmissionFormProps {
  submission: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string | null;
    message?: string | null;
    filepath: string;
    author: string;
    status: "PENDING" | "ACCEPTED" | "REJECTED";
  };
}

export default function EditSubmissionForm({ submission }: EditSubmissionFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const form = useForm<EditSubmissionInput>({
    resolver: zodResolver(editSubmissionSchema),
    defaultValues: {
      id: submission.id,
      firstName: submission.firstName,
      lastName: submission.lastName,
      email: submission.email,
      phone: submission.phone || "",
      message: submission.message || "",
      author: submission.author,
      status: submission.status,
    },
  });

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
  };

  const handleFileRemove = () => {
    setSelectedFile(null);
  };

  const onSubmit = async (values: EditSubmissionInput) => {
    setIsSubmitting(true);
    try {
      const result = await updateSubmissionWithFile(
        values,
        selectedFile,
        submission.filepath
      );

      if (!result.success) {
        throw new Error(result.error || "Une erreur s'est produite");
      }

      toast.success("Soumission mise à jour avec succès");
      router.push(`/admin/submissions/${submission.id}`);
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Erreur lors de la mise à jour de la soumission"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Modifier la soumission</CardTitle>
        <CardDescription>
          Modifiez les informations de cette soumission
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <input type="hidden" {...form.register("id")} />
            <input type="hidden" {...form.register("status")} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TextField
                control={form.control}
                name="firstName"
                label="Prénom"
                placeholder="Prénom"
              />

              <TextField
                control={form.control}
                name="lastName"
                label="Nom"
                placeholder="Nom de famille"
              />
            </div>

            <TextField
              control={form.control}
              name="email"
              label="Email"
              placeholder="Email"
            />

            <TextField
              control={form.control}
              name="phone"
              label="Téléphone (optionnel)"
              placeholder="Numéro de téléphone"
            />

            <TextField
              control={form.control}
              name="author"
              label="Auteur du document"
              placeholder="Nom de l'auteur"
            />

            <TextAreaField
              control={form.control}
              name="message"
              label="Message (optionnel)"
              placeholder="Informations supplémentaires"
            />

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Document (actuel: <a href={submission.filepath} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">voir</a>)
              </label>
              <FileUpload
                onFileSelect={handleFileSelect}
                onFileRemove={handleFileRemove}
                isSubmitting={isSubmitting}
              />
              <p className="text-sm text-gray-500">Laissez vide pour conserver le fichier actuel</p>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-end gap-2"></CardFooter>