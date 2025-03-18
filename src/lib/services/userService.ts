"use server";
import { prisma } from "../db";
import { CreateUserInput, UpdateUserInput } from "../db/schema";
import { User, Resource } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function createUser(data: CreateUserInput): Promise<User> {
  const user = await prisma.user.create({ data });
  revalidatePath("/admin/users");
  return user;
}

export async function getUserById(id: string): Promise<User | null> {
  return prisma.user.findUnique({ where: { id } });
}

export async function getUserByUsername(
  username: string
): Promise<User | null> {
  return prisma.user.findUnique({ where: { username } });
}

export async function updateUser(
  id: string,
  data: UpdateUserInput
): Promise<User> {
  const user = await prisma.user.update({ where: { id }, data });
  revalidatePath("/admin/users");
  return user;  
}


export async function deleteUser(id: string): Promise<User> {
  const user = await prisma.user.delete({ where: { id } });
  revalidatePath("/admin/users");
  return user;
}

export async function getAllUsers(
  skip?: number,
  take?: number
): Promise<User[]> {
  return prisma.user.findMany({
    skip,
    take,
    orderBy: { username: "asc" },
  });
}

export async function getUserResources(userId: string): Promise<Resource[]> {
  return prisma.resource.findMany({
    where: { handlerId: userId },
  });
}
