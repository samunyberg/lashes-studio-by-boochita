/*
  Warnings:

  - Made the column `imageUrl` on table `service` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description_en` on table `service` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description_fi` on table `service` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description_en` on table `serviceoption` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description_fi` on table `serviceoption` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `service` MODIFY `imageUrl` VARCHAR(191) NOT NULL,
    MODIFY `description_en` VARCHAR(191) NOT NULL,
    MODIFY `description_fi` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `serviceoption` MODIFY `description_en` VARCHAR(191) NOT NULL,
    MODIFY `description_fi` VARCHAR(191) NOT NULL;
