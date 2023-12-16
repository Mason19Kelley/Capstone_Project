
import { Organization } from 'src/organizations/organization.entity';
import { Role } from 'src/roles/role.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToOne(() => Organization)
  @JoinColumn()
  organization: Organization;

  @OneToOne(() => Role)
  @JoinColumn()
  role: Role;
}