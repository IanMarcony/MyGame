import User from '@modules/users/infra/typeorm/entities/User';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Chat from './Chat';

@Entity('messages')
export default class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  text: string;

  @Column()
  id_user: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'id_user' })
  user: User;

  @Column()
  id_chat: number;

  @ManyToOne(() => Chat)
  @JoinColumn({ name: 'id_chat' })
  chat: Chat;

  @CreateDateColumn()
  created_at: Date;
}
