import { Controller, Post, Body, Param } from '@nestjs/common';
import { CreatePasteDto } from 'src/paste/dto/create-paste.dto';
import { PasteService } from 'src/paste/paste.service';

@Controller('/api/v1/paste')
export class PasteController {
  constructor(private readonly pasteService: PasteService) {}

  @Post()
  async createPaste(@Body() dto: CreatePasteDto) {
    const paste = await this.pasteService.createPaste(
      dto.paste_content,
      dto.expiration_length_in_minutes,
    );
    return { shortlink: paste.shortlink };
  }

  @Get(':shortlink')
  async getPaste(@Param('shortlink') shortlink: string) {

  }

}
