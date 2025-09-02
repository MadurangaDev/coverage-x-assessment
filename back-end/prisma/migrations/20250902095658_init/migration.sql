-- CreateTable
CREATE TABLE `task` (
    `task_id` INTEGER NOT NULL AUTO_INCREMENT,
    `task_title` VARCHAR(50) NOT NULL,
    `task_description` VARCHAR(500) NOT NULL,
    `task_current_status` ENUM('PENDING', 'COMPLETED') NOT NULL,
    `task_priority` ENUM('LOW', 'MEDIUM', 'HIGH') NOT NULL DEFAULT 'MEDIUM',
    `task_due_date` DATE NULL,
    `task_created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `task_updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `isDeleted` TINYINT NOT NULL DEFAULT 0,

    PRIMARY KEY (`task_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `task_history` (
    `record_id` INTEGER NOT NULL AUTO_INCREMENT,
    `task_id` INTEGER NOT NULL,
    `task_status` ENUM('PENDING', 'COMPLETED') NOT NULL,
    `record_created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `task_history_record_relationship`(`task_id`),
    PRIMARY KEY (`record_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `task_history` ADD CONSTRAINT `task_history_record_relationship` FOREIGN KEY (`task_id`) REFERENCES `task`(`task_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
