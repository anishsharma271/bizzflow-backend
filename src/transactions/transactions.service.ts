import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionEntity } from './entities/transaction.entity';
import { Repository } from 'typeorm';
import { CustomerEntity } from '../customer/entities/customer.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(TransactionEntity)
    private readonly transactionRepo: Repository<TransactionEntity>,
    @InjectRepository(CustomerEntity)
    private readonly customerRepo: Repository<CustomerEntity>,

  ) {

  }
  async create(createTransactionDto: CreateTransactionDto, owner_id: string) {
    const { customer_id, ...rest } = createTransactionDto;
    const newTransaction = await this.transactionRepo.create({
      ...rest,
      customer: { id: customer_id },
      owner: { id: owner_id },
    });
    const saved = await this.transactionRepo.save(newTransaction);
    if (!saved) throw new InternalServerErrorException("Something went wrong");
    return true
  }

 async getCustomerSummary(owner_id: string, page = 1, limit = 10) {
  const offset = (page - 1) * limit;

  const data = await this.customerRepo
    .createQueryBuilder('customer')
    .leftJoin('customer.transactions', 'transaction')
    .select([
      'customer.id AS id',
      'customer.name AS name',
      `SUM(CASE WHEN transaction.type = 'supply' THEN transaction.amount ELSE 0 END) AS "totalSupply"`,
      `SUM(CASE WHEN transaction.type = 'payment' THEN transaction.amount ELSE 0 END) AS "totalPayment"`,
      `SUM(CASE WHEN transaction.type = 'supply' THEN transaction.amount ELSE 0 END) - SUM(CASE WHEN transaction.type = 'payment' THEN transaction.amount ELSE 0 END) AS balance`,
    ])
    .where('customer.owner_id = :owner_id', { owner_id })
    .andWhere('customer.is_deleted = false')
    .groupBy('customer.id')
    .orderBy('customer.name', 'ASC')
    .offset(offset)
    .limit(limit)
    .getRawMany();

  if (!data || data.length === 0) {
    throw new NotFoundException('No customers found for this owner');
  }

  const total = await this.customerRepo
    .createQueryBuilder('customer')
    .where('customer.owner_id = :owner_id', { owner_id })
    .andWhere('customer.is_deleted = false')
    .getCount();

  return {
    success: true,
    msg: 'Each customer Transaction fetch successfully',
    data: {
      data,
      page,
      limit,
      total,
    },
  };
}



  async getAllTransactionsByCustomer(customer_id: string, owner_id: string, page = 1, limit = 10) {
    const offset = (page - 1) * limit;

    const customer = await this.customerRepo.findOne({
      where: { id: customer_id, owner: { id: owner_id }, is_deleted: false },
      select: ['id'],
    });

    if (!customer) throw new NotFoundException('Customer not found');

    const [transactions, total] = await this.transactionRepo.findAndCount({
      where: { customer: { id: customer_id } },
      order: { created_at: 'DESC' },
      skip: offset,
      take: limit,
    });

    return {
      total,
      page,
      limit,
      data: transactions,
    };
  }




}
