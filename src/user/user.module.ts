import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { RelationalPersistanceModule } from './infrastructure/relational/relational-persistance.module';


@Module({
  imports: [RelationalPersistanceModule],
  controllers: [UserController],
  providers: [UserService],
  //  exports: [UserService, RelationalPersistanceModule],
})
export class UserModule { }
