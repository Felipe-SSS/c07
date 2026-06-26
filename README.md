# IoTV API

API em NestJS, TypeScript, Drizzle ORM e MySQL para o projeto da disciplina Banco de Dados 1.

## Entidades

- `users`
- `locations`
- `tvs`
- `devices`
- `commands`
- `logs`
- `firmware_versions`

## Configuracao

Copie `.env.example` para `.env` e ajuste as credenciais do MySQL.

```bash
npm install
npm run db:create
npm run db:migrate
npm run db:seed
npm run start:dev
```

O comando `db:create` cria o database definido em `DB_NAME`, caso ele ainda nao exista.

A documentacao Swagger fica disponivel em:

```txt
http://localhost:3000/api
```

## Endpoints CRUD

Cada entidade possui:

- `POST /resource`
- `GET /resource`
- `GET /resource/:id`
- `PATCH /resource/:id`
- `DELETE /resource/:id`

Filtros disponiveis:

- `GET /users?isActive=true`
- `GET /users?isActive=false`

## Manutencao de tabelas

Para limpar uma tabela permitida:

```http
POST /database/truncate
Content-Type: application/json

{
  "tableName": "logs"
}
```

Tabelas aceitas: `users`, `locations`, `tvs`, `devices`, `commands`, `logs`, `firmware_versions`.

## DCL

Os comandos DCL ficam em `src/database/dcl` e nao sao expostos por endpoints.
Eles devem ser executados manualmente no MySQL com um usuario administrador.

Scripts disponiveis:

- `001_create_database_users.sql`: cria usuarios separados para runtime, manutencao e migrations.
- `002_grant_app_permissions.sql`: concede CRUD e SELECT nas views para o usuario da API.
- `003_grant_maintenance_permissions.sql`: concede permissoes necessarias para rotinas como truncate.
- `004_grant_migrator_permissions.sql`: concede permissoes para rodar migrations.
- `005_revoke_dangerous_app_permissions.sql`: remove permissoes administrativas do usuario da API.
- `999_drop_database_users.sql`: remove os usuarios criados pelos scripts DCL.

Exemplo:

```bash
mysql -u root -p < src/database/dcl/001_create_database_users.sql
mysql -u root -p < src/database/dcl/002_grant_app_permissions.sql
```

Recursos disponiveis:

- `/users`
- `/locations`
- `/tvs`
- `/devices`
- `/commands`
- `/logs`
- `/firmware-versions`

Todas as queries da aplicacao ficam em `src/database/queries` e usam `sql` puro do Drizzle.
As migrations ficam em `src/database/migrations` e sao controladas pelo Drizzle Kit.

## Seed

Depois de rodar as migrations, popule a base com dados de demonstracao:

```bash
npm run db:seed
```

A seed fica em `src/database/seeds/seed.ts`, limpa as tabelas na ordem correta e recria uma base robusta com usuarios ativos/inativos, locais, TVs, devices, firmwares, comandos e logs.

## Views de logs

A migration `0001_create_log_views.sql` cria:

- `logs_by_user_view`
- `logs_by_tv_view`
- `logs_by_device_view`

Rotas de consulta:

- `GET /logs/by-user/:userId`
- `GET /logs/by-tv/:tvId`
- `GET /logs/by-device/:deviceId`

As consultas de logs retornam no maximo 50 registros por chamada, ordenados do mais recente para o mais antigo.
Use `limit` e `offset` para paginar:

- `GET /logs?limit=50&offset=0`
- `GET /logs/by-user/1?limit=25&offset=50`
