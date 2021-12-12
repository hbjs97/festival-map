import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class PostCreateDto {
  @ApiProperty({ required: true })
  @IsString()
  readonly title: string;

  @ApiProperty({ required: true })
  @IsString()
  readonly content: string;

  createdBy: string;
}
