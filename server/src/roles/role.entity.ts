
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
// role typeorm entity
@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  roleName: string;


}