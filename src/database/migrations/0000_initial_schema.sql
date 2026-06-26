CREATE TABLE `commands` (
	`id` int AUTO_INCREMENT NOT NULL,
	`type` enum('turn_on','turn_off','restart','update_firmware') NOT NULL,
	`payload` json,
	`status` enum('pending','sent','acknowledged','failed') NOT NULL DEFAULT 'pending',
	`sent_at` timestamp,
	`responded_at` timestamp,
	`created_by_user_id` int NOT NULL,
	`device_id` int NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `commands_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `devices` (
	`id` int AUTO_INCREMENT NOT NULL,
	`mac_address` varchar(17) NOT NULL,
	`firmware_version` varchar(80) NOT NULL,
	`firmware_version_id` int,
	`mqtt_topic` varchar(255) NOT NULL,
	`connectivity_status` enum('online','offline') NOT NULL DEFAULT 'offline',
	`tv_id` int NOT NULL,
	`location_id` int NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `devices_id` PRIMARY KEY(`id`),
	CONSTRAINT `devices_mac_address_unique` UNIQUE(`mac_address`),
	CONSTRAINT `devices_mqtt_topic_unique` UNIQUE(`mqtt_topic`),
	CONSTRAINT `devices_tv_id_unique` UNIQUE(`tv_id`)
);
--> statement-breakpoint
CREATE TABLE `firmware_versions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`code` varchar(120) NOT NULL,
	`version` varchar(80) NOT NULL,
	`changelog` text,
	`release_date` timestamp,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `firmware_versions_id` PRIMARY KEY(`id`),
	CONSTRAINT `firmware_versions_code_unique` UNIQUE(`code`)
);
--> statement-breakpoint
CREATE TABLE `locations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` text,
	`address` varchar(255),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `locations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `logs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`type` varchar(120) NOT NULL,
	`category` varchar(120) NOT NULL,
	`message` text NOT NULL,
	`metadata` json,
	`actor_user_id` int,
	`device_id` int,
	`tv_id` int,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `logs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `tvs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`brand` varchar(120) NOT NULL,
	`model` varchar(120) NOT NULL,
	`serial_number` varchar(120) NOT NULL,
	`status` enum('on','off','offline') NOT NULL DEFAULT 'offline',
	`location_id` int NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `tvs_id` PRIMARY KEY(`id`),
	CONSTRAINT `tvs_serial_number_unique` UNIQUE(`serial_number`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`full_name` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`password_hash` varchar(255) NOT NULL,
	`role` enum('viewer','admin') NOT NULL DEFAULT 'viewer',
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
ALTER TABLE `commands` ADD CONSTRAINT `commands_created_by_user_id_users_id_fk` FOREIGN KEY (`created_by_user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `commands` ADD CONSTRAINT `commands_device_id_devices_id_fk` FOREIGN KEY (`device_id`) REFERENCES `devices`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `devices` ADD CONSTRAINT `devices_firmware_version_id_firmware_versions_id_fk` FOREIGN KEY (`firmware_version_id`) REFERENCES `firmware_versions`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `devices` ADD CONSTRAINT `devices_tv_id_tvs_id_fk` FOREIGN KEY (`tv_id`) REFERENCES `tvs`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `devices` ADD CONSTRAINT `devices_location_id_locations_id_fk` FOREIGN KEY (`location_id`) REFERENCES `locations`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `logs` ADD CONSTRAINT `logs_actor_user_id_users_id_fk` FOREIGN KEY (`actor_user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `logs` ADD CONSTRAINT `logs_device_id_devices_id_fk` FOREIGN KEY (`device_id`) REFERENCES `devices`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `logs` ADD CONSTRAINT `logs_tv_id_tvs_id_fk` FOREIGN KEY (`tv_id`) REFERENCES `tvs`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `tvs` ADD CONSTRAINT `tvs_location_id_locations_id_fk` FOREIGN KEY (`location_id`) REFERENCES `locations`(`id`) ON DELETE no action ON UPDATE no action;