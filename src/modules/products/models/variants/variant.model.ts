import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from '../product.model';
import { Type } from './type.model';
import { Size } from './size.model';
import { Stock } from './stock.model';
import { OrderLine } from 'src/modules/orders/models/order-line.model';

@Entity('variants')
export class Variant {
  @PrimaryGeneratedColumn()
  id: string;
  // relations
  @OneToOne(() => Stock, {
    cascade: ['insert', 'update', 'remove'],
  })
  @JoinColumn()
  stock: Stock;
  @ManyToOne(() => Product, (p) => p.variants)
  product: Product;
  @ManyToOne(() => Type, (t) => t.variants)
  type: Type;
  @ManyToOne(() => Size, (s) => s.variants)
  size: Size;
  @OneToMany(() => OrderLine, (o) => o.variant)
  orderLine: OrderLine[];
}
