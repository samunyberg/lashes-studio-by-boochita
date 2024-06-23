/*
  Warnings:

  - Added the required column `bookedAt` to the `Appointment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `appointment` ADD COLUMN `bookedAt` DATETIME(3) NOT NULL;
