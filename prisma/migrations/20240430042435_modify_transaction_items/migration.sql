/*
  Warnings:

  - You are about to drop the column `status` on the `transations` table. All the data in the column will be lost.
  - You are about to drop the column `balance` on the `users` table. All the data in the column will be lost.
  - Added the required column `productName` to the `transactionItems` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "transactionItems" ADD COLUMN     "productName" TEXT NOT NULL,
ADD COLUMN     "total" DOUBLE PRECISION NOT NULL DEFAULT 0,
ALTER COLUMN "productId" DROP NOT NULL,
ALTER COLUMN "quantity" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "itemBuyPrice" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "transations" DROP COLUMN "status",
ALTER COLUMN "date" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "balance";

-- CreateTable
CREATE TABLE "Balance" (
    "balanceId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "Balance_pkey" PRIMARY KEY ("balanceId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Balance_userId_key" ON "Balance"("userId");

-- AddForeignKey
ALTER TABLE "Balance" ADD CONSTRAINT "Balance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactionItems" ADD CONSTRAINT "transactionItems_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("productId") ON DELETE SET NULL ON UPDATE CASCADE;
