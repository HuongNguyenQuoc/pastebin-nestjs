import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class CreatePasteDto {
  @IsString()
  paste_content: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  expiration_length_in_minutes?: number;
}
