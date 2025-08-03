import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class UpdateCustomerDto {
    @ApiProperty({ example: 'John' })
    @IsOptional()
    @IsString()
    name?: string;

    @ApiProperty({ example: '9876543210' })
    @IsOptional()
    @IsString()
    phone?: string;
}
