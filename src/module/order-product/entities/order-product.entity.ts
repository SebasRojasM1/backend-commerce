import { Order } from "../../order/entities/order.entity";
import { Product } from "../../product/entities/product.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("orderProduct")
export class OrderProduct {
    @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order, order => order.OrderProduct)
  order: Order;

  @ManyToOne(() => Product, product => product.OrderProduct)
  product: Product;

  @Column('int')
  quantity: number;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;
}