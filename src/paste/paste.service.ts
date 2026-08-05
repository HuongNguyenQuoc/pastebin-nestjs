import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ShortenerService } from 'src/paste/shortener/shortener.service';
import { Repository } from 'typeorm';
import { RedisSerivce } from './cache/redis.service';
import { Paste } from './paste.entity';

export interface PasteResponse {
  paste_content: string;
  created_at: Date;
  expiration_length_in_minutes: number | null;
}

@Injectable()
export class PasteService {
  constructor(
    @InjectRepository(Paste)
    private pasteRepo: Repository<Paste>,
    private shortenerService: ShortenerService,
    private redisService: RedisSerivce,
  ) {}

  async createPaste(
    content: string,
    expirationMinutes?: number,
  ): Promise<Paste> {
    for (let attempt = 0; attempt < 5; attempt++) {
      const shortLink = this.shortenerService.generateShortLink();
      const paste = this.pasteRepo.create({
        shortlink: shortLink,
        content,
        expirationLengthInMinutes: expirationMinutes ?? null,
      });
      try {
        return await this.pasteRepo.save(paste);
      } catch (err) {
        if ((err as { code?: string }).code === '23505') continue; // Duplicate shortlink, retry
        throw err; // Other errors, rethrow
      }
    }
    throw new Error('Failed to generate a unique shortlink after 5 attempts');
  }

  async getPaste(shortLink: string): Promise<PasteResponse | null> {
    const cacheKey = `paste:${shortLink}`;
    const cachedContent = await this.redisService.get(cacheKey);
    if (cachedContent) {
      return JSON.parse(cachedContent) as PasteResponse;
    }

    const paste = await this.pasteRepo.findOne({
      where: { shortlink: shortLink },
    });
    if (!paste) return null;

    const result: PasteResponse = {
      paste_content: paste.content,
      created_at: paste.createdAt,
      expiration_length_in_minutes: paste.expirationLengthInMinutes,
    };

    await this.redisService.set(cacheKey, JSON.stringify(result));
    return result;
  }
}
