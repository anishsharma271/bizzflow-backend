import { Type } from "class-transformer";
import { IsString, IsOptional, IsInt } from "class-validator";

export class CustomerSummaryQueryDto {

    @IsOptional()
    @IsInt()
    @Type(() => Number)
    page?: number = 1;

    @IsOptional()
    @IsInt()
    @Type(() => Number)
    limit?: number = 10;
}
