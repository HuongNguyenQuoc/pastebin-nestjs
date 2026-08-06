import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Paste } from 'src/paste/paste.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CleanupService {
  constructor(
    @InjectRepository(Paste)
    private readonly pasteRepo: Repository<Paste>,
  ) {}

  @Cron(CronExpression.EVERY_10_MINUTES)
  async deleteExpiredPastes() {
    await this.pasteRepo.query(`
      DELETE FROM pastes
      WHERE expiration_length_in_minutes IS NOT NULL
      AND created_at + (expiration_length_in_minutes || ' minutes')::interval < NOW()
    `);
  }
}
