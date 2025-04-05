"use server";

import { prisma } from "../db";
import { auth } from "../../../auth";

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
  // Get the current user session
  const session = await auth();
  
  // Check if user is authenticated
  if (!session?.user?.id) {
    throw new Error("Vous devez être connecté pour effectuer cette action");
  }
  
  const userId = session.user.id;

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
        handlerId: userId, // Add the current user as handler
        status: "UNPUBLISHED",
        views: 0,
        upvotes: 0,
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
