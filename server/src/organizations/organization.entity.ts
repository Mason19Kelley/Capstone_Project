
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
// org model for TypeORM
@Entity()
export class Organization {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  orgName: string;

  @Column()
  adminName: string;

}