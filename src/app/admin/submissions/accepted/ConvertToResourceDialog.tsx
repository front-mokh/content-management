"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Submission } from "@prisma/client";
import CustomDialog from "@/components/custom/CustomDialog";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import TextField from "@/components/custom/TextField";
import TextAreaField from "@/components/custom/TextAreaField";
import SelectField from "@/components/fields/SelectField";
import { convertSubmissionToResource } from "@/lib/services/convert-submission";
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
  trigger,
  submission,
  categories,
  types,
  authors,
}: {
  trigger: React.ReactNode;
  submission: Submission;
  categories: { id: string; label: string }[];
  types: { id: string; label: string; categoryId: string }[];
  authors: { id: string; firstName: string; lastName: string }[];
}) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
  const [filteredTypes, setFilteredTypes] = useState<
    { value: string; label: string }[]
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

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      resetForm();
    }
  };

  const resetForm = () => {
    form.reset({
      title: submission.author || "",
      description: submission.message || "",
      categoryId: "",
      typeId: "",
      authorId: "",
    });
    setSelectedCategoryId("");
    setFilteredTypes([]);
    setIsSubmitting(false);
  };

  // Watch for changes to categoryId
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "categoryId" && value.categoryId) {
        const categoryId = value.categoryId as string;
        setSelectedCategoryId(categoryId);
        
        // Filter types based on selected category
        const filtered = types
          .filter((type) => type.categoryId === categoryId)
          .map(type => ({
            value: type.id,
            label: type.label
          }));
        
        setFilteredTypes(filtered);
        
        // Reset typeId when category changes
        form.setValue("typeId", "");
      }
    });
    
    return () => subscription.unsubscribe();
  }, [form, types]);

  const onSubmit = async (values: ConvertToResourceInput) => {
    setIsSubmitting(true);
    try {
      await convertSubmissionToResource(submission.id, {
        ...values,
        path: submission.filepath
      });

      toast.success("Soumission convertie en ressource avec succès");
      handleOpenChange(false);
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

  // Prepare options for SelectField components
  const categoryOptions = categories.map(category => ({
    value: category.id,
    label: category.label
  }));

  const authorOptions = authors.map(author => ({
    value: author.id,
    label: `${author.firstName} ${author.lastName}`
  }));

  return (
    <CustomDialog
      trigger={trigger}
      title="Convertir en ressource"
      isOpen={isOpen}
      onOpenChange={handleOpenChange}
    >
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
            <SelectField
              control={form.control}
              name="categoryId"
              label="Catégorie"
              placeholder="Sélectionnez une catégorie"
              options={categoryOptions}
            />

            <SelectField
              control={form.control}
              name="typeId"
              label="Type"
              placeholder={selectedCategoryId ? "Sélectionnez un type" : "Sélectionnez d'abord une catégorie"}
              options={filteredTypes}
              disabled={!selectedCategoryId || isSubmitting}
            />
          </div>

          <SelectField
            control={form.control}
            name="authorId"
            label="Auteur (optionnel)"
            placeholder="Sélectionnez un auteur"
            options={authorOptions}
          />

          <div className="p-4 border rounded-md bg-slate-50">
            <div className="flex items-center space-x-2">
              <FileText className="h-6 w-6 text-blue-500" />
              <div>
                <p className="text-sm font-medium">Fichier de la soumission</p>
                <p className="text-xs text-muted-foreground">{getFilename(submission.filepath)}</p>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-10">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={isSubmitting}
            >
              Annuler
            </Button>
            <Button 
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Conversion en cours..." : "Convertir en ressource"}
            </Button>
          </div>
        </form>
      </Form>
    </CustomDialog>
  );
}