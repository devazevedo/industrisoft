-- AlterTable
ALTER TABLE `raw_materials` MODIFY `medition` ENUM('kg', 'g', 'l', 'ml', 'un') NOT NULL;

-- AlterTable
ALTER TABLE `recipes_raw_materials` MODIFY `medition` ENUM('kg', 'g', 'l', 'ml', 'un') NOT NULL;
