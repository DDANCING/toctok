-- AlterTable
ALTER TABLE "UserHistory" ADD COLUMN     "listingId" TEXT;

-- CreateIndex
CREATE INDEX "UserHistory_listingId_idx" ON "UserHistory"("listingId");

-- AddForeignKey
ALTER TABLE "UserHistory" ADD CONSTRAINT "UserHistory_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing"("id") ON DELETE CASCADE ON UPDATE CASCADE;
