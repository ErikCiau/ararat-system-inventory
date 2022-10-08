import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('stocks')
export class Stock {
  @PrimaryColumn()
  sku: string;
  @Column({ type: 'integer' })
  quantity: number;
}
