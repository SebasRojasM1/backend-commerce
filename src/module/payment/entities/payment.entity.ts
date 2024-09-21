import { Order } from "src/module/order/entities/order.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order, order => order)
  order: Order;

  @Column({ type: 'enum', enum: ['credit_card', 'paypal', 'bank_transfer'] })
  paymentMethod: 'credit_card' | 'paypal' | 'bank_transfer';

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column({ type: 'enum', enum: ['pending', 'completed', 'failed'], default: 'pending' })
  status: 'pending' | 'completed' | 'failed';

  @CreateDateColumn()
  paymentDate: Date;
}