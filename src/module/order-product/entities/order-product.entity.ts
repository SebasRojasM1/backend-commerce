import { Order } from "src/module/order/entities/order.entity";
import { Product } from "src/module/product/entities/product.entity";
import { Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export class OrderProduct {
    @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order, order => order.orderItems)
  order: Order;

  @ManyToOne(() => Product, product => product.orderItems)
  product: Product;

  @Column('int')
  quantity: number;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;
}
