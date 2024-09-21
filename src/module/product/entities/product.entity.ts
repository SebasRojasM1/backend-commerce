import { Category } from '../../category/entities/category.entity';
import { OrderProduct } from '../../order-product/entities/order-product.entity';
import { Review } from '../../review/entities/review.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';


@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column('text')
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column('int')
  stock: number;

  @ManyToOne(() => Category, category => category.products)
  category: Category;

  @Column({ length: 255, nullable: true })
  imageUrl: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => OrderProduct, orderProduct => orderProduct.product)
  OrderProduct: OrderProduct[];

  @OneToMany(() => Review, review => review.product)
  reviews: Review[];
}
