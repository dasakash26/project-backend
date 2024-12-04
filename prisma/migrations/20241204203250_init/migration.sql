-- AlterEnum
ALTER TYPE "NegotiationStatus" ADD VALUE 'ONGOING';
COMMIT;

-- AlterTable
ALTER TABLE "Negotiation" ALTER COLUMN "status" SET DEFAULT 'ONGOING';
