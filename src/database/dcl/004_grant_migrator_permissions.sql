-- Permissoes para o usuario que executa migrations do Drizzle.
-- Este usuario nao precisa ser o mesmo usado pela API em runtime.

GRANT CREATE, ALTER, DROP, INDEX, REFERENCES, SELECT, INSERT, UPDATE, DELETE
ON iotv.*
TO 'iotv_migrator'@'%';

FLUSH PRIVILEGES;
