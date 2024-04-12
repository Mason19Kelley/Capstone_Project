import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('course-completion')
export class CourseCompletion {
  @PrimaryColumn()
  userId: number;

  @PrimaryColumn()
  courseId: number;

  @Column()
  moduleCompleted: number;

  @Column()
  contentCompleted: number;
}
