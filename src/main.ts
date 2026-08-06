import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true })); // Enable validation and transformation for incoming requests

  // Use ConfigService to read PORT from environment (.env)
  const configService = app.get(ConfigService);
  const port = Number(configService.get<number>('PORT'));

  const config = new DocumentBuilder()
    .setTitle('Pastebin Clone API (NestJS)')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document); // Set up Swagger documentation at the /docs endpoint
  try {
    await app.listen(port);
  } catch (error) {
    console.error('Error occurred while starting the server:', error);
    process.exit(1); // Exit the process with an error code
  }
}
void bootstrap();
