import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { sql } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/mysql2';
import { createPool } from 'mysql2/promise';

type UserSeed = {
  id: number;
  fullName: string;
  email: string;
  role: 'viewer' | 'admin';
  isActive: boolean;
};

type LocationSeed = {
  id: number;
  name: string;
  description: string;
  address: string;
};

type FirmwareSeed = {
  id: number;
  code: string;
  version: string;
  changelog: string;
  releaseDate: string;
};

type TvSeed = {
  id: number;
  brand: string;
  model: string;
  serialNumber: string;
  status: 'on' | 'off' | 'offline';
  locationId: number;
};

type DeviceSeed = {
  id: number;
  macAddress: string;
  firmwareVersion: string;
  firmwareVersionId: number;
  mqttTopic: string;
  connectivityStatus: 'online' | 'offline';
  tvId: number;
  locationId: number;
};

type CommandSeed = {
  id: number;
  type: 'turn_on' | 'turn_off' | 'restart' | 'update_firmware';
  payload: Record<string, unknown>;
  status: 'pending' | 'sent' | 'acknowledged' | 'failed';
  sentAt: string | null;
  respondedAt: string | null;
  createdByUserId: number;
  deviceId: number;
};

type LogSeed = {
  type: string;
  category: string;
  message: string;
  metadata: Record<string, unknown>;
  actorUserId: number | null;
  deviceId: number | null;
  tvId: number | null;
  createdAt: string;
};

