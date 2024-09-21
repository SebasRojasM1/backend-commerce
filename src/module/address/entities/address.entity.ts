import { Order } from "../../order/entities/order.entity";
import { User } from "../../user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('address')
export class Address {
    @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user)
  user: User;

  @ManyToOne(() => Order, order => order)
  order: Order;

  @Column({ length: 255 })
  addressLine1: string;

  @Column({ length: 255, nullable: true })
  addressLine2: string;

  @Column({ length: 255 })
  city: string;

  @Column({ length: 255 })
  state: string;

  @Column({ length: 10 })
  zipCode: string;

  @Column({ length: 255 })
  country: string;
}
