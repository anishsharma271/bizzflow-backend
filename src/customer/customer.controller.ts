// customer.controller.ts
import {
  Controller,
  Post,
  Get,
  Param,
  Patch,
  Delete,
  Body,
  UseGuards,
  Req,
  InternalServerErrorException,
  UseInterceptors,
  HttpException,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { JwtAuthGuard } from '../utils/jwt/jwt.guard';
import { Request } from 'express';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { ResponseInterceptor } from '../utils/interceptor/response.interceptor';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthenticatedRequest } from '../utils/types/express-request.interface';
@ApiTags('Customer')
@Controller('customer')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@UseInterceptors(ResponseInterceptor)
export class CustomerController {
  constructor(private readonly customerService: CustomerService) { }

  @Post("/create")
  async create(@Body() dto: CreateCustomerDto, @Req() req: AuthenticatedRequest) {
    try {
      const owner_id = req.user.sub;
      const result = await this.customerService.create(dto, owner_id);
      return {
        msg: 'Customer created successfully',
      };
    } catch (err) {
      if (err instanceof HttpException) throw err;
      throw new InternalServerErrorException(err.message || 'Something went wrong');
    }

  }

  @Get("/all")
  async findAll(@Req() req: AuthenticatedRequest) {
    try {
      const owner_id = req.user.sub;
      const result = await this.customerService.findAll(owner_id);
      return {
        msg: 'Customers fetched successfully',
        data: result,
      };
    } catch (err) {
      if (err instanceof HttpException) throw err;
      throw new InternalServerErrorException(err.message || 'Something went wrong');
    }

  }

  @Get('/getcustomerofowner')
  async findOne(@Req() req: AuthenticatedRequest) {
    try {

      const owner_id = req.user.sub;
      const result = await this.customerService.findOne(owner_id);
      return {
        msg: 'Customer fetched successfully',
        data: result,
      };
    } catch (err) {
      
      if (err instanceof HttpException) throw err;
      throw new InternalServerErrorException(err.message || 'Something went wrong');
    }


  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateCustomerDto,
    @Req() req: AuthenticatedRequest,
  ) {
    try {
      const owner_id = req.user.sub;
      const result = await this.customerService.update(id, owner_id, dto);
      return {
        msg: 'Customer updated successfully',
        data: result,
      };
    } catch (err) {
      if (err instanceof HttpException) throw err;
      throw new InternalServerErrorException(err.message || 'Something went wrong');
    }


  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
    try {
      const owner_id = req.user.sub;
      const result = await this.customerService.remove(id, owner_id);
      return {
        msg: 'Customer deleted successfully',
        data: result,
      };

    } catch (err) {
      if (err instanceof HttpException) throw err;
      throw new InternalServerErrorException(err.message || 'Something went wrong');
    }


  }
}
