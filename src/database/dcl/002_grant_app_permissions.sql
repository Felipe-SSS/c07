-- Permissoes minimas para a API executar CRUD e consultar as views.
-- Use este usuario no .env da aplicacao em execucao normal.

GRANT SELECT, INSERT, UPDATE, DELETE
ON iotv.users
TO 'iotv_app'@'%';

GRANT SELECT, INSERT, UPDATE, DELETE
ON iotv.locations
TO 'iotv_app'@'%';

GRANT SELECT, INSERT, UPDATE, DELETE
ON iotv.tvs
TO 'iotv_app'@'%';

GRANT SELECT, INSERT, UPDATE, DELETE
ON iotv.devices
TO 'iotv_app'@'%';

GRANT SELECT, INSERT, UPDATE, DELETE
ON iotv.commands
TO 'iotv_app'@'%';

GRANT SELECT, INSERT, UPDATE, DELETE
ON iotv.logs
TO 'iotv_app'@'%';

GRANT SELECT, INSERT, UPDATE, DELETE
ON iotv.firmware_versions
TO 'iotv_app'@'%';

GRANT SELECT
ON iotv.logs_by_user_view
TO 'iotv_app'@'%';

GRANT SELECT
ON iotv.logs_by_tv_view
TO 'iotv_app'@'%';

GRANT SELECT
ON iotv.logs_by_device_view
TO 'iotv_app'@'%';

FLUSH PRIVILEGES;
