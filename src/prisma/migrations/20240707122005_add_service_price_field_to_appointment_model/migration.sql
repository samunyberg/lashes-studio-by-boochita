/*
  Warnings:

  - Added the required column `servicePrice` to the `Appointment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `appointment` ADD COLUMN `servicePrice` DOUBLE NOT NULL;
