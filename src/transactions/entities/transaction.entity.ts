import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, BaseEntity, UpdateDateColumn, JoinColumn } from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { CustomerEntity } from '../../customer/entities/customer.entity';

export enum TransactionType {
    SUPPLY = 'supply',
    PAYMENT = 'payment',
}

@Entity("transactions")
export class TransactionEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

   @ManyToOne(() => UserEntity, (user) => user.transactions, { eager: false })
  @JoinColumn({ name: "owner_id" }) // will auto-map to user.id
  owner: UserEntity;

  @ManyToOne(() => CustomerEntity, (customer) => customer.transactions, { eager: false })
  @JoinColumn({ name: "customer_id" }) // will auto-map to customer.id
  customer: CustomerEntity;

    @Column({ type: 'enum', enum: TransactionType })
    type: TransactionType;

    @Column('float')
    amount: number;

    @Column({ nullable: true })
    description: string;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @UpdateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
    })
    updated_at: Date;
}
