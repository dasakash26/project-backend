-- AlterTable
ALTER TABLE "CurrentTerms" ADD COLUMN     "logistics" TEXT NOT NULL DEFAULT 'Arranged by buyer';

-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT false;
