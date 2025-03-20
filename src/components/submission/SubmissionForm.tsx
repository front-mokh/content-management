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
import { createSubmissionWithFile } from "@/lib/createSubmission";

const addSubmissionSchema = z.object({
  firstName: z.string().min(1, "Le prénom est obligatoire"),
  lastName: z.string().min(1, "Le nom est obligatoire"),
  email: z.string().email("L'adresse email doit être valide"),
  phone: z.string().optional(),
  message: z.string().optional(),
  author: z.string().min(1, "Le nom de l'auteur est obligatoire"),
});

export type CreateSubmissionInput = z.infer<typeof addSubmissionSchema>;

export default function SubmissionForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  const form = useForm<CreateSubmissionInput>({
    resolver: zodResolver(addSubmissionSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
      author: "",
    },
  });

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setFileError(null);
  };

  const handleFileRemove = () => {
    setSelectedFile(null);
  };

  const onSubmit = async (values: CreateSubmissionInput) => {
    if (!selectedFile) {
      setFileError("Le fichier est obligatoire");
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await createSubmissionWithFile(values, selectedFile);

      if (!result.success) {
        throw new Error(result.error || "Une erreur s'est produite");
      }

      toast.success("Soumission envoyée avec succès");
      form.reset();
      setSelectedFile(null);
      router.push("/submissions/success");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Erreur lors de l'envoi de la soumission"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Soumettre un document</CardTitle>
        <CardDescription>
          Remplissez ce formulaire pour soumettre votre document pour évaluation.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TextField
                control={form.control}
                name="firstName"
                label="Prénom"
                placeholder="Votre prénom"
              />

              <TextField
                control={form.control}
                name="lastName"
                label="Nom"
                placeholder="Votre nom de famille"
              />
            </div>

            <TextField
              control={form.control}
              name="email"
              label="Email"
              placeholder="votre.email@exemple.com"
            />

            <TextField
              control={form.control}
              name="phone"
              label="Téléphone (optionnel)"
              placeholder="Votre numéro de téléphone"
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
              placeholder="Informations supplémentaires concernant votre soumission"
            />

            <div className="space-y-2">
              <label className="text-sm font-medium">Document</label>
              <FileUpload
                onFileSelect={handleFileSelect}
                onFileRemove={handleFileRemove}
                isSubmitting={isSubmitting}
              />
              {fileError && <p className="text-sm text-red-500">{fileError}</p>}
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={isSubmitting}
        >
          Annuler
        </Button>
        <Button
          type="submit"
          onClick={form.handleSubmit(onSubmit)}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Envoi en cours..." : "Soumettre le document"}
        </Button>
      </CardFooter>
    </Card>
  );
}