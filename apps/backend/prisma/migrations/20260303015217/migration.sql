-- CreateEnum
CREATE TYPE "TypeInspection" AS ENUM ('ARRIVAL', 'DEPARTURE');

-- CreateEnum
CREATE TYPE "InspectionStatus" AS ENUM ('ACCEPTABLE', 'NOT_ACCEPTABLE');

-- CreateTable
CREATE TABLE "InspectionDetail" (
    "id" TEXT NOT NULL,
    "event_id" TEXT NOT NULL,
    "type_inspection" "TypeInspection",
    "documentation_verified" BOOLEAN,
    "vehicle_condition" "InspectionStatus",
    "lights_brakes_ok" BOOLEAN,
    "safety_elements_ok" BOOLEAN,

    CONSTRAINT "InspectionDetail_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "InspectionDetail" ADD CONSTRAINT "InspectionDetail_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "OperationalEvent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
