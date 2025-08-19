import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/user/entities/user.entity";
import { Repository } from "typeorm";
import { userRepo } from "../../user.repo";


export class UserRepository implements userRepo {

    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {} 

      
   
    findByPhone(phone: string): Promise<UserEntity | null> {
       return this.userRepository.findOne({
      where: { phone },
    });
    }
  


    saveUser(userData: UserEntity): Promise<UserEntity | null> {
    // Saves the entity to the database
     const user = this.userRepository.create(userData);
    return this.userRepository.save(user);
    }
  
    findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
    }
    findById(id: string): Promise<UserEntity | null> {
    return this.userRepository.findOne({
      where: { id },
    });
    }
    async updateEntity(id: string, data: Partial<UserEntity>): Promise<boolean> {
    const update =  await this.userRepository.update(id, data);
    return update.affected > 0 || false;
    }
    
}