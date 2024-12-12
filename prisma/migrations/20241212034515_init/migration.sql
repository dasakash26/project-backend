/*
  Warnings:

  - You are about to drop the column `buyerId` on the `requiredCrops` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "requiredCrops" DROP COLUMN "buyerId",
ADD COLUMN     "userId" TEXT[];
