"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import CustomDialog from "@/components/custom/CustomDialog";
// import { FileUpload } from "./FileUpload";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import TextField from "./TextField";
import TextAreaField from "./TextAreaField";
import { toast } from "sonner";
import { updateCategoryWithThumbnail } from "@/lib/services";
import { Category } from "@prisma/client";
import { FileUpload } from "./FileUpload";

const updateCategorySchema = z.object({
  label: z.string().min(1, "Le nom de la catégorie est obligatoire"),
  description: z.string().optional(),
});

export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;

interface UpdateCategoryDialogProps {
  trigger: React.ReactNode;
  category: Category;
}

export function UpdateCategoryDialog({
  trigger,
  category: categoryData,
}: UpdateCategoryDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [thumbnailToDisplay, setThumbnailToDisplay] = useState<string | null>(
    categoryData.thumbnail || null
  );
  const [shouldRemoveThumbnail, setShouldRemoveThumbnail] = useState(false);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      resetForm();
    }
  };

  const form = useForm<UpdateCategoryInput>({
    resolver: zodResolver(updateCategorySchema),
    defaultValues: {
      label: categoryData.label,
      description: categoryData.description,
    },
  });

  useEffect(() => {
    if (categoryData) {
      form.reset({
        label: categoryData.label,
        description: categoryData.description,
      });
      setThumbnailToDisplay(categoryData.thumbnail || null);
      setShouldRemoveThumbnail(false);
    }
  }, [categoryData, form]);

  const resetForm = () => {
    form.reset({
      label: categoryData.label,
      description: categoryData.description,
    });
    setSelectedFile(null);
    setThumbnailToDisplay(categoryData.thumbnail || null);
    setShouldRemoveThumbnail(false);
    setIsSubmitting(false);
  };

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setShouldRemoveThumbnail(false);
    // Create a temporary URL to display the selected file
    setThumbnailToDisplay(URL.createObjectURL(file));
  };

  const handleFileRemove = () => {
    setSelectedFile(null);
    setThumbnailToDisplay(null);
    setShouldRemoveThumbnail(true);
  };

  const onSubmit = async (values: UpdateCategoryInput) => {
    setIsSubmitting(true);
    try {
      const result = await updateCategoryWithThumbnail(
        categoryData.id,
        values,
        selectedFile,
        shouldRemoveThumbnail ? null : categoryData.thumbnail || null
      );

      if (result.success) {
        toast.success("Catégorie mise à jour avec succès");
        handleOpenChange(false);
      } else {
        toast.error(
          result.error || "Erreur lors de la mise à jour de la catégorie"
        );
      }
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de la mise à jour de la catégorie");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getApiPath = (path: string) => {
    // Extract the filename from the original path
    const filename = path.split("/").pop();
    // Return the API path
    return `/api/uploads/${filename}`;
  };

  return (
    <CustomDialog
      trigger={trigger}
      title="Modifier la catégorie"
      isOpen={isOpen}
      onOpenChange={handleOpenChange}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
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
            rows={3}
          />

          <div className="space-y-2">
            <label className="text-sm font-medium">Image de catégorie</label>

            {thumbnailToDisplay && !shouldRemoveThumbnail ? (
              <div className="mb-2">
                <div className="relative rounded-md overflow-hidden border border-gray-200">
                  <img
                    src={
                      selectedFile
                        ? thumbnailToDisplay
                        : getApiPath(categoryData.thumbnail)
                    }
                    alt="Miniature"
                    className="w-full h-auto max-h-32 object-cover"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={handleFileRemove}
                    className="absolute top-2 right-2"
                    disabled={isSubmitting}
                  >
                    Supprimer
                  </Button>
                </div>
              </div>
            ) : (
              <FileUpload
                onFileSelect={handleFileSelect}
                onFileRemove={handleFileRemove}
                isSubmitting={isSubmitting}
              />
            )}

            <p className="text-xs text-gray-500">
              L&apos;image sera utilisée comme miniature pour cette catégorie
            </p>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={isSubmitting}
            >
              Annuler
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Mise à jour..." : "Mettre à jour"}
            </Button>
          </div>
        </form>
      </Form>
    </CustomDialog>
  );
}

export default UpdateCategoryDialog;
