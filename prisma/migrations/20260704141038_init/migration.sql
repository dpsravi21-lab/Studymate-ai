/*
  Warnings:

  - Added the required column `class` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `province` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `schoolStatus` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "class" INTEGER NOT NULL,
ADD COLUMN     "province" TEXT NOT NULL,
ADD COLUMN     "schoolStatus" TEXT NOT NULL,
ADD COLUMN     "subjects" TEXT[];
