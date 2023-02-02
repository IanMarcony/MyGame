import User from '@modules/users/infra/typeorm/entities/User';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Chat from './Chat';

@Entity('chat_users')
export default class ChatUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  id_chat: number;

  @OneToOne(() => Chat)
  @JoinColumn({ name: 'id_chat' })
  chat: Chat;

  @Column()
  id_user_request: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'id_user_request' })
  user_request: User;

  @Column()
  id_user_receiver: number;

  @CreateDateColumn()
  created_at: Date;
}
