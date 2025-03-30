/*
  Warnings:

  - Made the column `phoneNumber` on table `Contact` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Contact" ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "phoneNumber" SET NOT NULL;
