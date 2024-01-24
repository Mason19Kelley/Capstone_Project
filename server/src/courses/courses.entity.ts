import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToOne } from 'typeorm';

@Entity('courses')
export class Courses {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  courseName: string;

  @Column({ nullable: true })
  instructor: string;
}