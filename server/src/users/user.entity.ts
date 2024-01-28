
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

  @OneToOne(() => Organization, { eager: true })
  @JoinColumn()
  organization: Organization;

  @OneToOne(() => Role, { eager: true })
  @JoinColumn()
  role: Role;
}