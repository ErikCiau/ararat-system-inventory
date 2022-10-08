import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Product } from './product.model';

@Entity('suppliers')
export class Supplier {
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  name: string;
  @Column()
  contact: string;

  // relations
  @OneToMany(() => Product, p => p.supplier)
  products: Product[]

  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
