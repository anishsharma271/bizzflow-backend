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
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { JwtAuthGuard } from '../utils/jwt/jwt.guard';
import { Request } from 'express';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { ResponseInterceptor } from '../utils/interceptor/response.interceptor';
import { ApiTags } from '@nestjs/swagger';
import { AuthenticatedRequest } from '../utils/types/express-request.interface';
@ApiTags('Customer')
@Controller('customer')
@UseGuards(JwtAuthGuard)
@UseInterceptors(ResponseInterceptor)
export class CustomerController {
  constructor(private readonly customerService: CustomerService) { }

  @Post()
  async create(@Body() dto: CreateCustomerDto, @Req() req: AuthenticatedRequest) {
    try {
      const owner_id = req.user.sub;
      const result = await this.customerService.create(dto, owner_id);
      return {
        msg: 'Customer created successfully',
        data: result,
      };
    } catch (err) {
      throw new InternalServerErrorException(err.message || 'Something went wrong');
    }

  }

  @Get()
  async findAll(@Req() req: AuthenticatedRequest) {
    try {
      const owner_id = req.user.sub;
      const result = await this.customerService.findAll(owner_id);
      return {
        msg: 'Customers fetched successfully',
        data: result,
      };
    } catch (err) {
      throw new InternalServerErrorException(err.message || 'Something went wrong');
    }

  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
    try {

      const owner_id = req.user.sub;
      const result = await this.customerService.findOne(id, owner_id);
      return {
        msg: 'Customer fetched successfully',
        data: result,
      };
    } catch (err) {
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
      throw new InternalServerErrorException(err.message || 'Something went wrong');
    }


  }
}
