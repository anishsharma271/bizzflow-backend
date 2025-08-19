import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { RelationalPersistanceModule } from './infrastructure/relational/relational-persistance.module';

@Module({
  imports: [RelationalPersistanceModule],
  controllers: [TransactionsController],
  providers: [TransactionsService],
})
export class TransactionsModule { }
