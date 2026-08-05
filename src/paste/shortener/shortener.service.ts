import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

const BASE62_ALPHABET =
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

@Injectable()
export class ShortenerService {
  private base62Code(num: bigint): string {
    if (num === 0n) return BASE62_ALPHABET[0];
    let digits = '';
    let n = num;
    while (n > 0n) {
      const remainder = n % 62n;
      digits = BASE62_ALPHABET[Number(remainder)] + digits;
      n = n / 62n;
    }
    return digits;
  }

  public generateShortLink(seed = ''): string {
    const raw = `${seed}${Date.now()}${Math.random()}`;
    const digest = crypto.createHash('md5').update(raw).digest('hex');
    const num = BigInt('0x' + digest); // MD5 is 128-bit so we need BigInt compatibility
    return this.base62Code(num).slice(0, 7); // Return the first 7 characters
  }
}