const loadEnvFile = () => {
  const envPath = resolve(process.cwd(), '.env');
  if (!existsSync(envPath)) return;

  const env = readFileSync(envPath, 'utf8');
  for (const line of env.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const separatorIndex = trimmed.indexOf('=');
    if (separatorIndex === -1) continue;

    const key = trimmed.slice(0, separatorIndex).trim();
    const value = trimmed.slice(separatorIndex + 1).trim().replace(/^['"]|['"]$/g, '');
    process.env[key] ??= value;
  }
};

const toDateTime = (date: Date) => date.toISOString().slice(0, 19).replace('T', ' ');

const minutesAgo = (minutes: number) => toDateTime(new Date(Date.now() - minutes * 60_000));

const users: UserSeed[] = [
  { id: 1, fullName: 'Ana Martins', email: 'ana.admin@iotv.local', role: 'admin', isActive: true },
  { id: 2, fullName: 'Felipe Soares', email: 'felipe@iotv.local', role: 'admin', isActive: true },
  { id: 3, fullName: 'Bruna Costa', email: 'bruna.viewer@iotv.local', role: 'viewer', isActive: true },
  { id: 4, fullName: 'Carlos Lima', email: 'carlos.viewer@iotv.local', role: 'viewer', isActive: true },
  { id: 5, fullName: 'Daniel Rocha', email: 'daniel.ops@iotv.local', role: 'admin', isActive: true },
  { id: 6, fullName: 'Marina Alves', email: 'marina.viewer@iotv.local', role: 'viewer', isActive: true },
  { id: 7, fullName: 'Joao Pereira', email: 'joao.inativo@iotv.local', role: 'viewer', isActive: false },
  { id: 8, fullName: 'Larissa Gomes', email: 'larissa.inativa@iotv.local', role: 'admin', isActive: false },
];

const locations: LocationSeed[] = [
  { id: 1, name: 'Recepcao', description: 'Entrada principal com TV de boas-vindas.', address: 'Bloco A - Terreo' },
  { id: 2, name: 'Laboratorio IoT', description: 'Ambiente de testes de dispositivos conectados.', address: 'Bloco B - Sala 204' },
  { id: 3, name: 'Biblioteca', description: 'Area de estudos e comunicados academicos.', address: 'Bloco C - Piso 1' },
  { id: 4, name: 'Auditorio', description: 'Espaco para eventos e apresentacoes.', address: 'Bloco D - Terreo' },
  { id: 5, name: 'Cantina', description: 'Area de convivencia com televisores informativos.', address: 'Bloco A - Piso 1' },
  { id: 6, name: 'Corredor Central', description: 'Circulacao principal entre blocos.', address: 'Passarela Principal' },
];

const firmwareVersions: FirmwareSeed[] = [
  { id: 1, code: 'FW-IOTV-100', version: '1.0.0', changelog: 'Versao inicial com controle liga/desliga.', releaseDate: '2025-01-10 09:00:00' },
  { id: 2, code: 'FW-IOTV-110', version: '1.1.0', changelog: 'Melhorias de reconexao MQTT.', releaseDate: '2025-03-18 09:00:00' },
  { id: 3, code: 'FW-IOTV-120', version: '1.2.0', changelog: 'Telemetria de status e resposta de comandos.', releaseDate: '2025-06-02 09:00:00' },
  { id: 4, code: 'FW-IOTV-130', version: '1.3.0', changelog: 'Otimizacao de logs e estabilidade.', releaseDate: '2025-09-22 09:00:00' },
  { id: 5, code: 'FW-IOTV-200', version: '2.0.0', changelog: 'Suporte a atualizacao OTA.', releaseDate: '2026-02-14 09:00:00' },
];

const tvs: TvSeed[] = Array.from({ length: 18 }, (_, index) => {
  const id = index + 1;
  const brands = ['Samsung', 'LG', 'Philips', 'TCL', 'Sony', 'AOC'];
  const statuses: TvSeed['status'][] = ['on', 'off', 'offline'];
  return {
    id,
    brand: brands[index % brands.length],
    model: `IoTV-${43 + (index % 5) * 5}P-${1000 + id}`,
    serialNumber: `TVSN-${String(id).padStart(5, '0')}`,
    status: statuses[index % statuses.length],
    locationId: (index % locations.length) + 1,
  };
});

const devices: DeviceSeed[] = tvs.map((tv, index) => {
  const firmware = firmwareVersions[index % firmwareVersions.length];
  return {
    id: tv.id,
    macAddress: `02:42:AC:11:${String(index + 1).padStart(2, '0')}:${String(index + 11).padStart(2, '0')}`,
    firmwareVersion: firmware.version,
    firmwareVersionId: firmware.id,
    mqttTopic: `iotv/locations/${tv.locationId}/devices/${String(tv.id).padStart(3, '0')}`,
    connectivityStatus: tv.status === 'offline' ? 'offline' : 'online',
    tvId: tv.id,
    locationId: tv.locationId,
  };
});

const commandTypes: CommandSeed['type'][] = ['turn_on', 'turn_off', 'restart', 'update_firmware'];
const commandStatuses: CommandSeed['status'][] = ['pending', 'sent', 'acknowledged', 'failed'];

const commands: CommandSeed[] = devices.flatMap((device, deviceIndex) =>
  Array.from({ length: 3 }, (_, commandIndex) => {
    const id = deviceIndex * 3 + commandIndex + 1;
    const status = commandStatuses[(deviceIndex + commandIndex) % commandStatuses.length];
    const sentAt = status === 'pending' ? null : minutesAgo(600 - id * 4);
    const respondedAt = status === 'acknowledged' || status === 'failed' ? minutesAgo(596 - id * 4) : null;

    return {
      id,
      type: commandTypes[(deviceIndex + commandIndex) % commandTypes.length],
      payload: {
        source: 'seed',
        requestId: `seed-command-${id}`,
        expectedState: commandIndex % 2 === 0 ? 'on' : 'off',
      },
      status,
      sentAt,
      respondedAt,
      createdByUserId: (deviceIndex % 6) + 1,
      deviceId: device.id,
    };
  }),
);

const logs: LogSeed[] = [
  ...devices.flatMap((device, index) => [
    {
      type: 'device_connectivity',
      category: 'device',
      message: `Dispositivo ${device.macAddress} reportou status ${device.connectivityStatus}.`,
      metadata: { mqttTopic: device.mqttTopic, firmwareVersion: device.firmwareVersion },
      actorUserId: null,
      deviceId: device.id,
      tvId: device.tvId,
      createdAt: minutesAgo(900 - index * 6),
    },
    {
      type: 'tv_status',
      category: 'tv',
      message: `TV ${device.tvId} sincronizada com status ${tvs[index].status}.`,
      metadata: { locationId: device.locationId, status: tvs[index].status },
      actorUserId: (index % 6) + 1,
      deviceId: device.id,
      tvId: device.tvId,
      createdAt: minutesAgo(850 - index * 6),
    },
  ]),
  ...commands.map((command, index) => ({
    type: 'command_lifecycle',
    category: 'command',
    message: `Comando ${command.type} registrado com status ${command.status}.`,
    metadata: { commandId: command.id, payload: command.payload },
    actorUserId: command.createdByUserId,
    deviceId: command.deviceId,
    tvId: command.deviceId,
    createdAt: minutesAgo(700 - index * 5),
  })),
  ...Array.from({ length: 36 }, (_, index) => {
    const device = devices[index % devices.length];
    const user = users[index % users.length];
    return {
      type: index % 2 === 0 ? 'audit_access' : 'system_health',
      category: index % 2 === 0 ? 'audit' : 'system',
      message: index % 2 === 0 ? `${user.fullName} consultou o dashboard IoTV.` : 'Rotina de monitoramento executada com sucesso.',
      metadata: { seedBatch: 'robust-demo', sequence: index + 1 },
      actorUserId: index % 2 === 0 ? user.id : null,
      deviceId: index % 3 === 0 ? device.id : null,
      tvId: index % 3 === 0 ? device.tvId : null,
      createdAt: minutesAgo(420 - index * 7),
    };
  }),
];

const run = async () => {
  loadEnvFile();

  const pool = createPool({
    host: process.env.DB_HOST ?? 'localhost',
    port: Number(process.env.DB_PORT ?? 3306),
    user: process.env.DB_USER ?? 'root',
    password: process.env.DB_PASSWORD ?? '',
    database: process.env.DB_NAME ?? 'iotv',
    connectionLimit: 4,
  });

  const db = drizzle(pool);

  try {
    console.log('Limpando tabelas...');
    await db.execute(sql`SET FOREIGN_KEY_CHECKS = 0`);
    for (const table of ['logs', 'commands', 'devices', 'tvs', 'firmware_versions', 'locations', 'users']) {
      await db.execute(sql`DELETE FROM ${sql.raw(table)}`);
      await db.execute(sql`ALTER TABLE ${sql.raw(table)} AUTO_INCREMENT = 1`);
    }
    await db.execute(sql`SET FOREIGN_KEY_CHECKS = 1`);

    console.log('Inserindo usuarios...');
    for (const user of users) {
      await db.execute(sql`
        INSERT INTO users (id, full_name, email, password_hash, role, is_active)
        VALUES (
          ${user.id}, ${user.fullName}, ${user.email},
          '$2b$10$seedhashsomenteparademonstracao', ${user.role}, ${user.isActive}
        )
      `);
    }

    console.log('Inserindo locais...');
    for (const location of locations) {
      await db.execute(sql`
        INSERT INTO locations (id, name, description, address)
        VALUES (${location.id}, ${location.name}, ${location.description}, ${location.address})
      `);
    }

    console.log('Inserindo firmwares...');
    for (const firmware of firmwareVersions) {
      await db.execute(sql`
        INSERT INTO firmware_versions (id, code, version, changelog, release_date)
        VALUES (${firmware.id}, ${firmware.code}, ${firmware.version}, ${firmware.changelog}, ${firmware.releaseDate})
      `);
    }

    console.log('Inserindo TVs...');
    for (const tv of tvs) {
      await db.execute(sql`
        INSERT INTO tvs (id, brand, model, serial_number, status, location_id)
        VALUES (${tv.id}, ${tv.brand}, ${tv.model}, ${tv.serialNumber}, ${tv.status}, ${tv.locationId})
      `);
    }

    console.log('Inserindo devices...');
    for (const device of devices) {
      await db.execute(sql`
        INSERT INTO devices (
          id, mac_address, firmware_version, firmware_version_id, mqtt_topic,
          connectivity_status, tv_id, location_id
        )
        VALUES (
          ${device.id}, ${device.macAddress}, ${device.firmwareVersion}, ${device.firmwareVersionId},
          ${device.mqttTopic}, ${device.connectivityStatus}, ${device.tvId}, ${device.locationId}
        )
      `);
    }

    console.log('Inserindo comandos...');
    for (const command of commands) {
      await db.execute(sql`
        INSERT INTO commands (
          id, type, payload, status, sent_at, responded_at, created_by_user_id, device_id
        )
        VALUES (
          ${command.id}, ${command.type}, ${JSON.stringify(command.payload)}, ${command.status},
          ${command.sentAt}, ${command.respondedAt}, ${command.createdByUserId}, ${command.deviceId}
        )
      `);
    }

    console.log('Inserindo logs...');
    for (const log of logs) {
      await db.execute(sql`
        INSERT INTO logs (
          type, category, message, metadata, actor_user_id, device_id, tv_id, created_at
        )
        VALUES (
          ${log.type}, ${log.category}, ${log.message}, ${JSON.stringify(log.metadata)},
          ${log.actorUserId}, ${log.deviceId}, ${log.tvId}, ${log.createdAt}
        )
      `);
    }

    console.log('Seed finalizada com sucesso.');
    console.log(`Usuarios: ${users.length}`);
    console.log(`Locais: ${locations.length}`);
    console.log(`Firmwares: ${firmwareVersions.length}`);
    console.log(`TVs: ${tvs.length}`);
    console.log(`Devices: ${devices.length}`);
    console.log(`Comandos: ${commands.length}`);
    console.log(`Logs: ${logs.length}`);
  } finally {
    await pool.end();
  }
};

run().catch((error: unknown) => {
  console.error('Erro ao executar seed:', error);
  process.exitCode = 1;
});
