-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('applied', 'shortlisted', 'rejected', 'hired');

-- CreateEnum
CREATE TYPE "LeaveType" AS ENUM ('SICK', 'VACATION', 'PERSONAL');

-- CreateEnum
CREATE TYPE "LeaveStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "Department" AS ENUM ('INFORMATION_TECHNOLOGY', 'HUMAN_RESOURCES', 'FINANCE', 'MARKETING', 'SALES', 'OPERATIONS');

-- CreateEnum
CREATE TYPE "EmployeeStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'TERMINATED', 'RESIGNED', 'ON_LEAVE');

-- CreateTable
CREATE TABLE "employees" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "department" "Department" NOT NULL,
    "address" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "joinDate" TIMESTAMP(3) NOT NULL,
    "status" "EmployeeStatus" NOT NULL DEFAULT 'ACTIVE',

    CONSTRAINT "employees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "jobs" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "jobs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "applications" (
    "id" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "status" "ApplicationStatus" NOT NULL,

    CONSTRAINT "applications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "attendances" (
    "id" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "clockInTime" TIMESTAMP(3) NOT NULL,
    "clockOutTime" TIMESTAMP(3) NOT NULL,
    "totalHours" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "attendances_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payslips" (
    "id" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "payPeriodStart" TIMESTAMP(3) NOT NULL,
    "payPeriodEnd" TIMESTAMP(3) NOT NULL,
    "grossAmount" DOUBLE PRECISION NOT NULL,
    "netAmount" DOUBLE PRECISION NOT NULL,
    "deductions" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "payslips_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "leaves" (
    "id" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "leaveType" "LeaveType" NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "status" "LeaveStatus" NOT NULL,

    CONSTRAINT "leaves_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "applications" ADD CONSTRAINT "applications_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "applications" ADD CONSTRAINT "applications_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "jobs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attendances" ADD CONSTRAINT "attendances_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payslips" ADD CONSTRAINT "payslips_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "leaves" ADD CONSTRAINT "leaves_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
