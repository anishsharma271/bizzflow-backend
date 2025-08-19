import { ConflictException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { UserEntity } from './entities/user.entity';
import { LoginDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CheckUserDto } from './dto/check-user.dto';
import { userRepo } from './infrastructure/user.repo';

@Injectable()
export class UserService {
  constructor(
   private readonly userRepo: userRepo,
    private jwtService: JwtService,
  ) {

  }


  async register(registerUserDto: RegisterUserDto) {
    const { confirmPin, ...userData } = registerUserDto;
    const existing = await this.userRepo.findByPhone(userData.phone);
    console.log('Check for existing user  hjhjhjjhjhjh ', existing);
    if (existing) {
      throw new ConflictException("Business owner already exists! Please login.");
    }
    const hashedPin = await bcrypt.hash(registerUserDto.pin, 10);
    const save = await this.userRepo.saveUser({ ...registerUserDto, pin: hashedPin });
    if (!save) {
      throw new InternalServerErrorException("Something went wrong");
    }
    const token = this.generateJwt(save.id);
    return token;
  }
  
  async login(loginDto: LoginDto) {
    const existing = await this.userRepo.findByPhone(loginDto.phone);
    if (!existing) {
      throw new NotFoundException("Business owner not exists! Please register.");
    }
    const isMatch = await bcrypt.compare(loginDto.pin, existing.pin);
    if (!isMatch) throw new UnauthorizedException('Invalid Paswword kindly add correct password');
    const token = this.generateJwt(existing.id);
    return token;

  }

  private generateJwt(userId: string)  
  {
    const payload = { sub: userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async checkuser(phoneDto: CheckUserDto) {
    const data = await this.userRepo.findByPhone(phoneDto.phone);
    if (!data) throw new NotFoundException("user not found")
    return data;
  }

  async findAll() {
    const data = await this.userRepo.findAll()
    if (!data) throw new NotFoundException("data not found")
    return data;
  }

  async findOne(id: string) {
    const data = await this.userRepo.findById(id)
    if (!data) throw new NotFoundException("data not found")
    return data;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const data = await this.userRepo.findById(id);
    if (!data) throw new NotFoundException("User not found");
    const updatedFields: Partial<UserEntity> = {};
    if (updateUserDto.full_name) {
      updatedFields.full_name = updateUserDto.full_name;
    }
    if (updateUserDto.pin) {
      const hashedPin = await bcrypt.hash(updateUserDto.pin, 10);
      updatedFields.pin = hashedPin;
    }
    return await this.userRepo.updateEntity( id , updatedFields);
   
  }

  async remove(id: string) {
    const data = await this.userRepo.findById(id);
    if (!data) throw new NotFoundException("data not found")
    return await this.userRepo.updateEntity( id , { is_deleted: true });
  }

  
}
