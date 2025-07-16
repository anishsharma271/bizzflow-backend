import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: '9876543210' })
  @IsNotEmpty()
  @IsString()
  @Length(10, 10)
  number: string;

  @ApiProperty({ example: '1234' })
  @IsNotEmpty()
  @IsString()
  @Length(4, 6)
  pin: string;
}
