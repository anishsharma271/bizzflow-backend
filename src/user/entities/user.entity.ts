import { CustomerEntity } from '../../customer/entities/customer.entity';
import { TransactionEntity } from '../../transactions/entities/transaction.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    BaseEntity,
    OneToMany,
} from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    full_name: string;

    @Column({ nullable: true })
    email?: string;

    @Column()
    phone: string;

    @Column()
    pin: string;

    @Column({ default: false })
    is_deleted: boolean;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @UpdateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
    })
    updated_at: Date;

    @OneToMany(() => CustomerEntity, (customer) => customer.owner)
    customers: CustomerEntity[];

    @OneToMany(() => TransactionEntity, (transaction) => transaction.owner)
    transactions: TransactionEntity[];
}
