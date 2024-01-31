
import { Organization } from '../organizations/organization.entity';
import { Role } from '../roles/role.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
// user typeorm entity
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column()
  password: string;

  @Column()
  email:string;


  @ManyToOne(() => Role, role => role.users, {eager: true})
  @JoinColumn()
  role: Role;

  @ManyToOne(() => Organization, organization => organization.users, {eager: true})
  @JoinColumn()
  organization: Organization;

  @Column({ nullable: true })
  resetPasswordToken: string;  

  @Column({ nullable: true })
  resetPasswordExpires: Date;
}