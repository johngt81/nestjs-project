import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { json } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true
  });
  app.use(json({limit: '60mb'})); //limit payload request size

  app.enableVersioning({
    defaultVersion: '1',
    type: VersioningType.URI
  })

  app.useGlobalPipes(new ValidationPipe());
  
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('API Documentation')
    .setDescription('API definition')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app,config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
