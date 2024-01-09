/*
  Warnings:

  - A unique constraint covering the columns `[userName]` on the table `Users` will be added. If there are existing duplicate values, this will fail.
  - Made the column `userName` on table `Users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "userName" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Users_userName_key" ON "Users"("userName");
