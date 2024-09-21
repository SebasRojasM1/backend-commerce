import { OrderProduct } from "../../order-product/entities/order-product.entity";
import { User } from "../../user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.orders)
  user: User;

  @Column('decimal', { precision: 10, scale: 2 })
  totalAmount: number;

  @Column({ type: 'enum', enum: ['pending', 'shipped', 'delivered', 'canceled'], default: 'pending' })
  status: 'pending' | 'shipped' | 'delivered' | 'canceled';

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => OrderProduct, OrderProduct => OrderProduct.order)
  OrderProduct: OrderProduct[];
}