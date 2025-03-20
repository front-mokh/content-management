"use server";
import { prisma } from "../db";
import { CreateUserInput, UpdateUserInput } from "../db/schema";
import { User, Resource } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { hash } from "bcrypt";



export async function createUser(data: CreateUserInput) {
 
  const hashedPassword = await hash(data.password, 10);
  
  console.log("data",data);
  const user = await prisma.user.create({
    data: {
      email: data.email,
      firstName: data.firstName, 
      lastName: data.lastName,   
      password: hashedPassword
    }
  });
  revalidatePath("/admin/users");
  return user;
}

export async function getUserById(id: string): Promise<User | null> {
  return prisma.user.findUnique({ where: { id } });
}

export async function getUserByEmail(
  email: string
): Promise<User | null> {
  return prisma.user.findUnique({ where: { email } });
}

export async function updateUser(
  id: string,
  data: UpdateUserInput
): Promise<User> {
  const user = await prisma.user.update({
    where: { id },
    data: {
      // Include all updatable fields
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      // Add password update if needed (ensure to hash if updating)
    }
  });
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
    orderBy: { email: "asc" },
  });
}

export async function getUserResources(userId: string): Promise<Resource[]> {
  return prisma.resource.findMany({
    where: { handlerId: userId },
  });
}