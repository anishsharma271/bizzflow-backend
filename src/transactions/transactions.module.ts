import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { TransactionEntity } from './entities/transaction.entity';
import { CustomerEntity } from '../customer/entities/customer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerEntity, TransactionEntity]),
   ConfigModule, 
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRES_IN') }, 
      }),
      inject: [ConfigService],
    }),
],
  controllers: [TransactionsController],
  providers: [TransactionsService],
})
export class TransactionsModule { }
