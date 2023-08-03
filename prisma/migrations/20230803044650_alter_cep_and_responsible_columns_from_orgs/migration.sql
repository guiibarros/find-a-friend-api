/*
  Warnings:

  - You are about to drop the column `responsible_name` on the `orgs` table. All the data in the column will be lost.
  - Added the required column `responsible` to the `orgs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orgs" DROP COLUMN "responsible_name",
ADD COLUMN     "responsible" TEXT NOT NULL,
ALTER COLUMN "cep" SET DATA TYPE TEXT;
