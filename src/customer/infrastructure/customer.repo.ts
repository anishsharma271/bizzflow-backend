import { CustomerEntity } from "../entities/customer.entity";


export abstract class customerRepo {
   
    abstract saveCustomer(user: any): Promise<CustomerEntity | null>;
    abstract findAll(owner_id:string): Promise<any>;
    abstract findcustomerofowner(owner_id:string): Promise<CustomerEntity[] | null>;
    abstract updateEntity(id: string, owner_id:string, data: Partial<CustomerEntity>): Promise<boolean>;
    abstract remove(id: string, owner_id:string): Promise<boolean>;
}       