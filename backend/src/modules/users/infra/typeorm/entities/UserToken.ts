import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Generated,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import User from './User';

@Entity('user_tokens')
export default class UserToken {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  @Generated('uuid')
  token: string;

  @Column()
  user_id: number;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
