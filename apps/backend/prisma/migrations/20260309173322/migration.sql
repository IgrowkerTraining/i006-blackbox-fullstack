-- CreateEnum
CREATE TYPE "EventSeverity" AS ENUM ('MINOR', 'MODERATE', 'SEVERE', 'CRITICAL');

-- AlterTable
ALTER TABLE "OperationalEvent" ADD COLUMN     "cost" DECIMAL(65,30),
ADD COLUMN     "injuries_reported" BOOLEAN,
ADD COLUMN     "mileage" INTEGER,
ADD COLUMN     "next_service_date" TIMESTAMP(3),
ADD COLUMN     "severity" "EventSeverity";

-- CreateIndex
CREATE INDEX "OperationalEvent_company_id_event_type_idx" ON "OperationalEvent"("company_id", "event_type");

-- CreateIndex
CREATE INDEX "OperationalEvent_company_id_event_datetime_idx" ON "OperationalEvent"("company_id", "event_datetime");

-- CreateIndex
CREATE INDEX "OperationalEvent_company_id_severity_idx" ON "OperationalEvent"("company_id", "severity");

-- CreateIndex
CREATE INDEX "OperationalEvent_vehicle_id_idx" ON "OperationalEvent"("vehicle_id");

-- CreateIndex
CREATE INDEX "OperationalEvent_driver_id_idx" ON "OperationalEvent"("driver_id");

-- CreateIndex
CREATE INDEX "OperationalEvent_next_service_date_idx" ON "OperationalEvent"("next_service_date");
