
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerEntity } from './entities/customer.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(CustomerEntity)
    private readonly customerRepo: Repository<CustomerEntity>,
  ) { }

  async create(createDto: CreateCustomerDto, owner_id: string) {
    const newCustomer = this.customerRepo.create({ ...createDto, owner: { id: owner_id }, });
    return this.customerRepo.save(newCustomer);
  }

  async findAll(owner_id: string) {
    return this.customerRepo.find({ where: { owner: { id: owner_id }, is_deleted: false } });
  }

  async findOne(id: string, owner_id: string) {
    const customer = await this.customerRepo.findOne({ where: { id, owner: { id: owner_id }, is_deleted: false } });
    if (!customer) throw new NotFoundException('Customer not found');
    return customer;
  }

  async update(id: string, owner_id: string, updateDto: UpdateCustomerDto) {
    const result = await this.customerRepo.update({ id, owner: { id: owner_id } }, updateDto);
    return result.affected > 0;
  }

  async remove(id: string, owner_id: string) {
    const result = await this.customerRepo.update({ id, owner: { id: owner_id } }, { is_deleted: true });
    return result.affected > 0;
  }
}
