/*
  Warnings:

  - You are about to drop the column `twofaCheck` on the `Users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Users" DROP COLUMN "twofaCheck",
ADD COLUMN     "twoFaCheck" BOOLEAN NOT NULL DEFAULT false;
