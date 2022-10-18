import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Employee } from 'src/modules/employees/models/employee.model';
import { Customer } from 'src/modules/customers/models/customer.model';
import { OrderLine } from './order-line.model';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: string;

  // relations

  @ManyToOne(() => Customer, (c) => c.orders)
  customer: Customer;
  @OneToMany(() => OrderLine, (o) => o.order, {
    cascade: ['insert', 'remove'],
  })
  orderLines: OrderLine[];

  @ManyToOne(() => Employee, (e) => e.orders)
  employee: Employee;
}
