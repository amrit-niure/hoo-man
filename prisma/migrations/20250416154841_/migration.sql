-- CreateEnum
CREATE TYPE "PlanType" AS ENUM ('FREE', 'BASIC', 'PRO', 'ENTERPRISE');

-- AlterTable
ALTER TABLE "company_profile" ADD COLUMN     "plan" "PlanType" NOT NULL DEFAULT 'FREE';
