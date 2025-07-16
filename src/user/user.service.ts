import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
constructor(
   @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
){

}

async register(registerUserDto: RegisterUserDto) {
  const { confirmPin, ...userData } = registerUserDto; 

  const existing = await this.userRepository.findOne({
    where: { number: userData.number },
  });

  if (existing) {
    throw new ConflictException("Business owner already exists! Please login.");
  }

  const create = this.userRepository.create(userData); 
  const save = await this.userRepository.save(create);

  if (!save) {
    throw new InternalServerErrorException("Something went wrong");
  }

  return true;
}


  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
