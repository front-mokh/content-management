/*
  Warnings:

  - You are about to drop the column `resourceId` on the `Submission` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[submissionId]` on the table `Resource` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `author` to the `Submission` table without a default value. This is not possible if the table is not empty.
  - Added the required column `filepath` to the `Submission` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Submission` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SubmissionStatus" AS ENUM ('ACCEPTED', 'PENDING', 'REJECTED');

-- DropForeignKey
ALTER TABLE "Submission" DROP CONSTRAINT "Submission_resourceId_fkey";

-- AlterTable
ALTER TABLE "Resource" ADD COLUMN     "submissionId" TEXT;

-- AlterTable
ALTER TABLE "Submission" DROP COLUMN "resourceId",
ADD COLUMN     "author" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "filepath" TEXT NOT NULL,
ADD COLUMN     "status" "SubmissionStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Resource_submissionId_key" ON "Resource"("submissionId");

-- AddForeignKey
ALTER TABLE "Resource" ADD CONSTRAINT "Resource_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "Submission"("id") ON DELETE SET NULL ON UPDATE CASCADE;
