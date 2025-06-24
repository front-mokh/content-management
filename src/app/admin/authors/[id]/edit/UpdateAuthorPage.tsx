"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Author, AuthorCategory } from "@prisma/client";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import TextField from "@/components/custom/TextField";
import TextAreaField from "@/components/custom/TextAreaField";
import { FileUpload } from "@/components/custom/FileUpload";
import { updateAuthorWithImage } from "@/lib/updateAuthorWithImage";

// Import the utility functions
import { 

  getSortedAuthorCategoryOptions 
} from "@/lib/translations/authorCategories";

// Schema for author update with category
const updateAuthorSchema = z.object({
  firstName: z.string().min(1, "Le prénom est obligatoire"),
  lastName: z.string().min(1, "Le nom est obligatoire"),
  description: z.string().optional(),
  category: z.nativeEnum(AuthorCategory).default(AuthorCategory.ECRIVAINS),
});

export type UpdateAuthorInput = z.infer<typeof updateAuthorSchema>;

export default function UpdateAuthorPage({ author }: { author: Author }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Get sorted category options for better UX
  const categoryOptions = getSortedAuthorCategoryOptions();

  const form = useForm<UpdateAuthorInput>({
    resolver: zodResolver(updateAuthorSchema),
    defaultValues: {
      firstName: author.firstName,
      lastName: author.lastName,
      description: author.description || "",
      category: author.category || AuthorCategory.ECRIVAINS,
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
      console.log("Submitting values:", values); // Debug log
      
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
      router.push("/admin/authors");
      router.refresh();
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
            
            {/* Fixed Category Selection Field */}
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Catégorie</FormLabel>
                  <Select 
                    onValueChange={(value) => {
                      console.log("Category changed to:", value); // Debug log
                      field.onChange(value);
                    }}
                    value={field.value} // Use value instead of defaultValue
                    disabled={isSubmitting}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner une catégorie" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categoryOptions.map(({ value, label }) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
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
                <div>
                  <p className="text-sm text-gray-500 mb-2">Image actuelle: {author.imagePath}</p>
                </div>
              )}
              <FileUpload
                onFileSelect={handleFileSelect}
                onFileRemove={handleFileRemove}
                isSubmitting={isSubmitting}
                accept="image/*"
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