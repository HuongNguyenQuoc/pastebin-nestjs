import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Paste } from 'src/paste/paste.entity';
import { CleanupService } from './cleanup.service';

@Module({
  imports: [TypeOrmModule.forFeature([Paste])],
  providers: [CleanupService],
})
export class CleanupModule {}
