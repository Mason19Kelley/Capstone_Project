
import { Organization } from '../organizations/organization.entity';
import { Role } from '../roles/role.entity';
import { Courses } from '../courses/courses.entity'
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToMany } from 'typeorm';
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

  @OneToOne(() => Courses, { eager: true })
  @JoinColumn()
  courses: Courses;
}