import { OrderLine } from 'src/modules/orders/models/order-line.model';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Supplier } from './supplier.model';
import { Variant } from './variants/variant.model';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ length: 90 })
  name: string;
  @Column({ length: 255, nullable: true })
  description: string;
  @Column({ nullable: true })
  cover: string;
  @Column({ type: 'float' })
  price: number;

  // Relations
  @OneToMany(() => Variant, (v) => v.product)
  variants: Variant[];
  @ManyToOne(() => Supplier, (s) => s.products)
  supplier: Supplier;

  @OneToMany(() => OrderLine, (o) => o.product)
  orderLines: OrderLine[];

  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
