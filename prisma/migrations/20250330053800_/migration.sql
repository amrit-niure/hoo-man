/*
  Warnings:

  - Added the required column `hourlyRate` to the `payslips` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hoursWorked` to the `payslips` table without a default value. This is not possible if the table is not empty.
  - Added the required column `leaveDeductions` to the `payslips` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentDate` to the `payslips` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentMethod` to the `payslips` table without a default value. This is not possible if the table is not empty.
  - Added the required column `superAmount` to the `payslips` table without a default value. This is not possible if the table is not empty.
  - Added the required column `taxAmount` to the `payslips` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `payslips` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('BANK_TRANSFER', 'CASH', 'CHEQUE');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'PROCESSED', 'FAILED');

-- CreateEnum
CREATE TYPE "PayrollStatus" AS ENUM ('DRAFT', 'PROCESSING', 'COMPLETED', 'FAILED');

-- AlterTable
ALTER TABLE "payslips" ADD COLUMN     "hourlyRate" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "hoursWorked" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "leaveDeductions" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "paymentDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "paymentMethod" "PaymentMethod" NOT NULL,
ADD COLUMN     "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "payrollRunId" TEXT,
ADD COLUMN     "stripePaymentId" TEXT,
ADD COLUMN     "superAmount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "taxAmount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "payroll_runs" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "payPeriodStart" TIMESTAMP(3) NOT NULL,
    "payPeriodEnd" TIMESTAMP(3) NOT NULL,
    "totalGross" DOUBLE PRECISION NOT NULL,
    "totalNet" DOUBLE PRECISION NOT NULL,
    "totalTax" DOUBLE PRECISION NOT NULL,
    "totalSuper" DOUBLE PRECISION NOT NULL,
    "status" "PayrollStatus" NOT NULL DEFAULT 'DRAFT',
    "processedAt" TIMESTAMP(3),
    "processedById" TEXT NOT NULL,
    "companyProfileId" TEXT NOT NULL,
    "stripeBatchId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payroll_runs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bank_details" (
    "id" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "bankName" TEXT NOT NULL,
    "accountName" TEXT NOT NULL,
    "bsbNumber" TEXT NOT NULL,
    "accountNumber" TEXT NOT NULL,
    "isPrimary" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "bank_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tax_information" (
    "id" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "taxFileNumber" TEXT,
    "taxScale" TEXT,
    "hasTaxFreeThreshold" BOOLEAN NOT NULL DEFAULT false,
    "hasSeniorsOffset" BOOLEAN NOT NULL DEFAULT false,
    "hasStudentLoan" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "tax_information_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "superannuation" (
    "id" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "fundName" TEXT NOT NULL,
    "memberNumber" TEXT NOT NULL,
    "productId" TEXT,
    "contributionRate" DOUBLE PRECISION NOT NULL DEFAULT 0.11,

    CONSTRAINT "superannuation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tax_information_employeeId_key" ON "tax_information"("employeeId");

-- CreateIndex
CREATE UNIQUE INDEX "superannuation_employeeId_key" ON "superannuation"("employeeId");

-- AddForeignKey
ALTER TABLE "payslips" ADD CONSTRAINT "payslips_payrollRunId_fkey" FOREIGN KEY ("payrollRunId") REFERENCES "payroll_runs"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payroll_runs" ADD CONSTRAINT "payroll_runs_processedById_fkey" FOREIGN KEY ("processedById") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payroll_runs" ADD CONSTRAINT "payroll_runs_companyProfileId_fkey" FOREIGN KEY ("companyProfileId") REFERENCES "company_profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bank_details" ADD CONSTRAINT "bank_details_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tax_information" ADD CONSTRAINT "tax_information_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "superannuation" ADD CONSTRAINT "superannuation_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
