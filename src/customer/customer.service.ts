
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { customerRepo } from './infrastructure/customer.repo';

@Injectable()
export class CustomerService {
  constructor(
   
       private readonly customerRepository: customerRepo,
  ) { }

  async create(createDto: CreateCustomerDto, owner_id: string) {
    const newCustomer =  await this.customerRepository.saveCustomer({ ...createDto, owner: { id: owner_id }, });
    return newCustomer;
  }

  async findAll(owner_id: string) {
    return  await this.customerRepository.findAll(owner_id );
  }

  async findOne( owner_id: string) {
    const customer = await this.customerRepository.findcustomerofowner(owner_id);
    if (!customer) throw new NotFoundException('Customers not found');
    return customer;
  }

  async update(id: string, owner_id: string, updateDto: UpdateCustomerDto) {
   return await this.customerRepository.updateEntity( id, owner_id, updateDto);
   
  }

  async remove(id: string, owner_id: string) {
   return await this.customerRepository.remove( id, owner_id);
   
  }
}
