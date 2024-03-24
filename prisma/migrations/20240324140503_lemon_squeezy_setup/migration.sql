/*
  Warnings:

  - You are about to drop the column `stripe_current_period_end` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `stripe_customer_id` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `stripe_price_id` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `stripe_subscription_id` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[lemon_squeezy_customer_id]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[lemon_squeezy_license_key]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[lemon_squeezy_order_id]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `accounts` DROP FOREIGN KEY `accounts_userId_fkey`;

-- DropForeignKey
ALTER TABLE `charts` DROP FOREIGN KEY `charts_authorId_fkey`;

-- DropForeignKey
ALTER TABLE `sessions` DROP FOREIGN KEY `sessions_userId_fkey`;

-- DropIndex
DROP INDEX `users_stripe_customer_id_key` ON `users`;

-- DropIndex
DROP INDEX `users_stripe_subscription_id_key` ON `users`;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `stripe_current_period_end`,
    DROP COLUMN `stripe_customer_id`,
    DROP COLUMN `stripe_price_id`,
    DROP COLUMN `stripe_subscription_id`,
    ADD COLUMN `lemon_squeezy_customer_id` VARCHAR(191) NULL,
    ADD COLUMN `lemon_squeezy_license_key` VARCHAR(191) NULL,
    ADD COLUMN `lemon_squeezy_order_id` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `users_lemon_squeezy_customer_id_key` ON `users`(`lemon_squeezy_customer_id`);

-- CreateIndex
CREATE UNIQUE INDEX `users_lemon_squeezy_license_key_key` ON `users`(`lemon_squeezy_license_key`);

-- CreateIndex
CREATE UNIQUE INDEX `users_lemon_squeezy_order_id_key` ON `users`(`lemon_squeezy_order_id`);
