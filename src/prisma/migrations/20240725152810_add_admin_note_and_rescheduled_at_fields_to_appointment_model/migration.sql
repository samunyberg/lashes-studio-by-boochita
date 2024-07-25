-- AlterTable
ALTER TABLE `appointment` ADD COLUMN `adminNote` VARCHAR(500) NULL,
    ADD COLUMN `rescheduledAt` DATETIME(3) NULL;
