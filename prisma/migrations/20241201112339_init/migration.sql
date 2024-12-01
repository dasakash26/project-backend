/*
  Warnings:

  - The values [INITIATED,IN_PROGRESS,AGREED,CANCELLED] on the enum `NegotiationStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `buyerId` on the `Negotiation` table. All the data in the column will be lost.
  - You are about to drop the column `offerId` on the `Negotiation` table. All the data in the column will be lost.
  - Added the required column `createdById` to the `Negotiation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currentTermsId` to the `Negotiation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `offeredToId` to the `Negotiation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `turn` to the `Negotiation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "NegotiationStatus_new" AS ENUM ('ACCEPTED', 'REJECTED');
ALTER TABLE "Negotiation" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Negotiation" ALTER COLUMN "status" TYPE "NegotiationStatus_new" USING ("status"::text::"NegotiationStatus_new");
ALTER TYPE "NegotiationStatus" RENAME TO "NegotiationStatus_old";
ALTER TYPE "NegotiationStatus_new" RENAME TO "NegotiationStatus";
DROP TYPE "NegotiationStatus_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Negotiation" DROP CONSTRAINT "Negotiation_buyerId_fkey";

-- DropForeignKey
ALTER TABLE "Negotiation" DROP CONSTRAINT "Negotiation_offerId_fkey";

-- AlterTable
ALTER TABLE "Negotiation" DROP COLUMN "buyerId",
DROP COLUMN "offerId",
ADD COLUMN     "createdById" TEXT NOT NULL,
ADD COLUMN     "currentTermsId" TEXT NOT NULL,
ADD COLUMN     "offeredToId" TEXT NOT NULL,
ADD COLUMN     "ongoing" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "turn" "UserRole" NOT NULL,
ALTER COLUMN "status" DROP NOT NULL,
ALTER COLUMN "status" DROP DEFAULT;

-- CreateTable
CREATE TABLE "CurrentTerms" (
    "id" TEXT NOT NULL,
    "cropName" TEXT NOT NULL,
    "description" TEXT,
    "cropType" "CropType" NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "quantity" INTEGER NOT NULL,
    "harvestTime" TIMESTAMP(3),
    "location" TEXT NOT NULL,
    "offerDuration" INTEGER NOT NULL,
    "paymentTerms" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CurrentTerms_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Negotiation" ADD CONSTRAINT "Negotiation_currentTermsId_fkey" FOREIGN KEY ("currentTermsId") REFERENCES "CurrentTerms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Negotiation" ADD CONSTRAINT "Negotiation_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Negotiation" ADD CONSTRAINT "Negotiation_offeredToId_fkey" FOREIGN KEY ("offeredToId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
