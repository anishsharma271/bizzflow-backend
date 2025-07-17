import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import { TransactionType } from '../entities/transaction.entity';

export class CreateTransactionDto {
    @IsNotEmpty()
    @IsUUID()
    customer_id: string;

    @IsEnum(TransactionType)
    @IsNotEmpty()
    type: TransactionType; // payment = 'CREDIT' or  supply ='DEBIT'

    @IsNumber()
    @IsNotEmpty()
    amount: number;

    @IsOptional()
    @IsString()
    description?: string;
}
