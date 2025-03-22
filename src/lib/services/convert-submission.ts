"use server";

import { prisma } from "../db";

type ConvertToResourceInput = {
  title: string;
  description: string;
  categoryId: string;
  typeId: string;
  authorId?: string;
  path: string;
};

export async function convertSubmissionToResource(
  submissionId: string,
  data: ConvertToResourceInput
) {
  // Validate that the submission exists
  const submission = await prisma.submission.findUnique({
    where: { id: submissionId },
  });

  if (!submission) {
    throw new Error("Soumission introuvable");
  }

  // Validate that the category exists
  const category = await prisma.category.findUnique({
    where: { id: data.categoryId },
  });

  if (!category) {
    throw new Error("Catégorie introuvable");
  }

  // Validate that the type exists
  const type = await prisma.type.findUnique({
    where: { id: data.typeId },
  });

  if (!type) {
    throw new Error("Type de ressource introuvable");
  }

  // Validate that the author exists if provided
  if (data.authorId) {
    const author = await prisma.author.findUnique({
      where: { id: data.authorId },
    });

    if (!author) {
      throw new Error("Auteur introuvable");
    }
  }

  // Use a transaction to ensure both operations succeed or fail together
  return prisma.$transaction(async (tx) => {
    // Create a resource from the submission
    const resource = await tx.resource.create({
      data: {
        title: data.title,
        description: data.description,
        categoryId: data.categoryId,
        typeId: data.typeId,
        authorId: data.authorId || null,
        path: data.path,
        submissionId: submissionId,
        status: "UNPUBLISHED",
      },
    });

    // Update submission status to CONVERTED
    await tx.submission.update({
      where: { id: submissionId },
      data: { status: "CONVERTED" },
    });

    return resource;
  });
}