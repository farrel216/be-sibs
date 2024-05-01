/*
  Warnings:

  - You are about to drop the column `itemBuyPrice` on the `transactionItems` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `transactionItems` table. All the data in the column will be lost.
  - Added the required column `rate` to the `transactionItems` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weight` to the `transactionItems` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "transactionItems" DROP COLUMN "itemBuyPrice",
DROP COLUMN "quantity",
ADD COLUMN     "rate" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "weight" DOUBLE PRECISION NOT NULL;
