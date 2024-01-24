import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class LoginLog {
  @PrimaryGeneratedColumn()
    Timestamp: number;

  @Column()
    user: string;

  @Column()
    success: boolean;

}
