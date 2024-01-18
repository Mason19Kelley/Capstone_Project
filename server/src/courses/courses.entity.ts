import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('courses')
export class Courses {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  course_name: string;

  @Column({ nullable: true })
  instructor: string;
}