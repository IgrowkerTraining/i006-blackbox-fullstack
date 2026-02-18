-- AlterTable
ALTER TABLE "Vehicle" ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "plate" TEXT;
