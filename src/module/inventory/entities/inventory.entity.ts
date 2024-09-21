import { Product } from "../../product/entities/product.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('inventory')
export class Inventory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, product => product)
  product: Product;

  @Column('int')
  quantity: number;

  @UpdateDateColumn()
  lastUpdated: Date;
}