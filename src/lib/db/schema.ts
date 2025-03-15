import {
  User,
  Author,
  Type,
  Category,
  Resource,
  Submission,
  Status,
} from "@prisma/client";

// Types for create operations (omitting auto-generated fields)
export type CreateUserInput = Omit<User, "id" | "createdAt" | "updatedAt">;
export type CreateAuthorInput = Omit<Author, "id" | "createdAt" | "updatedAt">;
export type CreateTypeInput = Omit<Type, "id">;
export type CreateCategoryInput = Omit<
  Category,
  "id" | "createdAt" | "updatedAt"
>;
export type CreateResourceInput = Omit<
  Resource,
  "id" | "submittedAt" | "views" | "upvotes" | "status"
> & {
  status?: Status;
};
export type CreateSubmissionInput = Omit<Submission, "id">;

// Types for update operations
export type UpdateUserInput = Partial<
  Omit<User, "id" | "createdAt" | "updatedAt">
>;
export type UpdateAuthorInput = Partial<
  Omit<Author, "id" | "createdAt" | "updatedAt">
>;
export type UpdateTypeInput = Partial<Omit<Type, "id">>;
export type UpdateCategoryInput = Partial<Omit<Category, "id">>;
export type UpdateResourceInput = Partial<Omit<Resource, "id" | "submittedAt">>;
export type UpdateSubmissionInput = Partial<Omit<Submission, "id">>;

// Query filters
export interface ResourceFilters {
  categoryId?: string;
  typeId?: string;
  authorId?: string;
  handlerId?: string;
  status?: Status;
}
