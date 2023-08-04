/*
  Warnings:

  - You are about to drop the column `cep` on the `orgs` table. All the data in the column will be lost.
  - Added the required column `postal_code` to the `orgs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orgs" DROP COLUMN "cep",
ADD COLUMN     "postal_code" TEXT NOT NULL;
