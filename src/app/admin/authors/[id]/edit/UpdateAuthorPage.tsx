"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Author } from "@prisma/client";
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
import { updateAuthorWithImage } from "@/lib/updateAuthorWithImage";
import Image from "next/image";

// Schema for author update
const updateAuthorSchema = z.object({
  firstName: z.string().min(1, "Le prénom est obligatoire"),
  lastName: z.string().min(1, "Le nom est obligatoire"),
  description: z.string().optional(),
});

export type UpdateAuthorInput = z.infer<typeof updateAuthorSchema>;

export default function UpdateAuthorPage({ author }: { author: Author }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const form = useForm<UpdateAuthorInput>({
    resolver: zodResolver(updateAuthorSchema),
    defaultValues: {
      firstName: author.firstName,
      lastName: author.lastName,
      description: author.description || "",
    },
  });

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
  };

  const handleFileRemove = () => {
    setSelectedFile(null);
  };

  const onSubmit = async (values: UpdateAuthorInput) => {
    setIsSubmitting(true);
    try {
      // Call the server action
      const result = await updateAuthorWithImage(
        author.id,
        values,
        selectedFile,
        author.imagePath || undefined
      );

      if (!result.success) {
        throw new Error(result.error || "Une erreur s'est produite");
      }
      toast.success("Auteur mis à jour avec succès");
      router.push("/admin/authors"); // Redirect to the authors list
      router.refresh(); // Ensure the list page data is refreshed
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Erreur lors de la mise à jour de l'auteur"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="h-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col h-full"
        >
          <CardHeader>
            <CardTitle>Modifier l&apos;auteur</CardTitle>
            <CardDescription>
              Modifiez les informations de cet auteur.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 flex-grow">
            <TextField
              control={form.control}
              name="firstName"
              label="Prénom"
              placeholder="Prénom de l'auteur"
              disabled={isSubmitting}
            />
            <TextField
              control={form.control}
              name="lastName"
              label="Nom"
              placeholder="Nom de l'auteur"
              disabled={isSubmitting}
            />
            <TextAreaField
              control={form.control}
              name="description"
              label="Biographie (optionnel)"
              placeholder="Détails biographiques de l'auteur"
              disabled={isSubmitting}
            />
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Photo de l&apos;auteur (optionnel)
              </label>
              {author.imagePath && (
                <div >
                  <p className="text-sm text-gray-500 mb-2">Image actuelle: {author.imagePath}</p>
                 
                </div>
              )}
              <FileUpload
                onFileSelect={handleFileSelect}
                onFileRemove={handleFileRemove}
                isSubmitting={isSubmitting}
                
              />
              <p className="text-xs text-gray-500 mt-1">
                Laissez vide pour conserver l&apos;image actuelle
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2 border-t pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={isSubmitting}
            >
              Annuler
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Mise à jour en cours..." : "Mettre à jour"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}