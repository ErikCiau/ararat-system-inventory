import { Product, Variant } from 'src/modules/products/models';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Order } from './order.model';

@Entity('order_lines')
export class OrderLine {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'unit_price', type: 'float' })
  unitPrice: number;
  @Column()
  quantity: number;
  @Column()
  discount: number;
  @Column({ type: 'float' })
  total: number;

  // relations
  @ManyToOne(() => Order, (o) => o.orderLines)
  order: Order;

  @ManyToOne(() => Product, (p) => p.orderLines)
  product: Product;
  @OneToOne(() => Variant)
  @JoinColumn()
  variant: Variant;
}
