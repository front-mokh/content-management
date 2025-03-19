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
import { createResourceWithFile } from "@/lib/createResource";

const addResourceSchema = z.object({
  title: z.string().min(1, "Le titre est obligatoire"),
  description: z.string().min(1, "La description est obligatoire"),
  categoryId: z.string().min(1, "La catégorie est obligatoire"),
  typeId: z.string().min(1, "Le type de ressource est obligatoire"),
  authorId: z.string().optional(),
});

export type CreateResourceInput = z.infer<typeof addResourceSchema>;

export default function AddResourcePage({
  categories,
  types,
  authors,
}: {
  categories: { id: string; label: string }[];
  types: { id: string; label: string; categoryId: string }[];
  authors: { id: string; firstName: string; lastName: string }[];
}) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
  const [filteredTypes, setFilteredTypes] = useState<
    { id: string; label: string }[]
  >([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  const form = useForm<CreateResourceInput>({
    resolver: zodResolver(addResourceSchema),
    defaultValues: {
      title: "",
      description: "",
      categoryId: "",
      typeId: "",
      authorId: "",
    },
  });

  // Update filtered types when category changes
  const handleCategoryChange = (value: string) => {
    setSelectedCategoryId(value);
    form.setValue("categoryId", value);
    form.setValue("typeId", ""); // Reset type when category changes

    const filtered = types.filter((type) => type.categoryId === value);
    setFilteredTypes(filtered);
  };

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setFileError(null);
  };

  const handleFileRemove = () => {
    setSelectedFile(null);
  };

  const onSubmit = async (values: CreateResourceInput) => {
    if (!selectedFile) {
      setFileError("Le fichier est obligatoire");
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await createResourceWithFile(values, selectedFile);

      if (!result.success) {
        throw new Error(result.error || "Une erreur s'est produite");
      }

      toast.success("Ressource ajoutée avec succès");
      router.push("/admin/resources");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Erreur lors de l'ajout de la ressource"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Ajouter une nouvelle ressource</CardTitle>
        <CardDescription>
          Remplissez ce formulaire pour ajouter une nouvelle ressource à la
          bibliothèque.
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
                  defaultValue={form.getValues("categoryId")}
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
                  defaultValue={form.getValues("typeId")}
                  disabled={!selectedCategoryId || isSubmitting}
                >
                  <SelectTrigger>
                    <SelectValue
                      placeholder={
                        selectedCategoryId
                          ? "Sélectionnez un type"
                          : "Sélectionnez d'abord une catégorie"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredTypes.map((type) => (
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
                defaultValue={form.getValues("authorId")}
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
              <label className="text-sm font-medium">Fichier</label>
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
          {isSubmitting ? "Ajout en cours..." : "Ajouter la ressource"}
        </Button>
      </CardFooter>
    </Card>
  );
}
