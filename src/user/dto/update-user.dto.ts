import { IsOptional, IsString, Length } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiPropertyOptional({ example: 'John Doe', description: 'Full name of the user' })
  @IsOptional()
  @IsString()
  full_name?: string;

  @ApiPropertyOptional({ example: '1234', description: 'User PIN (4 digits)' })
  @IsOptional()
  @IsString()
  @Length(4, 4)
  pin?: string;
}
