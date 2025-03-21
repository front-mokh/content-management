"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Submission } from "@prisma/client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import TextField from "@/components/custom/TextField";
import TextAreaField from "@/components/custom/TextAreaField";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { convertSubmissionToResource } from "@/lib/convertSubmissionToResource";
import { FileText } from "lucide-react";

const convertToResourceSchema = z.object({
  title: z.string().min(1, "Le titre est obligatoire"),
  description: z.string().min(1, "La description est obligatoire"),
  categoryId: z.string().min(1, "La catégorie est obligatoire"),
  typeId: z.string().min(1, "Le type de ressource est obligatoire"),
  authorId: z.string().optional(),
});

type ConvertToResourceInput = z.infer<typeof convertToResourceSchema>;

export default function ConvertToResourceDialog({
  open,
  onOpenChange,
  submission,
  categories,
  types,
  authors,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  submission: Submission;
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

  const form = useForm<ConvertToResourceInput>({
    resolver: zodResolver(convertToResourceSchema),
    defaultValues: {
      title: submission.author || "",
      description: submission.message || "",
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

  const onSubmit = async (values: ConvertToResourceInput) => {
    setIsSubmitting(true);
    try {
      await convertSubmissionToResource(submission.id, {
        ...values,
        path: submission.filepath
      });

      toast.success("Soumission convertie en ressource avec succès");
      onOpenChange(false);
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Erreur lors de la conversion de la soumission en ressource"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get filename from filepath
  const getFilename = (path: string) => {
    return path.split('/').pop() || path;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Convertir en ressource</DialogTitle>
          <DialogDescription>
            Complétez les informations pour convertir cette soumission en ressource
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

            <div className="p-4 border rounded-md">
              <div className="flex items-center space-x-2">
                <FileText className="h-6 w-6 text-blue-500" />
                <div>
                  <p className="text-sm font-medium">Fichier de la soumission</p>
                  <p className="text-xs text-muted-foreground">{getFilename(submission.filepath)}</p>
                </div>
              </div>
            </div>
          </form>
        </Form>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
          >
            Annuler
          </Button>
          <Button
            type="submit"
            onClick={form.handleSubmit(onSubmit)}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Conversion en cours..." : "Convertir en ressource"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}