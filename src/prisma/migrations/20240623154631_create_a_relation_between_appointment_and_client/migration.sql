/*
  Warnings:

  - You are about to drop the column `clientEmail` on the `appointment` table. All the data in the column will be lost.
  - You are about to drop the column `clientName` on the `appointment` table. All the data in the column will be lost.
  - You are about to drop the column `clientPhone` on the `appointment` table. All the data in the column will be lost.
  - You are about to drop the column `comment` on the `appointment` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `user` table. All the data in the column will be lost.
  - Added the required column `firstName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `appointment` DROP COLUMN `clientEmail`,
    DROP COLUMN `clientName`,
    DROP COLUMN `clientPhone`,
    DROP COLUMN `comment`,
    ADD COLUMN `userId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `name`,
    ADD COLUMN `firstName` VARCHAR(191) NOT NULL,
    ADD COLUMN `lastName` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Appointment` ADD CONSTRAINT `Appointment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
