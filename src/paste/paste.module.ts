import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisSerivce } from 'src/paste/cache/redis.service';
import { PasteController } from 'src/paste/paste.controller';
import { Paste } from 'src/paste/paste.entity';
import { PasteService } from 'src/paste/paste.service';
import { ShortenerService } from 'src/paste/shortener/shortener.service';

@Module({
  imports: [TypeOrmModule.forFeature([Paste])],
  controllers: [PasteController],
  providers: [RedisSerivce, ShortenerService, PasteService],
})
export class PasteModule {}
