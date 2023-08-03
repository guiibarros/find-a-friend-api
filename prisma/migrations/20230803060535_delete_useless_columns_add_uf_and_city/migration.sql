/*
  Warnings:

  - You are about to drop the column `email` on the `orgs` table. All the data in the column will be lost.
  - You are about to drop the column `latitude` on the `orgs` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `orgs` table. All the data in the column will be lost.
  - You are about to drop the column `responsible` on the `orgs` table. All the data in the column will be lost.
  - Added the required column `city` to the `orgs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uf` to the `orgs` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "orgs_email_key";

-- AlterTable
ALTER TABLE "orgs" DROP COLUMN "email",
DROP COLUMN "latitude",
DROP COLUMN "longitude",
DROP COLUMN "responsible",
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "uf" TEXT NOT NULL;
