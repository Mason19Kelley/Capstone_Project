import { Organization } from '../organizations/organization.entity';
import { Role } from '../roles/role.entity';
import { Courses } from 'src/courses/courses.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinColumn } from 'typeorm';
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


  @ManyToOne(() => Role, role => role.users, {eager: true})
  @JoinColumn()
  role: Role;

  @ManyToMany(() => Courses, (course) => course.users)
  courses: Courses[];

  @ManyToOne(() => Organization, organization => organization.users, {eager: true})
  @JoinColumn()
  organization: Organization;
}