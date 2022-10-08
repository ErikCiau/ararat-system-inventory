import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../product.model';
import { Type } from './type.model';
import { Size } from './size.model';

@Entity('variants')
export class Variant {
  @PrimaryGeneratedColumn()
  id: string;
  // relations
  @ManyToOne(() => Product, (p) => p.variants)
  product: Product;
  @ManyToOne(() => Type, (t) => t.variants)
  type: Type;
  @ManyToOne(() => Size, (s) => s.variants)
  size: Size;
}
