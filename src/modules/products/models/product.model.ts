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
  @Column()
  name: string;
  @Column()
  description: string;
  @Column()
  cover: string;
  @Column()
  price: number;

  // Relations
  @OneToMany(() => Variant, (v) => v.product)
  variants: Variant[];
  @ManyToOne(() => Supplier, (s) => s.products)
  supplier: Supplier;

  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
