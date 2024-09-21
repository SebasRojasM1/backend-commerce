import { Product } from "../../product/entities/product.entity";
import { User } from "../../user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('reviews')
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.reviews)
  user: User;

  @ManyToOne(() => Product, product => product.reviews)
  product: Product;

  @Column('int')
  rating: number;

  @Column('text')
  comment: string;

  @CreateDateColumn()
  createdAt: Date;
}