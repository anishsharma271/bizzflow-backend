import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CheckUserDto {
  @ApiProperty({ example: '9876543210' })
  @IsNotEmpty()
  @IsString()
  @Length(10, 10)
  phone: string;
}
