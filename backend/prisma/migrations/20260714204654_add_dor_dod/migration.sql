/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Board" ADD COLUMN     "completionRate" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "isCompleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "createdAt",
ADD COLUMN     "acceptanceCriteria" TEXT,
ADD COLUMN     "businessValue" TEXT,
ADD COLUMN     "code" TEXT,
ADD COLUMN     "position" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "DoR" (
    "id" SERIAL NOT NULL,
    "taskId" INTEGER NOT NULL,
    "storyDefined" BOOLEAN NOT NULL DEFAULT false,
    "descriptionDefined" BOOLEAN NOT NULL DEFAULT false,
    "acceptanceCriteriaDefined" BOOLEAN NOT NULL DEFAULT false,
    "priorityDefined" BOOLEAN NOT NULL DEFAULT false,
    "estimated" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "DoR_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DoD" (
    "id" SERIAL NOT NULL,
    "taskId" INTEGER NOT NULL,
    "developmentCompleted" BOOLEAN NOT NULL DEFAULT false,
    "acceptanceValidated" BOOLEAN NOT NULL DEFAULT false,
    "testsPassed" BOOLEAN NOT NULL DEFAULT false,
    "codeReviewed" BOOLEAN NOT NULL DEFAULT false,
    "documentationUpdated" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "DoD_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DoR_taskId_key" ON "DoR"("taskId");

-- CreateIndex
CREATE UNIQUE INDEX "DoD_taskId_key" ON "DoD"("taskId");

-- AddForeignKey
ALTER TABLE "DoR" ADD CONSTRAINT "DoR_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DoD" ADD CONSTRAINT "DoD_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;
