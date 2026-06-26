# Relatorio da Segunda Entrega - Projeto IoTV

## Introducao e Conceitos Iniciais de SQL

- O projeto IoTV foi desenvolvido como uma API em TypeScript com NestJS, Drizzle ORM e MySQL.
- O banco de dados foi modelado para armazenar usuarios, locais fisicos, TVs, dispositivos IoT, comandos, logs e versoes de firmware.
- A linguagem SQL foi aplicada tanto na definicao da estrutura do banco quanto na manipulacao e consulta dos dados.
- Todas as queries da aplicacao foram escritas em SQL puro usando o helper `sql` do Drizzle, conforme exigido no projeto.

## Tipos de Dados

- Foram utilizados diferentes tipos de dados SQL conforme a necessidade das entidades.
- Exemplos aplicados:
  - `varchar`: nomes, e-mails, codigos, topicos MQTT e numeros de serie.
  - `text`: mensagens de log, descricoes e changelog de firmware.
  - `int`: identificadores e chaves estrangeiras.
  - `timestamp`: datas de criacao, atualizacao, envio e resposta de comandos.
  - `json`: payload de comandos, metadados de logs e dados adicionais.
  - `boolean`: coluna `is_active` da tabela `users`.
  - `enum`: campos como `role`, `status`, `type` e `connectivity_status`.

## ACID

- O projeto utiliza MySQL como banco relacional, que oferece suporte aos principios ACID.
- A consistencia dos dados e mantida por constraints, chaves estrangeiras e regras de integridade.
- A atomicidade e importante em operacoes como criacao de registros relacionados e execucao das migrations.
- A durabilidade e garantida pelo armazenamento persistente do MySQL.
- O isolamento depende do mecanismo transacional do MySQL utilizado pelo servidor.

## Atomicidade

- Cada operacao de escrita da API, como `POST /users`, `POST /devices` ou `PATCH /commands/:id`, e executada como uma instrucao SQL unica.
- Caso a operacao viole alguma regra do banco, ela falha e nao deixa o registro em estado parcial.
- Exemplo: se o usuario tentar cadastrar um e-mail duplicado, o banco rejeita a insercao inteira.

## Consistencia

- A consistencia foi aplicada com constraints de chave primaria, chave estrangeira, campos obrigatorios, valores unicos e valores padrao.
- Exemplo: um `device` so pode apontar para uma TV existente por meio de `tv_id`.
- Exemplo: um `command` so pode ser criado para um `device` existente.
- Erros de consistencia sao tratados por um filtro global de exceptions, retornando respostas HTTP adequadas como `400 Bad Request` ou `409 Conflict`.

## Isolamento

- O isolamento fica sob responsabilidade do MySQL durante as operacoes concorrentes.
- A API nao implementa transacoes manuais complexas, mas cada comando SQL enviado ao banco respeita as regras transacionais do mecanismo de armazenamento.
- Em um ambiente com multiplas requisicoes, o MySQL controla a concorrencia entre inserts, updates e deletes.

## Durabilidade

- Os dados persistem no banco MySQL apos as operacoes da API.
- As migrations permitem recriar a estrutura do banco.
- A seed permite popular a base novamente com dados de demonstracao.

## Constraints

- O projeto aplica constraints para garantir integridade dos dados.
- Exemplos:
  - `PRIMARY KEY` em todas as tabelas principais.
  - `FOREIGN KEY` entre users, locations, tvs, devices, commands e logs.
  - `NOT NULL` em campos obrigatorios.
  - `UNIQUE` em e-mail de usuario, numero de serie de TV, MAC address, topico MQTT e codigo de firmware.
  - `DEFAULT` em status, roles, timestamps e `is_active`.

## Chaves Primarias

- Todas as entidades possuem coluna `id` como chave primaria.
- Exemplo:
  - `users.id`
  - `locations.id`
  - `tvs.id`
  - `devices.id`
  - `commands.id`
  - `logs.id`
  - `firmware_versions.id`
- Essas chaves identificam unicamente cada registro.

## Chaves Estrangeiras

