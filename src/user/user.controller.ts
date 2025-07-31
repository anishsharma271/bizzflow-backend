import { Controller, Get, Post, Body, Patch, Param, Delete, InternalServerErrorException, UseInterceptors, UseGuards, Req, NotFoundException, HttpException } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { ResponseInterceptor } from '../utils/interceptor/response.interceptor';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login-user.dto';
import { JwtAuthGuard } from '../utils/jwt/jwt.guard';
import { CheckUserDto } from './dto/check-user.dto';


@ApiTags('User')
@Controller('user')
@UseInterceptors(ResponseInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) { }
  @Post("/register")
  async register(@Body() registerUserDto: RegisterUserDto) {
    try {

      const result = await this.userService.register(registerUserDto)
      console.log('User Register Result -> \n', result);
      return {
        msg: 'Business owner register successfully',
        data: result,
      };

    } catch (err) {
      if (err instanceof HttpException) throw err;
      throw new InternalServerErrorException(err.message || 'Something went wrong');
    }

  }

  @Post("/login")
  async login(@Body() loginDto: LoginDto) {
    try {
      const result = await this.userService.login(loginDto)
      return {
        msg: 'Business owner login successfully',
        data: result,
      };

    } catch (err) {
      if (err instanceof HttpException) throw err;
      throw new InternalServerErrorException(err.message || 'Something went wrong');
    }

  }
  @Post("/check-User")
  async checkUser(@Body() checkUserDto: CheckUserDto) {
    try {
      const result = await this.userService.checkuser(checkUserDto)
      return {
        msg: 'Business owner found successfully',
        data: result,
      };

    } catch (err) {

      if (err instanceof HttpException) throw err;

      throw new InternalServerErrorException(err.message || 'Something went wrong');
    }

  }


  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Get("/all")
  async findAll() {
    try {
      const result = await this.userService.findAll();
      return {
        msg: 'Business owners fetch successfully',
        data: result,
      };

    } catch (err) {
      if (err instanceof HttpException) throw err;
      throw new InternalServerErrorException(err.message || 'Something went wrong');
    }


  }


  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const result = await this.userService.findOne(id);
      return {
        msg: 'Business owner fetch successfully',
        data: result,
      };

    } catch (err) {
      if (err instanceof HttpException) throw err;
      throw new InternalServerErrorException(err.message || 'Something went wrong');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      const result = await this.userService.update(id, updateUserDto);
      return {
        msg: 'Business owner deleted successfully',
        data: result,
      };

    } catch (err) {
      if (err instanceof HttpException) throw err;
      throw new InternalServerErrorException(err.message || 'Something went wrong');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const result = await this.userService.remove(id);
      return {
        msg: 'Business owner deleted successfully',
        data: result,
      };

    } catch (err) {
      if (err instanceof HttpException) throw err;
      throw new InternalServerErrorException(err.message || 'Something went wrong');
    }
  }
}

