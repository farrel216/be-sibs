/*
  Warnings:

  - You are about to drop the `Transaction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TransactionItem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_userId_fkey";

-- DropForeignKey
ALTER TABLE "TransactionItem" DROP CONSTRAINT "TransactionItem_transactionId_fkey";

-- DropTable
DROP TABLE "Transaction";

-- DropTable
DROP TABLE "TransactionItem";

-- CreateTable
CREATE TABLE "transations" (
    "transactionId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "transations_pkey" PRIMARY KEY ("transactionId")
);

-- CreateTable
CREATE TABLE "transactionItems" (
    "transactionItemId" TEXT NOT NULL,
    "transactionId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "itemBuyPrice" INTEGER NOT NULL,

    CONSTRAINT "transactionItems_pkey" PRIMARY KEY ("transactionItemId")
);

-- AddForeignKey
ALTER TABLE "transations" ADD CONSTRAINT "transations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactionItems" ADD CONSTRAINT "transactionItems_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "transations"("transactionId") ON DELETE RESTRICT ON UPDATE CASCADE;