- As chaves estrangeiras foram usadas para representar os relacionamentos do sistema.
- Exemplos:
  - `tvs.location_id` referencia `locations.id`.
  - `devices.tv_id` referencia `tvs.id`.
  - `devices.location_id` referencia `locations.id`.
  - `commands.created_by_user_id` referencia `users.id`.
  - `commands.device_id` referencia `devices.id`.
  - `logs.actor_user_id` referencia `users.id`.
  - `logs.device_id` referencia `devices.id`.
  - `logs.tv_id` referencia `tvs.id`.

## NOT NULL

- Campos essenciais foram definidos como obrigatorios.
- Exemplos:
  - `users.full_name`
  - `users.email`
  - `users.password_hash`
  - `tvs.brand`
  - `tvs.model`
  - `devices.mac_address`
  - `commands.type`
  - `logs.message`
- Isso impede que dados incompletos sejam gravados.

## UNIQUE

- A constraint `UNIQUE` foi aplicada para evitar duplicidades indevidas.
- Exemplos:
  - `users.email`
  - `tvs.serial_number`
  - `devices.mac_address`
  - `devices.mqtt_topic`
  - `devices.tv_id`
  - `firmware_versions.code`
- Quando uma violacao ocorre, a API retorna erro HTTP `409 Conflict`.

## CHECK

- O MySQL e o Drizzle poderiam ser usados para regras `CHECK`, mas neste projeto os valores controlados foram modelados principalmente com `enum`.
- Exemplos equivalentes:
  - `users.role`: `viewer` ou `admin`.
  - `tvs.status`: `on`, `off` ou `offline`.
  - `devices.connectivity_status`: `online` ou `offline`.
  - `commands.status`: `pending`, `sent`, `acknowledged` ou `failed`.
- Assim, valores fora do dominio esperado sao rejeitados pelo banco.

## DEFAULT

- Valores padrao foram usados para simplificar criacao de registros.
- Exemplos:
  - `users.role` tem default `viewer`.
  - `users.is_active` tem default `true`.
  - `tvs.status` tem default `offline`.
  - `devices.connectivity_status` tem default `offline`.
  - `commands.status` tem default `pending`.
  - `created_at` usa o horario atual por padrao.
  - `updated_at` atualiza automaticamente em alteracoes.

## AUTOINCREMENT

- Todas as tabelas principais usam `AUTO_INCREMENT` em suas chaves primarias.
- Isso permite que o banco gere automaticamente o proximo identificador de cada registro.
- A seed tambem reseta os auto-increments para manter dados previsiveis em ambiente de teste.

## ON DELETE / UPDATE CASCADE

- O projeto aplica regras de delecao para manter um fluxo correto de remocao.
- Exemplos:
  - Ao deletar um usuario, seus comandos sao removidos com `ON DELETE CASCADE`.
  - Ao deletar um device, seus comandos tambem sao removidos com `ON DELETE CASCADE`.
  - Ao deletar uma TV, o device vinculado e removido com `ON DELETE CASCADE`.
  - Logs usam `ON DELETE SET NULL` para preservar historico mesmo quando usuario, TV ou device sao removidos.
- Essa escolha evita perda de auditoria e ao mesmo tempo impede bloqueios indevidos no delete.

## ENGINE

- O projeto foi pensado para MySQL com suporte a constraints e relacionamentos.
- Na pratica, o uso de chaves estrangeiras pressupoe mecanismo como InnoDB, que e o padrao mais comum do MySQL.
- O Drizzle gera as tabelas e o MySQL aplica o mecanismo configurado no servidor.

## Relacionamento 1:1

- O relacionamento entre `tvs` e `devices` representa um caso 1:1.
- Cada TV pode ter um device controlador, e cada device controla uma unica TV.
- Isso foi implementado pela FK `devices.tv_id` com constraint `UNIQUE`.

## Relacionamento 1:N

- O projeto possui diversos relacionamentos 1:N.
- Exemplos:
  - Uma `location` possui varias `tvs`.
  - Uma `location` possui varios `devices`.
  - Um `device` possui varios `commands`.
  - Uma `tv` pode estar associada a varios `logs`.
  - Um `device` pode estar associado a varios `logs`.
  - Um `user` pode criar varios `commands`.

## Relacionamento N:M

- O modelo atual nao possui uma tabela associativa N:M explicita.
- O escopo do IoTV foi modelado com relacionamentos 1:1 e 1:N, suficientes para representar TVs, devices, comandos e logs.
- Caso fosse necessario relacionar usuarios a multiplas locations com permissoes especificas, poderia ser criada uma tabela associativa como `user_locations`.

