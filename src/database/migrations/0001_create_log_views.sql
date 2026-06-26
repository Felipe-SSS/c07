CREATE OR REPLACE VIEW logs_by_user_view AS
SELECT
  logs.id,
  logs.type,
  logs.category,
  logs.message,
  logs.metadata,
  logs.actor_user_id AS userId,
  users.full_name AS userFullName,
  users.email AS userEmail,
  logs.device_id AS deviceId,
  logs.tv_id AS tvId,
  logs.created_at AS createdAt
FROM logs
INNER JOIN users ON users.id = logs.actor_user_id;
--> statement-breakpoint
CREATE OR REPLACE VIEW logs_by_tv_view AS
SELECT
  logs.id,
  logs.type,
  logs.category,
  logs.message,
  logs.metadata,
  logs.actor_user_id AS userId,
  logs.device_id AS deviceId,
  logs.tv_id AS tvId,
  tvs.brand AS tvBrand,
  tvs.model AS tvModel,
  tvs.serial_number AS tvSerialNumber,
  tvs.status AS tvStatus,
  logs.created_at AS createdAt
FROM logs
INNER JOIN tvs ON tvs.id = logs.tv_id;
--> statement-breakpoint
CREATE OR REPLACE VIEW logs_by_device_view AS
SELECT
  logs.id,
  logs.type,
  logs.category,
  logs.message,
  logs.metadata,
  logs.actor_user_id AS userId,
  logs.device_id AS deviceId,
  devices.mac_address AS deviceMacAddress,
  devices.mqtt_topic AS deviceMqttTopic,
  devices.connectivity_status AS deviceConnectivityStatus,
  logs.tv_id AS tvId,
  logs.created_at AS createdAt
FROM logs
INNER JOIN devices ON devices.id = logs.device_id;
