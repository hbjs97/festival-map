import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UserSignupDto {
  @ApiProperty({ required: true })
  @IsString()
  readonly password: string;

  @ApiProperty({ required: true })
  @IsString()
  readonly userName: string;

  @ApiProperty({ required: true })
  @IsString()
  readonly mobilePhoneNumber: string;

  @ApiProperty({ required: true })
  @IsString()
  readonly region: string;
}