## Relacionamento Recursivo

- O projeto atual nao possui auto-relacionamento.
- Nenhuma entidade referencia outra linha da mesma tabela.
- Um exemplo possivel futuro seria uma hierarquia de locations, onde uma location poderia ter uma `parent_location_id`.

## Entidades

- As entidades principais do banco sao:
  - `users`
  - `locations`
  - `tvs`
  - `devices`
  - `commands`
  - `logs`
  - `firmware_versions`
- Cada entidade possui um CRUD exposto pela API.

## Mapeamento Objeto-Relacional

- O projeto utiliza Drizzle ORM para representar tabelas no arquivo `src/database/schema.ts`.
- Apesar de usar ORM para definir o schema e executar conexao, as queries da aplicacao foram escritas em SQL puro com `sql`.
- Os DTOs do NestJS representam os objetos recebidos pela API e sao convertidos em comandos SQL pelas queries.

## Validacao de Dados

- A validacao foi aplicada com `class-validator` nos DTOs.
- Exemplos:
  - `@IsString()` para campos textuais.
  - `@IsNumber()` para ids.
  - `@IsBoolean()` para `isActive`.
  - `@IsIn()` para enums.
  - `@IsDateString()` para datas em formato ISO.
- O `ValidationPipe` global remove campos desconhecidos e transforma entradas quando possivel.

## Comandos DDL

- DDL foi aplicado por meio das migrations do Drizzle.
- As migrations criam e alteram a estrutura do banco.
- Exemplos de arquivos:
  - `0000_initial_schema.sql`
  - `0001_create_log_views.sql`
  - `0002_add_user_is_active.sql`
  - `0003_update_user_delete_rules.sql`
  - `0004_update_tv_device_delete_rules.sql`

## CREATE

- O comando `CREATE` aparece na criacao das tabelas e views.
- Exemplos:
  - `CREATE TABLE users`
  - `CREATE TABLE devices`
  - `CREATE OR REPLACE VIEW logs_by_user_view`
- Tambem existe script `npm run db:create`, que executa `CREATE DATABASE IF NOT EXISTS`.

## DROP

- O comando `DROP` aparece em operacoes administrativas.
- Exemplos:
  - Migrations usam `DROP FOREIGN KEY` para alterar regras de relacionamento.
  - Scripts DCL possuem `DROP USER IF EXISTS` para remover usuarios administrativos do banco.

## ALTER

- O comando `ALTER` foi usado em migrations para evoluir o schema.
- Exemplos:
  - Adicao da coluna `is_active` em `users`.
  - Alteracao de chaves estrangeiras para `ON DELETE CASCADE` e `ON DELETE SET NULL`.

## TRUNCATE

- O projeto possui endpoint administrativo para limpeza de tabelas:
  - `POST /database/truncate`
- A query fica em `src/database/queries/truncateTable.ts`.
- O nome da tabela e validado por whitelist antes de usar `TRUNCATE TABLE`, evitando SQL injection.

## CREATE INDEX

- Indices unicos foram criados pelo schema do Drizzle como `uniqueIndex`.
- Exemplos:
  - `users_email_unique`
  - `tvs_serial_number_unique`
  - `devices_mac_address_unique`
  - `devices_mqtt_topic_unique`
  - `firmware_versions_code_unique`
- Esses indices melhoram busca e garantem unicidade.

## IF EXISTS

- O conceito aparece nos scripts DCL e administrativos.
- Exemplo:
  - `DROP USER IF EXISTS 'iotv_app'@'%'`
- Isso evita erro caso o usuario ainda nao exista.

## IF NOT EXISTS

- O conceito foi aplicado no script de criacao do banco:
  - `CREATE DATABASE IF NOT EXISTS`
- Tambem aparece nos scripts DCL:
  - `CREATE USER IF NOT EXISTS`
- Isso torna os scripts mais seguros para execucoes repetidas.

## Comandos DML

- DML e o grupo mais utilizado pela API.
- As operacoes CRUD usam:
  - `INSERT`
  - `SELECT`
  - `UPDATE`
  - `DELETE`
- Cada entidade possui arquivos de query separados em `src/database/queries`.

