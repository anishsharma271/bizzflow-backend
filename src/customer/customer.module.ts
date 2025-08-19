import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerEntity } from './entities/customer.entity';
import { UserEntity } from '../user/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CustomerRelationalPersistanceModule } from './infrastructure/relational/relational-persistance.module';

@Module({
  imports: [CustomerRelationalPersistanceModule],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule { }
