-- AlterTable
ALTER TABLE "bank_details" ADD COLUMN     "stripeBankToken" TEXT,
ADD COLUMN     "verified" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "payslips" ADD COLUMN     "metadata" JSONB;
