ALTER TABLE `devices` DROP FOREIGN KEY `devices_tv_id_tvs_id_fk`;
--> statement-breakpoint
ALTER TABLE `logs` DROP FOREIGN KEY `logs_device_id_devices_id_fk`;
--> statement-breakpoint
ALTER TABLE `logs` DROP FOREIGN KEY `logs_tv_id_tvs_id_fk`;
--> statement-breakpoint
ALTER TABLE `devices` ADD CONSTRAINT `devices_tv_id_tvs_id_fk` FOREIGN KEY (`tv_id`) REFERENCES `tvs`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `logs` ADD CONSTRAINT `logs_device_id_devices_id_fk` FOREIGN KEY (`device_id`) REFERENCES `devices`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `logs` ADD CONSTRAINT `logs_tv_id_tvs_id_fk` FOREIGN KEY (`tv_id`) REFERENCES `tvs`(`id`) ON DELETE set null ON UPDATE no action;