/*
  Warnings:

  - You are about to drop the column `description` on the `service` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `serviceoption` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `serviceoption` table. All the data in the column will be lost.
  - Added the required column `name_en` to the `ServiceOption` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name_fi` to the `ServiceOption` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `service` DROP COLUMN `description`,
    ADD COLUMN `description_en` VARCHAR(191) NULL,
    ADD COLUMN `description_fi` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `serviceoption` DROP COLUMN `description`,
    DROP COLUMN `name`,
    ADD COLUMN `description_en` VARCHAR(191) NULL,
    ADD COLUMN `description_fi` VARCHAR(191) NULL,
    ADD COLUMN `name_en` VARCHAR(255) NOT NULL,
    ADD COLUMN `name_fi` VARCHAR(255) NOT NULL;
