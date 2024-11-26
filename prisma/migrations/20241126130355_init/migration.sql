/*
  Warnings:

  - Changed the type of `offerDuration` on the `Offer` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Offer" DROP COLUMN "offerDuration",
ADD COLUMN     "offerDuration" INTEGER NOT NULL;
