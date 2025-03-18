import { Author, Category, Resource, Type, User } from "@prisma/client";

export type FullResource = Resource & {
  category: Category;
  type: Type;
  author: Author | null;
  handler: User | null;
};
