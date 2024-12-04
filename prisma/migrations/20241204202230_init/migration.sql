/*
  Warnings:

  - A unique constraint covering the columns `[currentTermsId]` on the table `Negotiation` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Negotiation_currentTermsId_key" ON "Negotiation"("currentTermsId");
