-- Garante que o usuario runtime da API nao tenha permissoes administrativas.
-- Rode este script se algum GRANT amplo tiver sido aplicado por engano.

REVOKE CREATE, ALTER, DROP, INDEX, REFERENCES, GRANT OPTION
ON iotv.*
FROM 'iotv_app'@'%';

FLUSH PRIVILEGES;
