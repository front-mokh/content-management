"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "../db";
import { Contact } from "@prisma/client";

// Define input types for creating and updating contacts
export type CreateContactInput = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  message: string;
};

export type UpdateContactInput = Partial<CreateContactInput>;

export async function createContact(data: CreateContactInput): Promise<Contact> {
  const contact = await prisma.contact.create({ data });
  revalidatePath("/admin/contact");
  return contact;
}

export async function getContactById(id: string): Promise<Contact | null> {
  return prisma.contact.findUnique({ where: { id } });
}

export async function updateContact(
  id: string,
  data: UpdateContactInput
): Promise<Contact> {
  const contact = await prisma.contact.update({ where: { id }, data });
  revalidatePath("/admin/contact");
  return contact;
}

export async function deleteContact(id: string): Promise<Contact> {
  const contact = await prisma.contact.delete({ where: { id } });
  revalidatePath("/admin/contact");
  return contact;
}

export async function getAllContacts(
  skip?: number,
  take?: number
): Promise<Contact[]> {
  return prisma.contact.findMany({
    skip,
    take,
    orderBy: { createdAt: "desc" },
  });
}

export async function getContactsCount(): Promise<number> {
  return prisma.contact.count();
}