## INSERT

- O `INSERT` e usado nos endpoints de criacao.
- Exemplos:
  - `POST /users`
  - `POST /locations`
  - `POST /tvs`
  - `POST /devices`
  - `POST /commands`
  - `POST /logs`
  - `POST /firmware-versions`
- A seed tambem usa diversos inserts para popular a base.

## UPDATE

- O `UPDATE` e usado nos endpoints `PATCH`.
- As queries de update montam dinamicamente o `SET` com base nos campos recebidos.
- Exemplo: se apenas `status` for enviado para uma TV, somente a coluna `status` sera atualizada.
- Esse padrao esta documentado nos arquivos `update*.ts`.

## DELETE

- O `DELETE` e usado nos endpoints de remocao.
- Exemplos:
  - `DELETE /users/:id`
  - `DELETE /tvs/:id`
  - `DELETE /devices/:id`
- O fluxo foi ajustado com regras de cascata e `SET NULL` para evitar bloqueios indevidos mantendo logs de auditoria.

## Comandos DCL

- DCL foi aplicado por scripts SQL manuais, sem endpoints expostos.
- Os arquivos ficam em `src/database/dcl`.
- Exemplos:
  - Criacao de usuarios do banco.
  - Concessao de permissoes para usuario runtime da API.
  - Concessao de permissoes para migrations.
  - Revogacao de permissoes perigosas.

## GRANT

- O comando `GRANT` aparece nos scripts DCL.
- Exemplo:
  - `GRANT SELECT, INSERT, UPDATE, DELETE ON iotv.users TO 'iotv_app'@'%'`
- O objetivo e separar permissoes de runtime, manutencao e migrations.

## REVOKE

- O comando `REVOKE` foi aplicado no script `005_revoke_dangerous_app_permissions.sql`.
- Ele remove permissoes administrativas do usuario usado pela API.
- Isso reduz o risco de a aplicacao executar operacoes estruturais indevidas.

## Transacoes

- O projeto nao possui transacoes manuais complexas implementadas no codigo da API.
- As operacoes simples sao tratadas pelo MySQL como comandos atomicos.
- As migrations alteram estrutura e devem ser executadas de forma controlada.
- A seed executa uma sequencia de comandos para limpar e popular a base de desenvolvimento.

## Comandos DQL

- DQL foi aplicado nos endpoints de leitura.
- Exemplos:
  - `GET /users`
  - `GET /logs`
  - `GET /devices`
  - `GET /logs/by-user/:userId`
- As queries usam `SELECT`, `WHERE`, `ORDER BY`, `LIMIT` e `OFFSET`.

## SELECT sem JOIN

- Algumas buscas consultam diretamente uma unica tabela.
- Exemplos:
  - `findUsers.ts`
  - `findLogs.ts`
  - `findDevices.ts`
  - `findFirmwareVersions.ts`
- Essas queries retornam registros simples da entidade.

## SELECT com JOIN

- O conceito de JOIN foi aplicado dentro das views de logs.
- Exemplos:
  - `logs_by_user_view` usa `INNER JOIN users`.
  - `logs_by_tv_view` usa `INNER JOIN tvs`.
  - `logs_by_device_view` usa `INNER JOIN devices`.
- Essas views enriquecem os logs com dados de usuario, TV ou device.

## Filtros e Parametros de Busca

- A API possui filtros por parametros de rota e query string.
- Exemplos:
  - `GET /users?isActive=true`
  - `GET /users?isActive=false`
  - `GET /logs?limit=50&offset=0`
  - `GET /logs/by-user/:userId`
  - `GET /logs/by-tv/:tvId`
  - `GET /logs/by-device/:deviceId`
- Os logs sao retornados em paginas de no maximo 50 registros.

## ORDER BY

- Ordenacao foi aplicada principalmente nas consultas de logs.
- Os logs sao ordenados do mais recente para o mais antigo:
  - `ORDER BY createdAt DESC, id DESC`
- Outras listagens usam ordenacao por `id` para previsibilidade.

## LIMIT e OFFSET

- A paginacao de logs usa `LIMIT` e `OFFSET`.
- Exemplo:
  - `GET /logs?limit=50&offset=0`
  - `GET /logs/by-user/1?limit=25&offset=50`
- O service limita o valor maximo de `limit` para 50.

