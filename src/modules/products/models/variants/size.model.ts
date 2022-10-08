import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Variant } from './variant.model';

@Entity('sizes')
export class Size {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  size: string;
  @OneToMany(() => Variant, (v) => v.size)
  variants: Variant[];
}
