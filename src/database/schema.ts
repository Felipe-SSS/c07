import {
  boolean,
  int,
  json,
  mysqlEnum,
  mysqlTable,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from 'drizzle-orm/mysql-core';

export const users = mysqlTable(
  'users',
  {
    id: int('id').autoincrement().primaryKey(),
    fullName: varchar('full_name', { length: 255 }).notNull(),
    email: varchar('email', { length: 255 }).notNull(),
    passwordHash: varchar('password_hash', { length: 255 }).notNull(),
    role: mysqlEnum('role', ['viewer', 'admin']).notNull().default('viewer'),
    isActive: boolean('is_active').notNull().default(true),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
  },
  (table) => ({
    emailIdx: uniqueIndex('users_email_unique').on(table.email),
  }),
);

export const locations = mysqlTable('locations', {
  id: int('id').autoincrement().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  address: varchar('address', { length: 255 }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
});

export const tvs = mysqlTable(
  'tvs',
  {
    id: int('id').autoincrement().primaryKey(),
    brand: varchar('brand', { length: 120 }).notNull(),
    model: varchar('model', { length: 120 }).notNull(),
    serialNumber: varchar('serial_number', { length: 120 }).notNull(),
    status: mysqlEnum('status', ['on', 'off', 'offline']).notNull().default('offline'),
    locationId: int('location_id')
      .notNull()
      .references(() => locations.id),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
  },
  (table) => ({
    serialIdx: uniqueIndex('tvs_serial_number_unique').on(table.serialNumber),
  }),
);

export const firmwareVersions = mysqlTable(
  'firmware_versions',
  {
    id: int('id').autoincrement().primaryKey(),
    code: varchar('code', { length: 120 }).notNull(),
    version: varchar('version', { length: 80 }).notNull(),
    changelog: text('changelog'),
    releaseDate: timestamp('release_date'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
  },
  (table) => ({
    codeIdx: uniqueIndex('firmware_versions_code_unique').on(table.code),
  }),
);

export const devices = mysqlTable(
  'devices',
  {
    id: int('id').autoincrement().primaryKey(),
    macAddress: varchar('mac_address', { length: 17 }).notNull(),
    firmwareVersion: varchar('firmware_version', { length: 80 }).notNull(),
    firmwareVersionId: int('firmware_version_id').references(() => firmwareVersions.id),
    mqttTopic: varchar('mqtt_topic', { length: 255 }).notNull(),
    connectivityStatus: mysqlEnum('connectivity_status', ['online', 'offline']).notNull().default('offline'),
    tvId: int('tv_id')
      .notNull()
      .references(() => tvs.id, { onDelete: 'cascade' }),
    locationId: int('location_id')
      .notNull()
      .references(() => locations.id),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
  },
  (table) => ({
    macIdx: uniqueIndex('devices_mac_address_unique').on(table.macAddress),
    mqttIdx: uniqueIndex('devices_mqtt_topic_unique').on(table.mqttTopic),
    tvIdx: uniqueIndex('devices_tv_id_unique').on(table.tvId),
  }),
);

export const commands = mysqlTable('commands', {
  id: int('id').autoincrement().primaryKey(),
  type: mysqlEnum('type', ['turn_on', 'turn_off', 'restart', 'update_firmware']).notNull(),
  payload: json('payload'),
  status: mysqlEnum('status', ['pending', 'sent', 'acknowledged', 'failed']).notNull().default('pending'),
  sentAt: timestamp('sent_at'),
  respondedAt: timestamp('responded_at'),
  createdByUserId: int('created_by_user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  deviceId: int('device_id')
    .notNull()
    .references(() => devices.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
});

export const logs = mysqlTable('logs', {
  id: int('id').autoincrement().primaryKey(),
  type: varchar('type', { length: 120 }).notNull(),
  category: varchar('category', { length: 120 }).notNull(),
  message: text('message').notNull(),
  metadata: json('metadata'),
  actorUserId: int('actor_user_id').references(() => users.id, { onDelete: 'set null' }),
  deviceId: int('device_id').references(() => devices.id, { onDelete: 'set null' }),
  tvId: int('tv_id').references(() => tvs.id, { onDelete: 'set null' }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});
