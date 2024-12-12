-- CreateTable
CREATE TABLE "requiredCrops" (
    "id" TEXT NOT NULL,
    "cropName" TEXT NOT NULL,
    "buyerId" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "requiredCrops_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "requiredCrops_cropName_key" ON "requiredCrops"("cropName");
