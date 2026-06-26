import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

type DatabaseError = Error & {
  code?: string;
  errno?: number;
  sqlMessage?: string;
  sqlState?: string;
};

const isDatabaseError = (exception: unknown): exception is DatabaseError => {
  if (!(exception instanceof Error)) return false;
  return 'code' in exception || 'errno' in exception || 'sqlMessage' in exception;
};

const getDuplicateMessage = (error: DatabaseError) => {
  const rawMessage = error.sqlMessage ?? error.message;

  if (rawMessage.includes('users_email_unique')) {
    return 'Ja existe um usuario cadastrado com este e-mail.';
  }

  if (rawMessage.includes('tvs_serial_number_unique')) {
    return 'Ja existe uma TV cadastrada com este numero de serie.';
  }

  if (rawMessage.includes('devices_mac_address_unique')) {
    return 'Ja existe um device cadastrado com este endereco MAC.';
  }

  if (rawMessage.includes('devices_mqtt_topic_unique')) {
    return 'Ja existe um device cadastrado com este topico MQTT.';
  }

  if (rawMessage.includes('devices_tv_id_unique')) {
    return 'Esta TV ja esta vinculada a outro device.';
  }

  if (rawMessage.includes('firmware_versions_code_unique')) {
    return 'Ja existe uma versao de firmware cadastrada com este codigo.';
  }

  return 'Ja existe um registro com um valor unico informado.';
};

const mapDatabaseError = (error: DatabaseError) => {
  switch (error.code) {
    case 'ER_DUP_ENTRY':
      return {
        statusCode: HttpStatus.CONFLICT,
        error: 'Conflict',
        message: getDuplicateMessage(error),
      };

    case 'ER_NO_REFERENCED_ROW':
    case 'ER_NO_REFERENCED_ROW_2':
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        error: 'Bad Request',
        message: 'Um dos relacionamentos informados nao existe no banco de dados.',
      };

    case 'ER_ROW_IS_REFERENCED':
    case 'ER_ROW_IS_REFERENCED_2':
      return {
        statusCode: HttpStatus.CONFLICT,
        error: 'Conflict',
        message: 'Este registro nao pode ser removido porque ainda esta sendo usado por outra tabela.',
      };

    case 'ER_TRUNCATE_ILLEGAL_FK':
      return {
        statusCode: HttpStatus.CONFLICT,
        error: 'Conflict',
        message: 'Esta tabela nao pode ser limpa enquanto houver chaves estrangeiras dependentes.',
      };

    case 'ER_BAD_NULL_ERROR':
    case 'ER_DATA_TOO_LONG':
    case 'WARN_DATA_TRUNCATED':
    case 'ER_TRUNCATED_WRONG_VALUE':
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        error: 'Bad Request',
        message: 'Os dados enviados nao respeitam as restricoes da tabela.',
      };

    default:
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'Internal Server Error',
        message: 'Erro inesperado ao acessar o banco de dados.',
      };
  }
};

@Catch()
export class DatabaseExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse();
    const request = context.getRequest();

    if (exception instanceof HttpException) {
      const statusCode = exception.getStatus();
      response.status(statusCode).json(exception.getResponse());
      return;
    }

    if (!isDatabaseError(exception)) {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'Internal Server Error',
        message: 'Erro interno inesperado.',
        path: request.url,
        timestamp: new Date().toISOString(),
      });
      return;
    }

    const mappedError = mapDatabaseError(exception);
    response.status(mappedError.statusCode).json({
      ...mappedError,
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}
