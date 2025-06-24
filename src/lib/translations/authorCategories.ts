// lib/translations/authorCategories.ts

import { AuthorCategory } from "@prisma/client";

// French translations for author categories
export const authorCategoriesFr: Record<AuthorCategory, string> = {
  [AuthorCategory.ECRIVAINS]: "Écrivains",
  [AuthorCategory.POETES]: "Poètes",
  [AuthorCategory.CHANTEURS]: "Chanteurs",
  [AuthorCategory.PERSONNAGES_DE_GUERRES]: "Personnages de guerres",
  [AuthorCategory.PERSONNAGES_LEGENDS]: "Personnages légendaires",

};

// Utility functions for working with author categories

/**
 * Get French translation for an author category
 */
export function getAuthorCategoryLabel(category: AuthorCategory): string {
  return authorCategoriesFr[category] || category;
}

/**
 * Get all author categories as options for dropdowns
 */
export function getAuthorCategoryOptions() {
  return Object.entries(authorCategoriesFr).map(([value, label]) => ({
    value: value as AuthorCategory,
    label,
  }));
}

/**
 * Get author category enum value from French label
 */
export function getAuthorCategoryFromLabel(label: string): AuthorCategory | null {
  const entry = Object.entries(authorCategoriesFr).find(([_, frenchLabel]) => frenchLabel === label);
  return entry ? (entry[0] as AuthorCategory) : null;
}

/**
 * Check if a string is a valid author category
 */
export function isValidAuthorCategory(category: string): category is AuthorCategory {
  return Object.values(AuthorCategory).includes(category as AuthorCategory);
}

/**
 * Get all author categories as an array
 */
export function getAllAuthorCategories(): AuthorCategory[] {
  return Object.values(AuthorCategory);
}

/**
 * Sort categories alphabetically by French label
 */
export function getSortedAuthorCategoryOptions() {
  return getAuthorCategoryOptions().sort((a, b) => a.label.localeCompare(b.label, 'fr'));
}