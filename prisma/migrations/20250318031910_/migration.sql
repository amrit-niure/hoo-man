/*
  Warnings:

  - You are about to drop the `applications` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `jobs` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "applications" DROP CONSTRAINT "applications_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "applications" DROP CONSTRAINT "applications_jobId_fkey";

-- DropTable
DROP TABLE "applications";

-- DropTable
DROP TABLE "jobs";

-- DropEnum
DROP TYPE "ApplicationStatus";
