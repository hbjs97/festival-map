import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';

export class FestivalGetDto {
  @ApiProperty({ required: true })
  @IsNumberString()
  readonly latitude: number;

  @ApiProperty({ required: true })
  @IsNumberString()
  readonly longitude: number;

  @ApiProperty({ required: true })
  @IsNumberString()
  readonly radius: number;
}
