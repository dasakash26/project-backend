-- CreateEnum
CREATE TYPE "FarmingType" AS ENUM ('CONVENTIONAL', 'ORGANIC', 'OTHER');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "addressId" TEXT,
ADD COLUMN     "farmDetailsId" TEXT,
ADD COLUMN     "paymentDetailsId" TEXT;

-- CreateTable
CREATE TABLE "Address" (
    "id" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "district" TEXT,
    "place" TEXT,
    "pin" TEXT,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FarmDetails" (
    "id" TEXT NOT NULL,
    "farmSize" DOUBLE PRECISION NOT NULL,
    "farmingType" "FarmingType" NOT NULL,
    "irrigationMethods" TEXT[],
    "userId" TEXT NOT NULL,

    CONSTRAINT "FarmDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentPreferences" (
    "id" TEXT NOT NULL,
    "paymentTerms" TEXT NOT NULL,
    "accountHolderName" TEXT NOT NULL,
    "accountNumber" TEXT NOT NULL,
    "ifscCode" TEXT NOT NULL,
    "upiId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PaymentPreferences_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FarmDetails_userId_key" ON "FarmDetails"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "PaymentPreferences_userId_key" ON "PaymentPreferences"("userId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FarmDetails" ADD CONSTRAINT "FarmDetails_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentPreferences" ADD CONSTRAINT "PaymentPreferences_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
