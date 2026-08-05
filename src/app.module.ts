import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CleanupModule } from './cleanup/cleanup.module';
import { PasteService } from './paste.service';
import { PasteController } from './paste/paste.controller';
import { PasteModule } from './paste/paste.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DATABASE_HOST'),
        port: config.get<number>('DATABASE_PORT'),
        username: config.get<string>('DATABASE_USERNAME'),
        password: config.get<string>('DATABASE_PASSWORD'),
        database: config.get<string>('DATABASE_NAME'),
        autoLoadEntities: true, // Automatically load entities from the project
        synchronize: true, // Automatically synchronize the database schema with the entities
      }),
    }),
    ScheduleModule.forRoot(), // Import the ScheduleModule to enable scheduling
    PasteModule, // Import the PasteModule to handle paste-related functionality
    CleanupModule, // Import the CleanupModule to handle cleanup tasks
  ],
  controllers: [AppController, PasteController],
  providers: [AppService, PasteService],
})
export class AppModule {}
