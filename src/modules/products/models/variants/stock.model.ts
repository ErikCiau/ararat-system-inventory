import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
// import { Variant } from './variant.model';

@Entity('stocks')
export class Stock {
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  quantity: number;

  // @OneToMany(() => Variant, v => v.stock)
  // variant: Variant
}
