import {  Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { CustomerEntity } from 'src/customer/entities/customer.entity';
import { customerRepo } from '../customer.repo';
import { customerRepository } from './repositories/customer.repository';


@Module({
    imports: [TypeOrmModule.forFeature([CustomerEntity, UserEntity]),
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
            provide: customerRepo,
            useClass: customerRepository,
        },
    ],
    exports: [
        {
            provide: customerRepo,
            useClass: customerRepository,
        },
        TypeOrmModule,
        JwtModule
    ],
})
export class CustomerRelationalPersistanceModule { }
