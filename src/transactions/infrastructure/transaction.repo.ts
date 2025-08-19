import { CustomerEntity } from "src/customer/entities/customer.entity";
import { TransactionEntity } from "../entities/transaction.entity";


export abstract class transactionRepo {
   
   abstract saveTransaction(userData: any): Promise<TransactionEntity | null>;
   abstract findONE(customer_id:string, owner_id :string): Promise<CustomerEntity | null>;
   abstract summary(owner_id: string,  page: number, limit: number): Promise<any>;
   abstract findAndCount(customer_id: string, page: number, limit: number): Promise<[TransactionEntity[], number]>;
}       