-- DCL executado manualmente por um usuario administrador do MySQL.
-- Ajuste as senhas antes de executar em um ambiente real.

CREATE USER IF NOT EXISTS 'iotv_app'@'%' IDENTIFIED BY 'change_me_app_password';
CREATE USER IF NOT EXISTS 'iotv_maintenance'@'%' IDENTIFIED BY 'change_me_maintenance_password';
CREATE USER IF NOT EXISTS 'iotv_migrator'@'%' IDENTIFIED BY 'change_me_migrator_password';
