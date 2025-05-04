"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import AddButton from "@/components/custom/AddButton";
import CustomDialog from "@/components/custom/CustomDialog";
// import { FileUpload } from "./FileUpload";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import TextField from "./TextField";
import TextAreaField from "./TextAreaField";
import { toast } from "sonner";
import { createCategoryWithThumbnail } from "@/lib/services";
import { FileUpload } from "./FileUpload";

const addCategorySchema = z.object({
  label: z.string().min(1, "Le nom de la catégorie est obligatoire"),
  description: z.string().optional(),
});

export type CreateCategoryInput = z.infer<typeof addCategorySchema>;

export function AddCategoryDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      resetForm();
    }
  };

  const form = useForm<CreateCategoryInput>({
    resolver: zodResolver(addCategorySchema),
    defaultValues: {
      label: "",
      description: "",
    },
  });

  const resetForm = () => {
    form.reset({
      label: "",
      description: "",
    });
    setSelectedFile(null);
    setIsSubmitting(false);
  };

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
  };

  const handleFileRemove = () => {
    setSelectedFile(null);
  };

  const onSubmit = async (values: CreateCategoryInput) => {
    setIsSubmitting(true);
    try {
      const result = await createCategoryWithThumbnail(values, selectedFile);

      if (result.success) {
        toast.success("Catégorie ajoutée avec succès");
        handleOpenChange(false);
      } else {
        toast.error(result.error || "Erreur lors de l'ajout de la catégorie");
      }
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de l'ajout de la catégorie");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <CustomDialog
      trigger={<AddButton label="Ajouter une catégorie" />}
      title="Ajouter une catégorie"
      isOpen={isOpen}
      onOpenChange={handleOpenChange}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <TextField
            control={form.control}
            name="label"
            label="Nom de la catégorie"
            placeholder="Nom de la catégorie"
          />

          <TextAreaField
            control={form.control}
            name="description"
            label="Description (Optionnelle)"
            placeholder="Description de la catégorie"
          />

          <div className="space-y-2">
            <label className="text-sm font-medium">Image de catégorie</label>
            <FileUpload
              onFileSelect={handleFileSelect}
              onFileRemove={handleFileRemove}
              isSubmitting={isSubmitting}
            />
            <p className="text-xs text-gray-500">
              L&apos;image sera utilisée comme miniature pour cette catégorie
            </p>
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
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Ajout..." : "Ajouter"}
            </Button>
          </div>
        </form>
      </Form>
    </CustomDialog>
  );
}

export default AddCategoryDialog;
