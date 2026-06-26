ALTER TABLE `commands` DROP FOREIGN KEY `commands_created_by_user_id_users_id_fk`;
--> statement-breakpoint
ALTER TABLE `logs` DROP FOREIGN KEY `logs_actor_user_id_users_id_fk`;
--> statement-breakpoint
ALTER TABLE `commands` ADD CONSTRAINT `commands_created_by_user_id_users_id_fk` FOREIGN KEY (`created_by_user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `logs` ADD CONSTRAINT `logs_actor_user_id_users_id_fk` FOREIGN KEY (`actor_user_id`) REFERENCES `users`(`id`) ON DELETE set null ON UPDATE no action;