import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, InternalServerErrorException, Req, Query, HttpException } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { ApiTags } from '@nestjs/swagger';
import { ResponseInterceptor } from '../utils/interceptor/response.interceptor';
import { JwtAuthGuard } from '../utils/jwt/jwt.guard';
import { AuthenticatedRequest } from '../utils/types/express-request.interface';
import { CustomerSummaryQueryDto } from './dto/customer-summary.dto';
@ApiTags('transactions')
@Controller('transactions')
@UseGuards(JwtAuthGuard)
@UseInterceptors(ResponseInterceptor)
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) { }

  @Post("/add")
  async create(@Body() createTransactionDto: CreateTransactionDto, @Req() req: AuthenticatedRequest) {
    try {
      const owner_id = req.user.sub;
      const result = await this.transactionsService.create(createTransactionDto, owner_id)
      return { msg: 'Transaction  successfully', data: result };

    } catch (err) {
       if (err instanceof HttpException) throw err;
      throw new InternalServerErrorException(err.message || 'Something went wrong');
    }

  }

  @Get("/summary")
  async getCustomerSummary(@Req() req: AuthenticatedRequest, @Query() query: CustomerSummaryQueryDto) {

    try {
      const owner_id = req.user.sub;
      const {  page, limit } = query;
      const result = await this.transactionsService.getCustomerSummary(owner_id, page, limit);
      return { msg: ' Each customer Transaction fetch successfully', data: result };
    } catch (err) {
      console.log(err);
       if (err instanceof HttpException) throw err;
      throw new InternalServerErrorException(err.message || 'Something went wrong');
    }
  }

  @Get('/:customer_id')
  async getCustomerTransactions(@Param('customer_id') customer_id: string, @Req() req: AuthenticatedRequest, @Query('page') page: number, @Query('limit') limit: number) {
    try {
      const owner_id = req.user.sub;
      const result = await this.transactionsService.getAllTransactionsByCustomer(customer_id, owner_id, page, limit);
      return { msg: '  customer Transaction history fetch successfully', data: result };
    } catch (err) {
       if (err instanceof HttpException) throw err;
      throw new InternalServerErrorException(err.message || 'Something went wrong');
    }
  }


}
