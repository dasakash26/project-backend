-- DropForeignKey
ALTER TABLE "FarmDetails" DROP CONSTRAINT "FarmDetails_userId_fkey";

-- DropForeignKey
ALTER TABLE "PaymentPreferences" DROP CONSTRAINT "PaymentPreferences_userId_fkey";

-- AddForeignKey
ALTER TABLE "FarmDetails" ADD CONSTRAINT "FarmDetails_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentPreferences" ADD CONSTRAINT "PaymentPreferences_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
