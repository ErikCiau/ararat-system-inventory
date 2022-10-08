import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Variant } from './variant.model';

@Entity('types')
export class Type {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;

  @OneToMany(() => Variant, (v) => v.type)
  variants: Variant[];
}
