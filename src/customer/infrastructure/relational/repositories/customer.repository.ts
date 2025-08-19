import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/user/entities/user.entity";
import { Repository } from "typeorm";
import { customerRepo } from "../../customer.repo";
import { CustomerEntity } from "src/customer/entities/customer.entity";


export class customerRepository implements customerRepo {

    constructor(
        @InjectRepository(CustomerEntity)
        private readonly customerRepository: Repository<CustomerEntity>,
    ) {} 

    saveCustomer(userData: CustomerEntity): Promise<CustomerEntity | null> {
    // Saves the entity to the database
     const user = this.customerRepository.create(userData);
    return this.customerRepository.save(user);
    }
  
    findAll(owner_id:string): Promise<CustomerEntity[] | null> {
    return this.customerRepository.find( { where: { owner: { id: owner_id }, is_deleted: false } });
    }


  findcustomerofowner(owner_id: string): Promise<CustomerEntity[]> {
    return this.customerRepository.find({
      where: { owner: { id: owner_id }, is_deleted: false }
    });
  }

    async updateEntity(id: string, owner_id:string, data: Partial<CustomerEntity>): Promise<boolean> {
    const update =  await this.customerRepository.update({ id, owner: { id: owner_id } }, data);
    return update.affected > 0 || false;
    }
    async remove(id: string, owner_id:string): Promise<boolean> {
    const update =  await this.customerRepository.update({ id, owner: { id: owner_id } }, { is_deleted: true });
    return update.affected > 0 || false;
    }

    
}