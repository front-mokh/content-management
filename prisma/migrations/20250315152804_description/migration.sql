/*
  Warnings:

  - Added the required column `description` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Type` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "description" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Type" ADD COLUMN     "description" TEXT NOT NULL;
