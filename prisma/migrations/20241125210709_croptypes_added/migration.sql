-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "CropType" ADD VALUE 'BARLEY';
ALTER TYPE "CropType" ADD VALUE 'OATS';
ALTER TYPE "CropType" ADD VALUE 'SORGHUM';
ALTER TYPE "CropType" ADD VALUE 'SOYBEANS';
ALTER TYPE "CropType" ADD VALUE 'ROOTS';
ALTER TYPE "CropType" ADD VALUE 'TUBERS';
ALTER TYPE "CropType" ADD VALUE 'HERBS';
ALTER TYPE "CropType" ADD VALUE 'NUTS';
ALTER TYPE "CropType" ADD VALUE 'SPICES';
ALTER TYPE "CropType" ADD VALUE 'COTTON';
ALTER TYPE "CropType" ADD VALUE 'SUGARCANE';
ALTER TYPE "CropType" ADD VALUE 'TOBACCO';
ALTER TYPE "CropType" ADD VALUE 'COFFEE';
ALTER TYPE "CropType" ADD VALUE 'TEA';
ALTER TYPE "CropType" ADD VALUE 'FLOWERS';
