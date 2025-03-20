"use server";

import { PrismaClient, ResourceStatus, SubmissionStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const prisma = new PrismaClient();

const conversionSchema = z.object({
  submissionId: z.string().min(1, "L'ID de soumission est obligatoire"),
  title: z.string().min(1, "Le titre est obligatoire"),
  description: z.string().min(1, "La description est obligatoire"),
  categoryId: z.string().min(1, "La catégorie est obligatoire"),
  typeId: z.string().min(1, "Le type de ressource est obligatoire"),
});

export type ConversionInput = z.infer<typeof conversionSchema>;

export async function convertSubmissionToResource(data: ConversionInput) {
  try {
    const validatedData = conversionSchema.parse(data);

    // Get the submission
    const submission = await prisma.submission.findUnique({
      where: { id: validatedData.submissionId },
    });

    if (!submission) {
      return {
        success: false,
        error: "Soumission introuvable",
      };
    }

    // Create a new resource from the submission in a transaction
    const result = await prisma.$transaction(async (tx) => {
      // Create the resource
      const resource = await tx.resource.create({
        data: {
          title: validatedData.title,
          description: validatedData.description,
          path: submission.filepath,
          status: ResourceStatus.UNPUBLISHED,
          views: 0,
          upvotes: 0,
          category: {
            connect: { id: validatedData.categoryId },
          },
          type: {
            connect: { id: validatedData.typeId },
          },
          submission: {
            connect: { id: submission.id },
          },
        },
      });

      // Update the submission status
      await tx.submission.update({
        where: { id: submission.id },
        data: { status: SubmissionStatus.ACCEPTED },
      });

      return resource;
    });

    revalidatePath("/admin/submissions/pending");
    revalidatePath("/admin/submissions/accepted");
    revalidatePath("/admin/resources");

    return { success: true, data: result };
  } catch (error) {
    console.error("Error converting submission to resource:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Une erreur s'est produite lors de la conversion",
    };
  }
}