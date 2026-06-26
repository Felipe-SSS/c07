-- Permissoes para rotinas administrativas como TRUNCATE.
-- Use este usuario apenas quando for realmente necessario limpar tabelas.

GRANT SELECT, INSERT, UPDATE, DELETE, DROP, CREATE
ON iotv.users
TO 'iotv_maintenance'@'%';

GRANT SELECT, INSERT, UPDATE, DELETE, DROP, CREATE
ON iotv.locations
TO 'iotv_maintenance'@'%';

GRANT SELECT, INSERT, UPDATE, DELETE, DROP, CREATE
ON iotv.tvs
TO 'iotv_maintenance'@'%';

GRANT SELECT, INSERT, UPDATE, DELETE, DROP, CREATE
ON iotv.devices
TO 'iotv_maintenance'@'%';

GRANT SELECT, INSERT, UPDATE, DELETE, DROP, CREATE
ON iotv.commands
TO 'iotv_maintenance'@'%';

GRANT SELECT, INSERT, UPDATE, DELETE, DROP, CREATE
ON iotv.logs
TO 'iotv_maintenance'@'%';

GRANT SELECT, INSERT, UPDATE, DELETE, DROP, CREATE
ON iotv.firmware_versions
TO 'iotv_maintenance'@'%';

FLUSH PRIVILEGES;
