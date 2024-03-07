/*
  Warnings:

  - You are about to drop the column `twoFaCheck` on the `Users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Users" DROP COLUMN "twoFaCheck",
ADD COLUMN     "Check2fa" BOOLEAN NOT NULL DEFAULT false;
