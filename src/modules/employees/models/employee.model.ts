import { Order } from 'src/modules/orders/models/order.model';
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('employees')
export class Employee {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  username: string;
  @Column()
  password: string;
  @Column()
  name: string;
  @Column()
  lastname: string;
  @Column()
  contact: string;
  @Column()
  role: string;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Order, (o) => o.employee)
  orders: Order[];
}
