
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, BaseEntity, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { TransactionEntity } from '../../transactions/entities/transaction.entity';

@Entity('customers')
export class CustomerEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: false })
  phone: string;

  @Column({ default: false })
  is_deleted: boolean;

  @ManyToOne(() => UserEntity, (user) => user.transactions, { eager: false })
  @JoinColumn({ name: "owner_id" }) // will auto-map to user.id
  owner: UserEntity;


  @OneToMany(() => TransactionEntity, (transaction) => transaction.customer)
  transactions: TransactionEntity[];

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;
}
