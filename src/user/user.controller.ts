import { Controller, Get, Post, Body, Patch, Param, Delete, InternalServerErrorException, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { ResponseInterceptor } from '../utils/interceptor/response.interceptor';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('User')
@Controller('user')
@UseInterceptors(ResponseInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) { }
  @Post("register")
  async register(@Body() registerUserDto: RegisterUserDto) {
    try {
      const result = await this.userService.register(registerUserDto)
      return {
        msg: 'Business owner register successfully',
        data: result,
      };

    } catch (err) {
      throw new InternalServerErrorException(err.message || 'Something went wrong');
    }

  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}

