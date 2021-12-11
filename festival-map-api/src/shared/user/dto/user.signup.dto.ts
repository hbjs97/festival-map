import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UserSignupDto {
  @ApiProperty({ required: true })
  @IsString()
  readonly username!: string;

  @ApiProperty({ required: true })
  @IsString()
  readonly password!: string;

  @ApiProperty({ required: true })
  @IsString()
  readonly displayname!: string;
}
