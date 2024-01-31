import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class LoginLog {
  @PrimaryColumn()
    Timestamp: string;

  @Column()
    user: string;

  @Column()
    success: boolean;

}
