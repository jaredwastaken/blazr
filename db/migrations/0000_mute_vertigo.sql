CREATE TABLE `activities` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text
);
--> statement-breakpoint
CREATE TABLE `logs` (
	`id` integer PRIMARY KEY NOT NULL,
	`date` text,
	`activity_id` integer,
	FOREIGN KEY (`activity_id`) REFERENCES `activities`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `nameIdx` ON `activities` (`name`);