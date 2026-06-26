# Endpoints para teste

Base URL local:

```txt
http://localhost:3000
```

## Users

### Criar usuario

```http
POST /users
Content-Type: application/json

{
  "fullName": "Usuario Teste",
  "email": "usuario.teste@iotv.local",
  "passwordHash": "$2b$10$hash-de-exemplo",
  "role": "admin",
  "isActive": true
}
```

### Listar usuarios

```http
GET /users
```

### Listar usuarios ativos

```http
GET /users?isActive=true
```

### Listar usuarios inativos

```http
GET /users?isActive=false
```

### Buscar usuario por ID

```http
GET /users/1
```

### Atualizar usuario

```http
PATCH /users/1
Content-Type: application/json

{
  "fullName": "Usuario Atualizado",
  "isActive": false
}
```

### Remover usuario

```http
DELETE /users/1
```

## Locations

### Criar local

```http
POST /locations
Content-Type: application/json

{
  "name": "Sala de Testes",
  "description": "Ambiente usado para testes da API",
  "address": "Bloco X - Sala 101"
}
```

### Listar locais

```http
GET /locations
```

### Buscar local por ID

```http
GET /locations/1
```

### Atualizar local

```http
PATCH /locations/1
Content-Type: application/json

{
  "name": "Sala de Testes Atualizada"
}
```

### Remover local

```http
DELETE /locations/1
```

## TVs

### Criar TV

```http
POST /tvs
Content-Type: application/json

{
  "brand": "Samsung",
  "model": "IoTV-55P",
  "serialNumber": "TVSN-TEST-001",
  "status": "offline",
  "locationId": 1
}
```

### Listar TVs

```http
GET /tvs
```

### Buscar TV por ID

```http
GET /tvs/1
```

### Atualizar TV

```http
PATCH /tvs/1
Content-Type: application/json

{
  "status": "on"
}
```

### Remover TV

```http
DELETE /tvs/1
```

## Firmware Versions

### Criar versao de firmware

```http
POST /firmware-versions
Content-Type: application/json

{
  "code": "FW-TEST-001",
  "version": "1.0.0",
  "changelog": "Versao de teste",
  "releaseDate": "2026-06-26T10:00:00Z"
}
```

### Listar versoes de firmware

```http
GET /firmware-versions
```

### Buscar versao por ID

```http
GET /firmware-versions/1
```

### Atualizar versao

```http
PATCH /firmware-versions/1
Content-Type: application/json

{
  "changelog": "Changelog atualizado"
}
```

### Remover versao

```http
DELETE /firmware-versions/1
```

## Devices

### Criar device

```http
POST /devices
Content-Type: application/json

{
  "macAddress": "02:42:AC:11:99:01",
  "firmwareVersion": "1.0.0",
  "firmwareVersionId": 1,
  "mqttTopic": "iotv/test/devices/001",
  "connectivityStatus": "online",
  "tvId": 1,
  "locationId": 1
}
```

### Listar devices

```http
GET /devices
```

### Buscar device por ID

```http
GET /devices/1
```

### Atualizar device

```http
PATCH /devices/1
Content-Type: application/json

{
  "connectivityStatus": "offline"
}
```

### Remover device

```http
DELETE /devices/1
```

## Commands

### Criar comando

```http
POST /commands
Content-Type: application/json

{
  "type": "turn_on",
  "payload": {
    "source": "manual-test",
    "expectedState": "on"
  },
  "status": "pending",
  "createdByUserId": 1,
  "deviceId": 1
}
```

### Listar comandos

```http
GET /commands
```

### Buscar comando por ID

```http
GET /commands/1
```

### Atualizar comando

```http
PATCH /commands/1
Content-Type: application/json

{
  "status": "acknowledged",
  "respondedAt": "2026-06-26T10:10:00Z"
}
```

### Remover comando

```http
DELETE /commands/1
```

## Logs

### Criar log

```http
POST /logs
Content-Type: application/json

{
  "type": "manual_test",
  "category": "audit",
  "message": "Log criado manualmente para teste",
  "metadata": {
    "origin": "ENDPOINTS.md"
  },
  "actorUserId": 1,
  "deviceId": 1,
  "tvId": 1
}
```

### Listar logs

Retorna no maximo 50 registros por chamada, do mais recente para o mais antigo.

```http
GET /logs?limit=50&offset=0
```

### Buscar logs por usuario

```http
GET /logs/by-user/1?limit=50&offset=0
```

### Buscar logs por TV

```http
GET /logs/by-tv/1?limit=50&offset=0
```

### Buscar logs por device

```http
GET /logs/by-device/1?limit=50&offset=0
```

### Buscar log por ID

```http
GET /logs/1
```

### Atualizar log

```http
PATCH /logs/1
Content-Type: application/json

{
  "message": "Mensagem do log atualizada"
}
```

### Remover log

```http
DELETE /logs/1
```

## Database

### Truncar tabela permitida

```http
POST /database/truncate
Content-Type: application/json

{
  "tableName": "logs"
}
```

Tabelas aceitas:

- `users`
- `locations`
- `tvs`
- `devices`
- `commands`
- `logs`
- `firmware_versions`
