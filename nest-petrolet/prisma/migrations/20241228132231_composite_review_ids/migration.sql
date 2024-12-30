/*
  Warnings:

  - A unique constraint covering the columns `[listingId,reviewerId]` on the table `ListingReview` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[sellerId,reviewerId]` on the table `SellerReview` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ListingReview_listingId_reviewerId_key" ON "ListingReview"("listingId", "reviewerId");

-- CreateIndex
CREATE UNIQUE INDEX "SellerReview_sellerId_reviewerId_key" ON "SellerReview"("sellerId", "reviewerId");
