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
import { convertSubmissionToResource } from "@/lib/convertSubmissionToResource";

const conversionSchema = z.object({
  submissionId: z.string().min(1, "L'ID de soumission est obligatoire"),
  title: z.string().min(1, "Le titre est obligatoire"),
  description: z.string().min(1, "La description est obligatoire"),
  categoryId: z.string().min(1, "La catégorie est obligatoire"),
  typeId: z.string().min(1, "Le type de ressource est obligatoire"),
});

export type ConversionInput = z.infer<typeof conversionSchema>;

export default function ConvertSubmissionForm({
  submission,
  categories,
  types,
}: {
  submission: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    author: string;
    message?: string | null;
    filepath: string;
  };
  categories: { id: string; label: string }[];
  types: { id: string; label: string; categoryId: string }[];
}) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
  const [filteredTypes, setFilteredTypes] = useState<
    { id: string; label: string }[]
  >([]);

  const form = useForm<ConversionInput>({
    resolver: zodResolver(conversionSchema),
    defaultValues: {
      submissionId: submission.id,
      title: submission.author,
      description: submission.message || "",
      categoryId: "",
      typeId: "",
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

  const onSubmit = async (values: ConversionInput) => {
    setIsSubmitting(true);
    try {
      const result = await convertSubmissionToResource(values);

      if (!result.success) {
        throw new Error(result.error || "Une erreur s'est produite");
      }

      toast.success("Soumission convertie en ressource avec succès");
      router.push("/admin/resources");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Erreur lors de la conversion"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Convertir en ressource</CardTitle>
        <CardDescription>
          Convertissez cette soumission en ressource publiable
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <input type="hidden" {...form.register("submissionId")} />

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
          {isSubmitting ? "Conversion en cours..." : "Convertir en ressource"}
        </Button>
      </CardFooter>
    </Card>
  );
}