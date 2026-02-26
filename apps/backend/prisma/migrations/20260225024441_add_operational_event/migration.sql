-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('UNKNOWN', 'ACCIDENT', 'MAINTENANCE', 'INSPECTION', 'OTHER');

-- CreateEnum
CREATE TYPE "LocationType" AS ENUM ('UNKNOWN', 'GPS', 'ADDRESS');

-- CreateEnum
CREATE TYPE "ContextType" AS ENUM ('UNKNOWN', 'MANUAL', 'AUTOMATIC', 'SENSOR');

-- CreateEnum
CREATE TYPE "GeneralResult" AS ENUM ('WITH_OBS', 'WITHOUT_OBS');

-- CreateTable
CREATE TABLE "OperationalEvent" (
    "id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "vehicle_id" TEXT,
    "driver_id" TEXT,
    "event_type" "EventType" NOT NULL,
    "event_datetime" TIMESTAMP(3) NOT NULL,
    "location" "LocationType",
    "context" "ContextType",
    "general_result" "GeneralResult",
    "e_signature" TEXT,
    "final_observations" TEXT,
    "is_confirmed" BOOLEAN,
    "created_by_user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OperationalEvent_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OperationalEvent" ADD CONSTRAINT "OperationalEvent_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OperationalEvent" ADD CONSTRAINT "OperationalEvent_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "Vehicle"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OperationalEvent" ADD CONSTRAINT "OperationalEvent_driver_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "Driver"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OperationalEvent" ADD CONSTRAINT "OperationalEvent_created_by_user_id_fkey" FOREIGN KEY ("created_by_user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
