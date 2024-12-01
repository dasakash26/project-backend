/*
  Warnings:

  - Changed the type of `turn` on the `Negotiation` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Negotiation" DROP COLUMN "turn",
ADD COLUMN     "turn" TEXT NOT NULL;
