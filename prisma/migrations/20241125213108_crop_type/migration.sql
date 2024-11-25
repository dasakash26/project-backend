/*
  Warnings:

  - The values [VEGETABLES,CEREALS,ROOTS,TUBERS,HERBS,FRUITS,NUTS,SPICES,SUGARCANE,COFFEE,TEA] on the enum `CropType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "CropType_new" AS ENUM ('VEGETABLE', 'PULSE', 'CEREAL', 'ROOT', 'TUBER', 'HERB', 'FRUIT', 'NUT', 'SPICE', 'COTTON', 'TOBACCO', 'BEVERAGE', 'FLOWERS');
ALTER TABLE "Offer" ALTER COLUMN "cropType" TYPE "CropType_new" USING ("cropType"::text::"CropType_new");
ALTER TYPE "CropType" RENAME TO "CropType_old";
ALTER TYPE "CropType_new" RENAME TO "CropType";
DROP TYPE "CropType_old";
COMMIT;
