import {  Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { userRepo } from '../user.repo';
import { UserRepository } from './repositories/user.repository';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';


@Module({
    imports: [TypeOrmModule.forFeature([UserEntity]),
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
            provide: userRepo,
            useClass: UserRepository,
        },
    ],
    exports: [
        {
            provide: userRepo,
            useClass: UserRepository,
        },
        TypeOrmModule,
        JwtModule
    ],
})
export class RelationalPersistanceModule { }
