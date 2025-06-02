-- AlterTable
ALTER TABLE `stock` ADD COLUMN `price` DOUBLE NULL,
    ALTER COLUMN `updated_at` DROP DEFAULT;
