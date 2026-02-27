/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Driver` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `Driver` table. All the data in the column will be lost.
  - You are about to drop the column `licenseNumber` on the `Driver` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Driver` table. All the data in the column will be lost.
  - You are about to drop the column `companyId` on the `OperationalEvent` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `OperationalEvent` table. All the data in the column will be lost.
  - You are about to drop the column `createdByUserId` on the `OperationalEvent` table. All the data in the column will be lost.
  - You are about to drop the column `driverId` on the `OperationalEvent` table. All the data in the column will be lost.
  - You are about to drop the column `eSignature` on the `OperationalEvent` table. All the data in the column will be lost.
  - You are about to drop the column `eventDatetime` on the `OperationalEvent` table. All the data in the column will be lost.
  - You are about to drop the column `eventType` on the `OperationalEvent` table. All the data in the column will be lost.
  - You are about to drop the column `finalObservations` on the `OperationalEvent` table. All the data in the column will be lost.
  - You are about to drop the column `generalResult` on the `OperationalEvent` table. All the data in the column will be lost.
  - You are about to drop the column `isConfirmed` on the `OperationalEvent` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `OperationalEvent` table. All the data in the column will be lost.
  - You are about to drop the column `vehicleId` on the `OperationalEvent` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `Vehicle` table. All the data in the column will be lost.
  - You are about to drop the column `unitNumber` on the `Vehicle` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id,companyId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[driverId]` on the table `Vehicle` will be added. If there are existing duplicate values, this will fail.
  - Made the column `usdotNumber` on table `Company` required. This step will fail if there are existing NULL values in that column.
  - Made the column `state` on table `Company` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `license_number` to the `Driver` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Driver` table without a default value. This is not possible if the table is not empty.
  - Added the required column `company_id` to the `OperationalEvent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_by_user_id` to the `OperationalEvent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `event_datetime` to the `OperationalEvent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `event_type` to the `OperationalEvent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `OperationalEvent` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "OperationalEvent" DROP CONSTRAINT "OperationalEvent_companyId_fkey";

-- DropForeignKey
ALTER TABLE "OperationalEvent" DROP CONSTRAINT "OperationalEvent_createdByUserId_fkey";

-- DropForeignKey
ALTER TABLE "OperationalEvent" DROP CONSTRAINT "OperationalEvent_driverId_fkey";

-- DropForeignKey
ALTER TABLE "OperationalEvent" DROP CONSTRAINT "OperationalEvent_vehicleId_fkey";

-- DropIndex
DROP INDEX "Company_usdotNumber_key";

-- DropIndex
DROP INDEX "Driver_companyId_idx";

-- DropIndex
DROP INDEX "OperationalEvent_companyId_idx";

-- DropIndex
DROP INDEX "OperationalEvent_driverId_idx";

-- DropIndex
DROP INDEX "OperationalEvent_eventDatetime_idx";

-- DropIndex
DROP INDEX "OperationalEvent_vehicleId_idx";

-- DropIndex
DROP INDEX "User_companyId_idx";

-- DropIndex
DROP INDEX "Vehicle_companyId_idx";

-- AlterTable
ALTER TABLE "Company" ALTER COLUMN "usdotNumber" SET NOT NULL,
ALTER COLUMN "state" SET NOT NULL;

-- AlterTable
ALTER TABLE "Driver" DROP COLUMN "createdAt",
DROP COLUMN "isActive",
DROP COLUMN "licenseNumber",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "license_number" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "OperationalEvent" DROP COLUMN "companyId",
DROP COLUMN "createdAt",
DROP COLUMN "createdByUserId",
DROP COLUMN "driverId",
DROP COLUMN "eSignature",
DROP COLUMN "eventDatetime",
DROP COLUMN "eventType",
DROP COLUMN "finalObservations",
DROP COLUMN "generalResult",
DROP COLUMN "isConfirmed",
DROP COLUMN "updatedAt",
DROP COLUMN "vehicleId",
ADD COLUMN     "company_id" TEXT NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "created_by_user_id" TEXT NOT NULL,
ADD COLUMN     "driver_id" TEXT,
ADD COLUMN     "e_signature" TEXT,
ADD COLUMN     "event_datetime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "event_type" "EventType" NOT NULL,
ADD COLUMN     "final_observations" TEXT,
ADD COLUMN     "general_result" "GeneralResult",
ADD COLUMN     "is_confirmed" BOOLEAN,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "vehicle_id" TEXT;

-- AlterTable
ALTER TABLE "Vehicle" DROP COLUMN "isActive",
DROP COLUMN "unitNumber",
ADD COLUMN     "driverId" TEXT,
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "unit_number" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_id_companyId_key" ON "User"("id", "companyId");

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_driverId_key" ON "Vehicle"("driverId");

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OperationalEvent" ADD CONSTRAINT "OperationalEvent_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OperationalEvent" ADD CONSTRAINT "OperationalEvent_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "Vehicle"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OperationalEvent" ADD CONSTRAINT "OperationalEvent_driver_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "Driver"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OperationalEvent" ADD CONSTRAINT "OperationalEvent_created_by_user_id_fkey" FOREIGN KEY ("created_by_user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
