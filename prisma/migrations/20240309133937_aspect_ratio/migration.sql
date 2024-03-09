/*
  Warnings:

  - Added the required column `aspectRatio` to the `charts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `charts` ADD COLUMN `aspectRatio` VARCHAR(191) NOT NULL;
