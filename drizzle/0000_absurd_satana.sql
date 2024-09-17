CREATE TABLE `departments` (
	`department_id` varchar(255) NOT NULL,
	`department_name` varchar(255) NOT NULL,
	CONSTRAINT `departments_department_id` PRIMARY KEY(`department_id`)
);
--> statement-breakpoint
CREATE TABLE `drafts` (
	`id` varchar(255) NOT NULL,
	`title` varchar(255) NOT NULL,
	`body` text NOT NULL,
	`user_id` varchar(100) NOT NULL,
	`department_id` varchar(255),
	`Status` enum('pending','sent','archived'),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `drafts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `messages` (
	`id` varchar(255) NOT NULL,
	`title` varchar(255) NOT NULL,
	`body` text NOT NULL,
	`user_id` varchar(100) NOT NULL,
	`department_id` varchar(255),
	`Status` enum('pending','sent','archived'),
	`sent_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `messages_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `session` (
	`id` varchar(255) NOT NULL,
	`user_id` varchar(255) NOT NULL,
	`expires_at` timestamp NOT NULL,
	CONSTRAINT `session_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` varchar(255) NOT NULL,
	`department_id` varchar(255),
	`display_name` varchar(50) NOT NULL,
	`email` varchar(100) NOT NULL,
	`profile_picture` varchar(255) DEFAULT '',
	`Role` enum('admin','manager','member'),
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
ALTER TABLE `drafts` ADD CONSTRAINT `drafts_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `drafts` ADD CONSTRAINT `drafts_department_id_departments_department_id_fk` FOREIGN KEY (`department_id`) REFERENCES `departments`(`department_id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `messages` ADD CONSTRAINT `messages_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `messages` ADD CONSTRAINT `messages_department_id_departments_department_id_fk` FOREIGN KEY (`department_id`) REFERENCES `departments`(`department_id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `session` ADD CONSTRAINT `session_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `users` ADD CONSTRAINT `users_department_id_departments_department_id_fk` FOREIGN KEY (`department_id`) REFERENCES `departments`(`department_id`) ON DELETE cascade ON UPDATE no action;