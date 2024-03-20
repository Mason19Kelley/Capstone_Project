import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';

@Entity()
export class Quiz {
  @PrimaryColumn()
  id: string;

  @Column()
  Quiz_Name: string;
  
  @Column()
  Quiz_JSON: string;

}