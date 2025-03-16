/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `employees` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `onBoarded` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "employees" ADD COLUMN     "companyProfileId" TEXT;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "companyProfileId" TEXT,
ADD COLUMN     "onBoarded" BOOLEAN NOT NULL;

-- CreateTable
CREATE TABLE "company_profile" (
    "id" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "logo" TEXT,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "website" TEXT,
    "taxNumber" TEXT,
    "registrationNo" TEXT,
    "description" TEXT,
    "industry" TEXT,
    "foundedDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,

    CONSTRAINT "company_profile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "company_profile_email_key" ON "company_profile"("email");

-- CreateIndex
CREATE UNIQUE INDEX "company_profile_userId_key" ON "company_profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "employees_userId_key" ON "employees"("userId");

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_companyProfileId_fkey" FOREIGN KEY ("companyProfileId") REFERENCES "company_profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_profile" ADD CONSTRAINT "company_profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
