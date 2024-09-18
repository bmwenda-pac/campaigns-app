ALTER TABLE `users` MODIFY COLUMN `surname` varchar(50) NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `job_title` varchar(50) NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `office_location` varchar(50);