import { InjectRepository } from "@nestjs/typeorm";
import { TransactionEntity } from "src/transactions/entities/transaction.entity";
import { Repository } from "typeorm";
import { transactionRepo } from "../../transaction.repo";
import { CustomerEntity } from "src/customer/entities/customer.entity";


export class TransactionRepository implements transactionRepo {

    constructor(
        @InjectRepository(TransactionEntity)
        private readonly transactionRepository: Repository<TransactionEntity>,
        @InjectRepository(CustomerEntity)
        private readonly customerRepository: Repository<CustomerEntity>,
    ) {} 

      
       saveTransaction(userData: TransactionEntity): Promise<TransactionEntity | null> {
         // Saves the entity to the database
          const user = this.transactionRepository.create(userData);
         return this.transactionRepository.save(user);
         }


     findONE(customer_id:string, owner_id :string ): Promise<CustomerEntity | null> {
       // Finds the entity in the database
       return this.customerRepository.findOne({
         where: { id: customer_id, owner: { id: owner_id }, is_deleted: false },
         select: ['id'],
       });


    }
async summary(owner_id: string, page: number, limit: number): Promise<[any[], number]> {
  const offset = (page - 1) * limit;

  const data = await this.customerRepository
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

  const total = await this.customerRepository
    .createQueryBuilder('customer')
    .where('customer.owner_id = :owner_id', { owner_id })
    .andWhere('customer.is_deleted = false')
    .getCount();

  return [data, total];
;
}

    findAndCount(customer_id: string,  page: number, limit: number): Promise<[TransactionEntity[], number]> {
         const offset = (page - 1) * limit;
            return this.transactionRepository.findAndCount({
           where: { customer: { id: customer_id } },
      order: { created_at: 'DESC' },
      skip: offset,
      take: limit,
            }); 
            
     }
    
}