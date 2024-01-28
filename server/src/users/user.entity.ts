
import { Organization } from '../organizations/organization.entity';
import { Role } from '../roles/role.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
// user typeorm entity
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  email:string;

  @Column()
  adminName: string;

  @OneToOne(() => Role, { eager: true })
  @JoinColumn()
  role: Role;

  @OneToOne(() => Organization, { eager: true })
  @JoinColumn()
  organization: Organization;

}