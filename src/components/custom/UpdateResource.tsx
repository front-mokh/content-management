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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileUpload } from "@/components/custom/FileUpload";
import { updateResourceWithFile } from "@/lib/updateResource";
import { FullResource } from "@/lib/types";

// Define the schema for resource update
const updateResourceSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Le titre est obligatoire"),
  description: z.string().min(1, "La description est obligatoire"),
  categoryId: z.string().min(1, "La catégorie est obligatoire"),
  typeId: z.string().min(1, "Le type de ressource est obligatoire"),
  authorId: z.string().optional(),
});

export type UpdateResourceInput = z.infer<typeof updateResourceSchema>;

export default function UpdateResourcePage({
  resource,
  categories,
  types,
  authors,
}: {
  resource: FullResource;
  categories: { id: string; label: string }[];
  types: { id: string; label: string; categoryId: string }[];
  authors: { id: string; firstName: string; lastName: string }[];
}) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  const form = useForm<UpdateResourceInput>({
    resolver: zodResolver(updateResourceSchema),
    defaultValues: {
      id: resource.id,
      title: resource.title,
      description: resource.description,
      categoryId: resource.categoryId,
      typeId: resource.typeId,
      authorId: resource.authorId || "",
    },
  });

  // Update filtered types when category changes
  const handleCategoryChange = (value: string) => {
    form.setValue("categoryId", value);
  };

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setFileError(null);
  };

  const handleFileRemove = () => {
    setSelectedFile(null);
  };

  const onSubmit = async (values: UpdateResourceInput) => {
    setIsSubmitting(true);
    try {
      // The server action now handles both the resource update and file upload if needed
      const result = await updateResourceWithFile(
        values,
        selectedFile,
        resource.path
      );

      if (!result.success) {
        throw new Error(result.error || "Une erreur s'est produite");
      }

      toast.success("Ressource mise à jour avec succès");
      router.push(`/admin/resources/${resource.id}`);
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Erreur lors de la mise à jour de la ressource"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Modifier la ressource</CardTitle>
        <CardDescription>
          Modifiez les informations de cette ressource.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <TextField
              control={form.control}
              name="title"
              label="Titre"
              placeholder="Titre de la ressource"
            />

            <TextAreaField
              control={form.control}
              name="description"
              label="Description"
              placeholder="Description détaillée de la ressource"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Catégorie</label>
                <Select
                  onValueChange={handleCategoryChange}
                  defaultValue={resource.categoryId}
                  disabled={isSubmitting}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez une catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {form.formState.errors.categoryId && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.categoryId.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Type</label>
                <Select
                  onValueChange={(value) => form.setValue("typeId", value)}
                  defaultValue={resource.typeId}
                  disabled={isSubmitting}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={"Sélectionnez un type"} />
                  </SelectTrigger>
                  <SelectContent>
                    {types.map((type) => (
                      <SelectItem key={type.id} value={type.id}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {form.formState.errors.typeId && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.typeId.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Auteur (optionnel)</label>
              <Select
                onValueChange={(value) => form.setValue("authorId", value)}
                defaultValue={resource.authorId || ""}
                disabled={isSubmitting}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez un auteur" />
                </SelectTrigger>
                <SelectContent>
                  {authors.map((author) => (
                    <SelectItem key={author.id} value={author.id}>
                      {author.firstName} {author.lastName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Fichier (optionnel)</label>
              <div className="mb-2 text-sm text-gray-500">
                Fichier actuel: {resource.path.split("/").pop()}
              </div>
              <FileUpload
                onFileSelect={handleFileSelect}
                onFileRemove={handleFileRemove}
                isSubmitting={isSubmitting}
              />
              {fileError && <p className="text-sm text-red-500">{fileError}</p>}
              <p className="text-xs text-gray-500 mt-1">
                Laissez vide pour conserver le fichier actuel
              </p>
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
          {isSubmitting ? "Mise à jour en cours..." : "Mettre à jour"}
        </Button>
      </CardFooter>
    </Card>
  );
}
