"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AuthorCategory } from "@prisma/client";

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
import { createAuthorWithImage } from "@/lib/createAuthorWIthImage";

// Import the utility functions
import { 
  authorCategoriesFr, 
  getAuthorCategoryOptions,
  getSortedAuthorCategoryOptions 
} from "@/lib/translations/authorCategories";

// Schema for author creation with category
const addAuthorSchema = z.object({
  firstName: z.string().min(1, "Le prénom est obligatoire"),
  lastName: z.string().min(1, "Le nom est obligatoire"),
  description: z.string().optional(),
  category: z.nativeEnum(AuthorCategory).default(AuthorCategory.ECRIVAINS),
});

export type CreateAuthorInput = z.infer<typeof addAuthorSchema>;

export default function AddAuthorPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Get sorted category options for better UX
  const categoryOptions = getSortedAuthorCategoryOptions();

  const form = useForm<CreateAuthorInput>({
    resolver: zodResolver(addAuthorSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      description: "",
      category: AuthorCategory.ECRIVAINS,
    },
  });

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
  };

  const handleFileRemove = () => {
    setSelectedFile(null);
  };

  const onSubmit = async (values: CreateAuthorInput) => {
    setIsSubmitting(true);
    try {
      console.log("Submitting values:", values); // Debug log
      
      // Call the server action
      const result = await createAuthorWithImage(values, selectedFile);
      console.log("Server action result:", result); // Debug log
      if (!result.success) {
        throw new Error(result.error || "Une erreur s'est produite");
      }

      // toast.success("Auteur ajouté avec succès");
      // router.push("/admin/authors");
      // router.refresh();
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Erreur lors de l'ajout de l'auteur"
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
            <CardTitle>Ajouter un nouvel auteur</CardTitle>
            <CardDescription>
              Remplissez ce formulaire pour ajouter un nouvel auteur
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
              <label className="text-sm font-medium">Photo de l'auteur (optionnel)</label>
              <FileUpload
                onFileSelect={handleFileSelect}
                onFileRemove={handleFileRemove}
                isSubmitting={isSubmitting}
                accept="image/*"
              />
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
              {isSubmitting ? "Ajout en cours..." : "Ajouter l'auteur"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}