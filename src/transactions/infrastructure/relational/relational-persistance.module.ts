import {  Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { transactionRepo } from '../transaction.repo';
import { TransactionRepository } from './repositories/transaction.repository';
import { TransactionEntity } from 'src/transactions/entities/transaction.entity';
import { CustomerEntity } from 'src/customer/entities/customer.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';



@Module({
    imports: [TypeOrmModule.forFeature([TransactionEntity, CustomerEntity]),
 ConfigModule, 
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRES_IN') }, 
      }),
      inject: [ConfigService],
    })],

    providers: [
        {
            provide: transactionRepo,
            useClass: TransactionRepository,
        },
    ],
    exports: [
        {
            provide: transactionRepo,
            useClass: TransactionRepository,
        },
        TypeOrmModule,
        JwtModule
    ],
})
export class RelationalPersistanceModule { }
