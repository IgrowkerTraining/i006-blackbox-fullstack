/*
  Warnings:

  - You are about to drop the column `created_at` on the `Driver` table. All the data in the column will be lost.
  - You are about to drop the column `is_active` on the `Driver` table. All the data in the column will be lost.
  - You are about to drop the column `license_number` on the `Driver` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Driver` table. All the data in the column will be lost.
  - You are about to drop the column `company_id` on the `OperationalEvent` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `OperationalEvent` table. All the data in the column will be lost.
  - You are about to drop the column `created_by_user_id` on the `OperationalEvent` table. All the data in the column will be lost.
  - You are about to drop the column `driver_id` on the `OperationalEvent` table. All the data in the column will be lost.
  - You are about to drop the column `e_signature` on the `OperationalEvent` table. All the data in the column will be lost.
  - You are about to drop the column `event_datetime` on the `OperationalEvent` table. All the data in the column will be lost.
  - You are about to drop the column `event_type` on the `OperationalEvent` table. All the data in the column will be lost.
  - You are about to drop the column `final_observations` on the `OperationalEvent` table. All the data in the column will be lost.
  - You are about to drop the column `general_result` on the `OperationalEvent` table. All the data in the column will be lost.
  - You are about to drop the column `is_confirmed` on the `OperationalEvent` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `OperationalEvent` table. All the data in the column will be lost.
  - You are about to drop the column `vehicle_id` on the `OperationalEvent` table. All the data in the column will be lost.
  - You are about to drop the column `is_active` on the `Vehicle` table. All the data in the column will be lost.
  - You are about to drop the column `unit_number` on the `Vehicle` table. All the data in the column will be lost.
  - Added the required column `licenseNumber` to the `Driver` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Driver` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyId` to the `OperationalEvent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdByUserId` to the `OperationalEvent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventDatetime` to the `OperationalEvent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventType` to the `OperationalEvent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `OperationalEvent` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "OperationalEvent" DROP CONSTRAINT "OperationalEvent_company_id_fkey";

-- DropForeignKey
ALTER TABLE "OperationalEvent" DROP CONSTRAINT "OperationalEvent_created_by_user_id_fkey";

-- DropForeignKey
ALTER TABLE "OperationalEvent" DROP CONSTRAINT "OperationalEvent_driver_id_fkey";

-- DropForeignKey
ALTER TABLE "OperationalEvent" DROP CONSTRAINT "OperationalEvent_vehicle_id_fkey";

-- AlterTable
ALTER TABLE "Driver" DROP COLUMN "created_at",
DROP COLUMN "is_active",
DROP COLUMN "license_number",
DROP COLUMN "updated_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "licenseNumber" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "OperationalEvent" DROP COLUMN "company_id",
DROP COLUMN "created_at",
DROP COLUMN "created_by_user_id",
DROP COLUMN "driver_id",
DROP COLUMN "e_signature",
DROP COLUMN "event_datetime",
DROP COLUMN "event_type",
DROP COLUMN "final_observations",
DROP COLUMN "general_result",
DROP COLUMN "is_confirmed",
DROP COLUMN "updated_at",
DROP COLUMN "vehicle_id",
ADD COLUMN     "companyId" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "createdByUserId" TEXT NOT NULL,
ADD COLUMN     "driverId" TEXT,
ADD COLUMN     "eSignature" TEXT,
ADD COLUMN     "eventDatetime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "eventType" "EventType" NOT NULL,
ADD COLUMN     "finalObservations" TEXT,
ADD COLUMN     "generalResult" "GeneralResult",
ADD COLUMN     "isConfirmed" BOOLEAN,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "vehicleId" TEXT;

-- AlterTable
ALTER TABLE "Vehicle" DROP COLUMN "is_active",
DROP COLUMN "unit_number",
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "unitNumber" TEXT;

-- AddForeignKey
ALTER TABLE "OperationalEvent" ADD CONSTRAINT "OperationalEvent_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OperationalEvent" ADD CONSTRAINT "OperationalEvent_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OperationalEvent" ADD CONSTRAINT "OperationalEvent_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OperationalEvent" ADD CONSTRAINT "OperationalEvent_createdByUserId_fkey" FOREIGN KEY ("createdByUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
