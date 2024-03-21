import { Organization } from '../organizations/organization.entity';
import { Role } from '../roles/role.entity';
import { Courses } from 'src/courses/courses.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinColumn, JoinTable, Unique } from 'typeorm';
// user typeorm entity

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column({nullable: true})
  password?: string;

  @Column()
  email:string;


  @ManyToOne(() => Role, role => role.users, {eager: true})
  @JoinColumn()
  role: Role;

  @ManyToMany(() => Courses, (course) => course.users, {cascade: true})
  @JoinTable({
      name: 'users_course',
      joinColumn: {
        name: 'userId',
        referencedColumnName: 'id',
      },
      inverseJoinColumn: {
        name: 'coursesCid',
        referencedColumnName: 'cid'
      },
      })
  courses: Courses[];

  @ManyToOne(() => Organization, organization => organization.users, {eager: true})
  @JoinColumn()
  organization: Organization;

  @Column({ nullable: true })
  resetPasswordToken: string;  

  @Column({ nullable: true })
  resetPasswordExpires: Date;
}