import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { DatabaseExceptionFilter } from './common/filters/database-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  app.useGlobalFilters(new DatabaseExceptionFilter());

  const swaggerConfig = new DocumentBuilder()
    .setTitle('IoTV API')
    .setDescription('API para gerenciamento de TVs, devices IoT, comandos, logs e firmware.')
    .setVersion('1.0.0')
    .addTag('users', 'CRUD e filtros de usuarios')
    .addTag('locations', 'CRUD de locais fisicos')
    .addTag('tvs', 'CRUD de televisores')
    .addTag('devices', 'CRUD de dispositivos IoT')
    .addTag('commands', 'CRUD de comandos enviados aos devices')
    .addTag('logs', 'CRUD, views e paginacao de logs')
    .addTag('firmware-versions', 'CRUD de versoes de firmware')
    .addTag('database', 'Operacoes administrativas de banco')
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, swaggerDocument);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 3000);
  await app.listen(port);
}

void bootstrap();
