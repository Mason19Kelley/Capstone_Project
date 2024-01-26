import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class LoginLog {
  @PrimaryGeneratedColumn()
    id: number;

  @PrimaryColumn()
    Timestamp: string;

  @Column()
    user: string;

  @Column()
    success: boolean;

}
