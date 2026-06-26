-- Rollback administrativo dos usuarios criados pelos scripts DCL.
-- Execute apenas se quiser remover os acessos do projeto.

DROP USER IF EXISTS 'iotv_app'@'%';
DROP USER IF EXISTS 'iotv_maintenance'@'%';
DROP USER IF EXISTS 'iotv_migrator'@'%';

FLUSH PRIVILEGES;
