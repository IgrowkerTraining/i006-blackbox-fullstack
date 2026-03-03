/*
  Warnings:

  - You are about to drop the column `lights_brakes_ok` on the `InspectionDetail` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "InspectionDetail" DROP COLUMN "lights_brakes_ok",
ADD COLUMN     "brakes_ok" BOOLEAN,
ADD COLUMN     "lights_ok" BOOLEAN,
ADD COLUMN     "tires_ok" BOOLEAN;
