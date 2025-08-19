import { UserEntity } from "../entities/user.entity";


export abstract class userRepo {
   
    abstract findByPhone(phone: string): Promise<UserEntity | null>;
    abstract saveUser(user: any): Promise<UserEntity | null>;
    abstract findAll(): Promise<any>;
    abstract findById(id:string): Promise<any>;
    abstract updateEntity(id: string, data: Partial<UserEntity>): Promise<boolean>;
}       