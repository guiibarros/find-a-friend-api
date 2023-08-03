-- CreateEnum
CREATE TYPE "Age" AS ENUM ('PUPPY', 'ADOLESCENT', 'ADULT', 'SENIOR');

-- CreateEnum
CREATE TYPE "Size" AS ENUM ('SMALL', 'MEDIUM', 'LARGE');

-- CreateEnum
CREATE TYPE "Rate" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateTable
CREATE TABLE "pets" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "about" TEXT NOT NULL,
    "adopted_at" TIMESTAMP(3),
    "age" "Age" NOT NULL,
    "size" "Size" NOT NULL,
    "energy" "Rate" NOT NULL,
    "independency" "Rate" NOT NULL,
    "environment" "Size" NOT NULL,
    "imagesUrl" TEXT[],
    "requirements" TEXT[],

    CONSTRAINT "pets_pkey" PRIMARY KEY ("id")
);
