/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Type` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Type" DROP CONSTRAINT "Type_categoryId_fkey";

-- AlterTable
ALTER TABLE "Type" DROP COLUMN "categoryId";