## SHOW

- O comando `SHOW` nao e exposto pela API.
- O equivalente operacional no projeto aparece por meio do Swagger, migrations e schema versionado, que documentam a estrutura disponivel.
- Para inspecao direta, comandos como `SHOW TABLES` e `SHOW COLUMNS` podem ser usados no MySQL Workbench.

## Functions

- O projeto atual nao cria functions diretamente no banco.
- A logica reutilizavel foi implementada na camada de aplicacao, por exemplo:
  - Normalizacao de paginacao em `log-pagination.ts`.
  - Conversao de erros SQL em respostas HTTP no filtro global de exceptions.
- Caso necessario, functions SQL poderiam ser adicionadas em migrations futuras.

## Stored Procedures

- O projeto atual nao utiliza stored procedures.
- As operacoes foram mantidas como queries SQL em arquivos TypeScript separados, dentro de `src/database/queries`.
- Essa escolha manteve o fluxo mais visivel na API e facilitou a avaliacao do CRUD.

## Triggers

- O projeto atual nao cria triggers no banco.
- Comportamentos automaticos foram tratados por constraints e defaults, como:
  - `created_at` com valor padrao.
  - `updated_at` com atualizacao automatica.
  - regras `ON DELETE CASCADE` e `ON DELETE SET NULL`.
- Uma trigger futura poderia registrar auditoria automaticamente, mas neste projeto os logs sao criados via API.

## Views

- Views foram implementadas para consultas especiais de logs.
- Views criadas:
  - `logs_by_user_view`
  - `logs_by_tv_view`
  - `logs_by_device_view`
- Elas sao usadas pelos endpoints:
  - `GET /logs/by-user/:userId`
  - `GET /logs/by-tv/:tvId`
  - `GET /logs/by-device/:deviceId`
- O objetivo e centralizar consultas com JOIN e facilitar leitura dos dados.

## CTE - Common Table Expression

- O projeto atual nao possui CTE implementada.
- As consultas atuais foram resolvidas com SELECTs simples e views.
- Uma CTE poderia ser aplicada futuramente em relatorios, por exemplo para calcular estatisticas temporarias de logs por device antes de retornar um ranking.

## Integracao com Aplicacao

- A integracao foi feita com NestJS, TypeScript, Drizzle ORM e MySQL.
- O `DatabaseService` centraliza a conexao com o banco.
- Os controllers expõem endpoints REST.
- Os services orquestram chamadas para as queries.
- As queries ficam isoladas em `src/database/queries`.
- O Swagger documenta todos os endpoints em `/api`.

## Migrations

- As migrations controlam a evolucao do banco.
- Elas permitem criar a estrutura inicial, views e alteracoes posteriores.
- Comandos principais:
  - `npm run db:create`
  - `npm run db:migrate`
  - `npm run db:generate`

## Seed

- A seed robusta popula a base com dados de demonstracao.
- Ela cria usuarios ativos e inativos, locations, TVs, devices, firmwares, comandos e logs.
- Comando:
  - `npm run db:seed`
- Isso facilita testes dos endpoints e das views.

## Swagger / OpenAPI

- O projeto possui documentacao interativa via Swagger.
- Endereco:
  - `http://localhost:3000/api`
- Todos os endpoints foram documentados.
- Os DTOs possuem exemplos de payload para testes de POST e PATCH.

## Tratamento de Erros HTTP

- Foi criado um filtro global para converter erros do MySQL em respostas HTTP adequadas.
- Exemplos:
  - E-mail duplicado retorna `409 Conflict`.
  - Chave estrangeira inexistente retorna `400 Bad Request`.
  - Registro em uso retorna `409 Conflict`.
- Isso evita que erros conhecidos do banco retornem como `500 Internal Server Error`.

## Conclusao

- O banco do IoTV aplica os principais conceitos da disciplina em um sistema relacional real.
- O projeto contempla modelagem, constraints, relacionamentos, DDL, DML, DCL, DQL, views, migrations, seed, integracao com API e documentacao Swagger.
- Conceitos como stored procedures, triggers, functions e CTE foram discutidos no relatorio, mas nao foram implementados como objetos SQL reais porque a arquitetura escolhida concentrou a logica na camada de aplicacao e nas queries SQL versionadas.
