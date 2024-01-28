
import { User } from 'src/users/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
// org model for TypeORM
@Entity()
export class Organization {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  orgName: string;

  @Column()
  adminName: string;
  
  @OneToMany(() => User, user => user.organization)
  users: User[];

}